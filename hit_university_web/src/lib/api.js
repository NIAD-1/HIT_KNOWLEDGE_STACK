const API = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.BASE_URL.replace(/\/$/, ''));
const SESSION_KEY = 'hit-supabase-session';
const LIBRARY_CACHE_PREFIX = 'hit-library-private-v1-';
let sessionRefreshPromise = null;

function libraryCacheable(target, method) {
  if (method !== 'GET') return false;
  const path = new URL(target, window.location.href).pathname;
  return /\/api\/vault\/(browse|tree$|search$|note\/|file\/|asset$)/.test(path);
}

function privateCacheName(session) {
  return session?.user?.id ? `${LIBRARY_CACHE_PREFIX}${session.user.id}` : null;
}

function cacheRequest(target, session) {
  const url = new URL(target);
  url.searchParams.set('__hit_user', session.user.id);
  return new Request(url.href, { method: 'GET' });
}

async function deletePrivateLibraryCache(session) {
  const name = privateCacheName(session);
  if (name && 'caches' in window) await caches.delete(name);
}

async function cacheLibraryWrite(target, options, response, session) {
  const name = privateCacheName(session);
  if (!response.ok || !name || !('caches' in window) || readAuthSession()?.user?.id !== session.user.id) return;
  try {
    const cache = await caches.open(name);
    const method = (options.method || '').toUpperCase();
    if (method === 'PUT' && /\/api\/vault\/note\//.test(new URL(target).pathname)) {
      await cache.put(cacheRequest(target, session), response.clone());
    } else if (method === 'POST' && new URL(target).pathname.endsWith('/api/vault/note')) {
      const note = await response.clone().json();
      const base = target.replace(/\/api\/vault\/note\/?$/, '/api/vault/note/');
      const noteTarget = `${base}${note.path.split('/').map(encodeURIComponent).join('/')}`;
      await cache.put(cacheRequest(noteTarget, session), new Response(JSON.stringify(note), { headers: { 'Content-Type': 'application/json' } }));
      const folderPath = JSON.parse(options.body || '{}').folder_path || '';
      const keys = await cache.keys();
      await Promise.all(keys.filter(key => {
        const url = new URL(key.url);
        return (url.pathname.endsWith('/api/vault/browse') && url.searchParams.get('path') === folderPath)
          || url.pathname.endsWith('/api/vault/tree');
      }).map(key => cache.delete(key)));
    }
  } catch { /* The server write succeeds even if local caching is unavailable. */ }
}

export function readAuthSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); }
  catch { return null; }
}

export function saveAuthSession(session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  const session = readAuthSession();
  sessionStorage.removeItem(SESSION_KEY);
  void deletePrivateLibraryCache(session);
}

async function currentSession() {
  let session = readAuthSession();
  if (!session?.access_token) return null;
  if (session.expires_at && session.expires_at * 1000 < Date.now() + 30000 && session.refresh_token) {
    if (!navigator.onLine) return session;
    if (!sessionRefreshPromise) sessionRefreshPromise = (async () => {
      let response;
      try {
        response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: import.meta.env.VITE_SUPABASE_ANON_KEY },
          body: JSON.stringify({ refresh_token: session.refresh_token }),
        });
      } catch { return session; }
      if (response.status >= 500 || response.status === 429) return session;
      if (!response.ok) {
        clearAuthSession();
        window.dispatchEvent(new Event('hit-auth-expired'));
        return null;
      }
      const renewed = await response.json();
      const next = { ...renewed, expires_at: renewed.expires_at || Math.floor(Date.now() / 1000) + renewed.expires_in };
      saveAuthSession(next);
      return next;
    })();
    try { session = await sessionRefreshPromise; }
    finally { sessionRefreshPromise = null; }
  }
  return session;
}

export async function apiFetch(path, options = {}) {
  let session = readAuthSession();
  const target = /^https?:\/\//i.test(path) ? path : `${API}${path}`;
  const method = (options.method || 'GET').toUpperCase();
  const cacheName = libraryCacheable(target, method) ? privateCacheName(session) : null;
  let cache;
  let key;
  if (cacheName && 'caches' in window) {
    try {
      cache = await caches.open(cacheName);
      key = cacheRequest(target, session);
      const cached = await cache.match(key);
      if (cached) {
        if (navigator.onLine) void refreshCachedLibraryResponse(target, options, session, cache, key);
        return cached;
      }
    } catch { cache = null; }
  }
  try { session = await currentSession(); }
  catch { session = readAuthSession(); }
  const headers = new Headers(options.headers || {});
  if (session?.access_token) headers.set('Authorization', `Bearer ${session.access_token}`);
  let response;
  try { response = await fetch(target, { ...options, headers }); }
  catch (error) {
    if (cache && key) {
      const cached = await cache.match(key).catch(() => null);
      if (cached) return cached;
    }
    throw error;
  }
  if (response.ok && cache && key && readAuthSession()?.user?.id === session?.user?.id) await cache.put(key, response.clone());
  if (response.ok && method !== 'GET') await cacheLibraryWrite(target, options, response, session);
  if (response.status === 401 && session) {
    clearAuthSession();
    window.dispatchEvent(new Event('hit-auth-expired'));
  }
  return response;
}

async function refreshCachedLibraryResponse(target, options, previousSession, cache, key) {
  try {
    const session = await currentSession();
    const headers = new Headers(options.headers || {});
    if (session?.access_token) headers.set('Authorization', `Bearer ${session.access_token}`);
    const response = await fetch(target, { ...options, headers });
    if (response.ok && readAuthSession()?.user?.id === previousSession?.user?.id) await cache.put(key, response.clone());
    else if (response.status === 401 || response.status === 403) {
      await deletePrivateLibraryCache(previousSession);
      clearAuthSession();
      window.dispatchEvent(new Event('hit-auth-expired'));
    }
  } catch { /* Keep the on-device copy when the network is unavailable. */ }
}

export { API };
