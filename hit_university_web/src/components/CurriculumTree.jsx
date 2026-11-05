import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, File, FileText, Folder, Loader2 } from 'lucide-react';
import { API, apiFetch } from '../lib/api';

const hasHostedApi = import.meta.env.DEV || Boolean(import.meta.env.VITE_API_URL);

function FolderBranch({ folder, depth = 0, initiallyOpen = false }) {
  const [open, setOpen] = useState(initiallyOpen);
  const [listing, setListing] = useState(hasHostedApi ? null : folder);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadFolder() {
    if (!hasHostedApi) { setListing(folder); return; }
    if (listing) return;
    setLoading(true); setError('');
    try {
      const response = await apiFetch(`${API}/api/vault/browse?path=${encodeURIComponent(folder.path)}`);
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.detail || 'Could not load this curriculum folder.');
      setListing(data);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { if (initiallyOpen && hasHostedApi) loadFolder(); }, []);

  const toggle = () => {
    if (!open) loadFolder();
    setOpen(!open);
  };

  return <div className="curriculum-tree-branch" style={{ '--tree-depth': depth }}>
    <button className="curriculum-tree-folder" onClick={toggle} aria-expanded={open}>
      {open ? <ChevronDown size={15}/> : <ChevronRight size={15}/>}<Folder size={16}/><span>{folder.name}</span>{loading && <Loader2 size={14} className="spin"/>}
    </button>
    {open && <div className="curriculum-tree-children">
      {error && <p className="curriculum-tree-error">{error}</p>}
      {listing?.folders.map(child => <FolderBranch key={child.path} folder={child} depth={depth + 1}/>)}
      {listing?.files?.map(file => <Link key={file.path} className="curriculum-tree-file" to={`/vault?path=${encodeURIComponent(file.path)}`}>
        {file.extension === '.md' ? <FileText size={14}/> : <File size={14}/>}<span>{file.name}</span><small>{file.extension || 'file'}</small>
      </Link>)}
      {listing && !listing.folders.length && !listing.files?.length && <p className="curriculum-tree-empty">{hasHostedApi ? 'No notes or resources in this folder yet.' : 'Topic notes and resources need the hosted HIT library service.'}</p>}
    </div>}
  </div>;
}

export default function CurriculumTree({ path, label }) {
  const [staticRoot, setStaticRoot] = useState(null);
  useEffect(() => {
    if (hasHostedApi) return;
    setStaticRoot({ path, name: label || path.split('/').pop() || 'HIT library curriculum', folders: [] });
  }, [path, label]);
  const root = hasHostedApi ? { path, name: label || path.split('/').pop() || 'HIT library curriculum' } : staticRoot;
  return <div className="curriculum-tree">{root ? <FolderBranch folder={root} initiallyOpen/> : <div className="curriculum-tree-loading"><Loader2 size={15} className="spin"/> Loading folder outline…</div>}</div>;
}
