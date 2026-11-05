"""Sync the private Supabase Storage library into the API's local working tree.

The base archive is uploaded once. Changes made through the app are stored as
individual override objects and replayed after each Render restart.
"""

from __future__ import annotations

import json
import os
import threading
import zipfile
from pathlib import Path, PurePosixPath
from urllib.parse import quote

import httpx


_lock = threading.Lock()
_BASE_ARCHIVE = "library-base.zip"
_OVERRIDES_INDEX = "library-overrides.json"


def configured() -> bool:
    return bool(os.getenv("SUPABASE_URL") and (os.getenv("SUPABASE_SECRET_KEY") or os.getenv("SUPABASE_SERVICE_ROLE_KEY")))


def _settings():
    base_url = os.environ["SUPABASE_URL"].rstrip("/")
    key = os.getenv("SUPABASE_SECRET_KEY") or os.environ["SUPABASE_SERVICE_ROLE_KEY"]
    bucket = os.getenv("SUPABASE_BUCKET", "hit-library")
    headers = {"apikey": key}
    # Legacy service_role keys are JWTs and need the Authorization header.
    if key.startswith("eyJ"):
        headers["Authorization"] = f"Bearer {key}"
    return base_url, bucket, headers


def _object_url(base_url: str, bucket: str, key: str) -> str:
    encoded = "/".join(quote(part, safe="") for part in key.split("/"))
    return f"{base_url}/storage/v1/object/{quote(bucket, safe='')}/{encoded}"


def _get_object(client: httpx.Client, base_url: str, bucket: str, headers: dict, key: str) -> bytes | None:
    response = client.get(_object_url(base_url, bucket, key), headers=headers)
    if response.status_code == 404:
        return None
    response.raise_for_status()
    return response.content


def _put_object(client: httpx.Client, base_url: str, bucket: str, headers: dict, key: str, data: bytes, content_type: str) -> None:
    response = client.post(
        _object_url(base_url, bucket, key),
        headers={**headers, "Content-Type": content_type, "x-upsert": "true"},
        content=data,
        timeout=120,
    )
    response.raise_for_status()


def _safe_local_path(root: Path, relative: str) -> Path:
    normalized = PurePosixPath(relative)
    if normalized.is_absolute() or not normalized.parts or any(part in {"", ".", ".."} for part in normalized.parts):
        raise ValueError(f"Unsafe library path: {relative}")
    destination = (root / Path(*normalized.parts)).resolve()
    if not destination.is_relative_to(root.resolve()):
        raise ValueError(f"Unsafe library path: {relative}")
    return destination


def _read_index(client: httpx.Client, base_url: str, bucket: str, headers: dict) -> list[str]:
    raw = _get_object(client, base_url, bucket, headers, _OVERRIDES_INDEX)
    if raw is None:
        return []
    payload = json.loads(raw.decode("utf-8"))
    paths = payload.get("paths", []) if isinstance(payload, dict) else []
    return [str(path) for path in paths if isinstance(path, str)]


def load_library(root: Path) -> None:
    """Restore the base archive and all saved overrides into ``root``."""
    if not configured():
        return
    root = root.resolve()
    base_url, bucket, headers = _settings()
    root.mkdir(parents=True, exist_ok=True)
    with httpx.Client(timeout=120) as client:
        archive = _get_object(client, base_url, bucket, headers, _BASE_ARCHIVE)
        if archive is None:
            raise RuntimeError(f"Supabase bucket '{bucket}' has no {_BASE_ARCHIVE}. Upload the library archive first.")
        # Start clean so files removed from a newer base archive do not linger.
        for child in root.iterdir():
            if child.is_dir() and not child.is_symlink():
                import shutil
                shutil.rmtree(child)
            else:
                child.unlink(missing_ok=True)
        import io
        with zipfile.ZipFile(io.BytesIO(archive)) as bundle:
            for member in bundle.infolist():
                if member.is_dir():
                    continue
                destination = _safe_local_path(root, member.filename)
                destination.parent.mkdir(parents=True, exist_ok=True)
                with bundle.open(member) as source, destination.open("wb") as output:
                    output.write(source.read())
        for relative in _read_index(client, base_url, bucket, headers):
            safe = _safe_local_path(root, relative)
            override = _get_object(client, base_url, bucket, headers, f"overrides/{relative}")
            if override is not None:
                safe.parent.mkdir(parents=True, exist_ok=True)
                safe.write_bytes(override)


def save_override(root: Path, relative: str) -> None:
    """Persist one locally changed file and register it for restart replay."""
    if not configured():
        return
    root = root.resolve()
    source = _safe_local_path(root, relative)
    if not source.is_file():
        raise FileNotFoundError(relative)
    base_url, bucket, headers = _settings()
    with _lock, httpx.Client(timeout=120) as client:
        paths = _read_index(client, base_url, bucket, headers)
        if relative not in paths:
            paths.append(relative)
        _put_object(client, base_url, bucket, headers, f"overrides/{relative}", source.read_bytes(), "application/octet-stream")
        index = json.dumps({"paths": sorted(paths)}, ensure_ascii=False).encode("utf-8")
        _put_object(client, base_url, bucket, headers, _OVERRIDES_INDEX, index, "application/json")

