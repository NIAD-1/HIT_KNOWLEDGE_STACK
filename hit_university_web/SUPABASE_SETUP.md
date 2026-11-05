# Connect the HIT library to Supabase

The web app uses Supabase Auth to sign in. The Render API accesses the private
`hit-library` bucket using a server-only Supabase secret key. The library's
initial archive is stored as `library-base.zip`; note edits and new files are
saved as private overrides so they survive Render restarts.

## 1. Upload the current local library

From a terminal, run:

```sh
cd /path/to/HIT_KNOWLEDGE_STACK/hit_university_web
python3 -m pip install -r api/requirements.txt
python3 -m api.upload_library
```

The uploader prompts for the Supabase Project URL and secret key. The key input
is hidden. Use the project URL from Supabase **Settings → API**, and the server
secret key from **Settings → API Keys**. Never paste the secret key into chat,
GitHub, or the frontend. The script reads `data/knowledge_base/` by default.

## 2. Configure the Render API

In Render, open the HIT API service and add these Environment variables:

| Name | Value |
| --- | --- |
| `SUPABASE_URL` | Project URL |
| `SUPABASE_ANON_KEY` | Publishable key (`sb_publishable_...`) |
| `SUPABASE_SECRET_KEY` | Secret key (`sb_secret_...`) |
| `SUPABASE_BUCKET` | `hit-library` |
| `HIT_ALLOWED_USERS` | The email address you added under Supabase Authentication → Users |

Save the variables and wait for the service to redeploy and restore the archive.
Do not set `HIT_KNOWLEDGE_ROOT` to a Render disk path for this setup.

## 3. Configure the GitHub Pages build

In the repository, open **Settings → Secrets and variables → Actions →
Variables** and add:

| Name | Value |
| --- | --- |
| `VITE_API_URL` | `https://hit-knowledge-stack.onrender.com` |
| `VITE_SUPABASE_URL` | Project URL |
| `VITE_SUPABASE_ANON_KEY` | Publishable key (`sb_publishable_...`) |

Only the publishable key belongs in GitHub Actions variables. Never add the
Supabase secret key there. Then run **Actions → Deploy HIT University to GitHub
Pages → Run workflow** on `main`.

## 4. Sign in

Open HIT University and sign in with the email and password created under
Supabase **Authentication → Users**. The API checks the signed-in Supabase user
against `HIT_ALLOWED_USERS` before serving or changing private library content.

The uploader refuses to replace an existing `library-base.zip` unless run with
`--replace`. App edits are stored separately and replayed when the Render API
restarts.
