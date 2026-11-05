import { useEffect, useState } from 'react';
import { clearAuthSession, readAuthSession, saveAuthSession } from '../lib/api';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default function AuthGate({ children }) {
  const [session, setSession] = useState(() => readAuthSession());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const expired = () => { setSession(null); setError('Your sign-in expired. Please sign in again.'); };
    window.addEventListener('hit-auth-expired', expired);
    return () => window.removeEventListener('hit-auth-expired', expired);
  }, []);

  if (!supabaseUrl || !supabaseKey) return children;

  async function signIn(event) {
    event.preventDefault();
    setBusy(true); setError('');
    try {
      const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: supabaseKey },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.msg || data.message || data.error_description || 'Could not sign in. Check your email and password.');
      const next = { ...data, expires_at: data.expires_at || Math.floor(Date.now() / 1000) + data.expires_in };
      saveAuthSession(next); setSession(next); setPassword('');
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }

  function signOut() { clearAuthSession(); setSession(null); setError(''); }

  if (!session?.access_token) return <main className="auth-screen"><form className="auth-card" onSubmit={signIn}><span className="eyebrow">HIT UNIVERSITY</span><h1>Sign in to your library</h1><p>Your HIT knowledge library is private. Sign in with the account created in Supabase.</p><label>Email<input type="email" autoComplete="username" value={email} onChange={event => setEmail(event.target.value)} required /></label><label>Password<input type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} required /></label>{error && <div className="auth-error" role="alert">{error}</div>}<button className="button button-dark" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button></form></main>;

  return <>{children}<button type="button" className="auth-signout" onClick={signOut}>Sign out</button></>;
}
