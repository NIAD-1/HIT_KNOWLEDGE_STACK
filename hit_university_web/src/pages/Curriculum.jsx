import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, BookOpen, FileText, Folder, GraduationCap, Loader2, Search } from 'lucide-react';
import { otherSchools, pilotSchool } from '../data/pilotSchool';

const API = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.BASE_URL.replace(/\/$/, ''));
const prettify = (name) => name.replace(/^\d+[_\s-]*/, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim() || name;
const hasHostedApi = import.meta.env.DEV || Boolean(import.meta.env.VITE_API_URL);
const bundledSchools = [
  { name: '02_Electronics', path: pilotSchool.id },
  ...otherSchools.map(school => ({ name: school.id, path: school.id })),
];

export default function Curriculum() {
  const [folders, setFolders] = useState([]);
  const [search, setSearch] = useState('');
  const [noteResults, setNoteResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!hasHostedApi) { setFolders(bundledSchools); setLoading(false); return; }
    fetch(`${API}/api/vault/browse`)
      .then(async response => { const data = await response.json().catch(() => ({})); if (!response.ok) throw new Error(data.detail || 'The hosted HIT library service is unavailable.'); setFolders(data.folders || []); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  const visible = folders.filter(folder => `${folder.name} ${prettify(folder.name)}`.toLowerCase().includes(search.toLowerCase()));
  async function searchAll(event) {
    event.preventDefault();
    const query = search.trim();
    if (query.length < 2) { setError(hasHostedApi ? 'Enter at least two characters to search notes.' : 'Enter at least two characters to search curriculum folders.'); return; }
    if (!hasHostedApi) {
      setError(''); setNoteResults(folders.filter(folder => `${folder.name} ${folder.path} ${prettify(folder.name)}`.toLowerCase().includes(query.toLowerCase()))); setHasSearched(true); return;
    }
    setSearching(true); setError('');
    try {
      const response = await fetch(`${API}/api/vault/search?q=${encodeURIComponent(query)}&limit=80`);
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.detail || 'Could not search the HIT library.');
      setNoteResults(data.results || []); setHasSearched(true);
    } catch (e) { setError(e.message); }
    finally { setSearching(false); }
  }
  return <div className="site-shell curriculum-index-shell">
    <header className="topbar"><Link to="/" className="brand-lockup"><span className="brand-mark"><GraduationCap size={20}/></span><span>HIT <b>University</b></span></Link><nav className="top-nav"><Link to="/">Campus</Link><Link className="active" to="/curriculum">Curriculum</Link><Link to="/vault">Library</Link><Link to="/tutor">AI Tutor</Link></nav><Link to="/" className="back-link"><ArrowLeft size={15}/> Campus</Link></header>
    <main className="curriculum-index-page">
      <div className="curriculum-index-hero"><p className="eyebrow">YOUR HIT KNOWLEDGE REPOSITORY</p><h1>{hasHostedApi ? 'Your full curriculum' : 'Your curriculum'}<span>.</span></h1><p>{hasHostedApi ? 'Every top-level subject folder becomes a school. Open one to explore its real modules, projects, notes, and resources.' : 'Browse the school previews included with HIT School. Connect the hosted library service to load your complete curriculum and notes.'}</p></div>
      <form className="curriculum-index-search" onSubmit={searchAll}><Search size={18}/><input value={search} onChange={event => { setSearch(event.target.value); setHasSearched(false); setError(''); }} placeholder={hasHostedApi ? 'Search subjects, notes, and topics…' : 'Search bundled schools…'} aria-label="Search subjects, notes, and topics"/><button type="submit" disabled={searching || loading}>{searching ? <Loader2 size={15} className="spin"/> : hasHostedApi ? 'Search notes' : 'Search schools'}</button><span>{loading ? 'Loading…' : `${visible.length} subjects`}</span></form>
      {error && <div className="curriculum-index-error">{error}</div>}
      {!hasHostedApi && <p className="curriculum-index-note"><BookOpen size={14}/> Showing the schools bundled with HIT School. Full library browsing, note search, editing, and AI tutoring need a hosted HIT library service.</p>}
      {loading ? <div className="curriculum-index-loading"><Loader2 size={18} className="spin"/> Loading curriculum folders…</div> : <section className="curriculum-index-grid">{visible.map((folder, index) => <Link className="curriculum-school-card" to={`/school/${encodeURIComponent(folder.name)}`} key={folder.path}><span className="curriculum-school-icon"><Folder size={18}/></span><span className="curriculum-school-copy"><small>SUBJECT {String(index + 1).padStart(2, '0')}</small><b>{prettify(folder.name)}</b><em>{folder.name}</em></span><span className="curriculum-school-arrow"><ArrowUpRight size={16}/></span></Link>)}{search && !visible.length && <p className="curriculum-index-empty">No subject folders match this name.</p>}</section>}
      {hasSearched && <section className="curriculum-note-results"><div className="curriculum-note-results-heading"><div><p className="eyebrow">{hasHostedApi ? 'SEARCH THE FULL LIBRARY' : 'SEARCH BUNDLED SCHOOLS'}</p><h2>{hasHostedApi ? 'Matching notes' : 'Matching schools'}</h2></div><span>{noteResults.length} results</span></div>{noteResults.length ? <div className="curriculum-note-results-list">{noteResults.map(note => <Link to={hasHostedApi ? `/vault?path=${encodeURIComponent(note.path)}` : `/school/${encodeURIComponent(note.path)}`} key={note.path} className="curriculum-note-result"><FileText size={16}/><span><b>{prettify(note.name)}</b><small>{note.path}</small>{hasHostedApi && <em>{note.excerpt}</em>}</span><ArrowUpRight size={15}/></Link>)}</div> : <p className="curriculum-index-empty">No matching schools. Try a broader search term.</p>}</section>}
      {hasHostedApi && <p className="curriculum-index-note"><BookOpen size={14}/> This curriculum is generated from your HIT library. Add or rename a folder here to update it.</p>}
    </main>
  </div>;
}
