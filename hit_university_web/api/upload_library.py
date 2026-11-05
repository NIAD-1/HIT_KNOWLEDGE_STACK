"""Pack the local knowledge library and upload it to a private Supabase bucket.

Run from hit_university_web. The uploader prompts privately for the project URL
and server secret key if they are not in the environment. The default upload refuses to
replace an existing base archive; pass --replace only for an intentional reset.
"""

from __future__ import annotations

import argparse
import getpass
import io
import os
import sys
import zipfile
from pathlib import Path

import httpx

from api.supabase_library import _get_object, _put_object, _settings


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--replace", action="store_true", help="replace an existing library-base.zip")
    args = parser.parse_args()

    source = Path(os.getenv("HIT_KNOWLEDGE_ROOT", Path(__file__).resolve().parents[1] / "data" / "knowledge_base")).expanduser().resolve()
    if not source.is_dir():
        print(f"Library folder not found: {source}", file=sys.stderr)
        return 1
    if not os.getenv("SUPABASE_URL"):
        os.environ["SUPABASE_URL"] = input("Supabase Project URL: ").strip()
    if not (os.getenv("SUPABASE_SECRET_KEY") or os.getenv("SUPABASE_SERVICE_ROLE_KEY")):
        os.environ["SUPABASE_SECRET_KEY"] = getpass.getpass("Supabase secret key (input hidden): ").strip()
    if not os.environ["SUPABASE_URL"] or not (os.getenv("SUPABASE_SECRET_KEY") or os.getenv("SUPABASE_SERVICE_ROLE_KEY")):
        print("A project URL and server secret key are required.", file=sys.stderr)
        return 1

    buffer = io.BytesIO()
    count = 0
    with zipfile.ZipFile(buffer, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
        for current, directories, filenames in os.walk(source, followlinks=False):
            current_path = Path(current)
            directories[:] = [name for name in directories if name not in {".git", ".obsidian", "node_modules", "venv", ".venv", "__pycache__"} and not (current_path / name).is_symlink()]
            for name in filenames:
                path = current_path / name
                if path.is_symlink() or name.lower() in {".ds_store", ".env", ".env.local", ".env.production"}:
                    continue
                archive.write(path, path.relative_to(source).as_posix())
                count += 1

    base_url, bucket, headers = _settings()
    with httpx.Client(timeout=120) as client:
        existing = _get_object(client, base_url, bucket, headers, "library-base.zip")
        if existing is not None and not args.replace:
            print("The bucket already contains library-base.zip. Use --replace only if you intend to replace the uploaded base library.", file=sys.stderr)
            return 2
        payload = buffer.getvalue()
        _put_object(client, base_url, bucket, headers, "library-base.zip", payload, "application/zip")
    print(f"Uploaded {count:,} library files ({len(payload) / (1024 * 1024):.1f} MiB) to the private '{bucket}' bucket.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
