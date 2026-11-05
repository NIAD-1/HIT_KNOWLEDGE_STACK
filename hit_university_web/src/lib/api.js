const API = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.BASE_URL.replace(/\/$/, ''));
const SESSION_KEY = 'hit-supabase-session';

export function readAuthSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); }
  catch { return null; }
}

export function saveAuthSession(session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

async function currentSession() {
  let session = readAuthSession();
  if (!session?.access_token) return null;
  if (session.expires_at && session.expires_at * 1000 < Date.now() + 30000 && session.refresh_token) {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: import.meta.env.VITE_SUPABASE_ANON_KEY },
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    });
    if (!response.ok) {
      clearAuthSession();
      window.dispatchEvent(new Event('hit-auth-expired'));
      return null;
    }
    const renewed = await response.json();
    session = { ...renewed, expires_at: renewed.expires_at || Math.floor(Date.now() / 1000) + renewed.expires_in };
    saveAuthSession(session);
  }
  return session;
}

export async function apiFetch(path, options = {}) {
  const session = await currentSession();
  const headers = new Headers(options.headers || {});
  if (session?.access_token) headers.set('Authorization', `Bearer ${session.access_token}`);
  const target = /^https?:\/\//i.test(path) ? path : `${API}${path}`;
  const response = await fetch(target, { ...options, headers });
  if (response.status === 401 && session) {
    clearAuthSession();
    window.dispatchEvent(new Event('hit-auth-expired'));
  }
  return response;
}

export { API };
