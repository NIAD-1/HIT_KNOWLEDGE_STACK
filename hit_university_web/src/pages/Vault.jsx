import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, Download, File, FileText, Folder, FolderOpen, Home, ImagePlus, Link2, Loader2, Pencil, Plus, Save, Search, Upload, X } from 'lucide-react';
import { API, apiFetch } from '../lib/api';
const ignoredApiFiles = new Set(['.env', '.env.local', '.env.production', '.ds_store']);
const encodePath = (path) => path.split('/').map(encodeURIComponent).join('/');
const noteExtensions = new Set(['.md', '.txt', '.csv', '.json', '.yaml', '.yml']);

function AuthenticatedMedia({ src, type = 'img', ...props }) {
  const [url, setUrl] = useState('');
  useEffect(() => {
    let objectUrl;
    let active = true;
    apiFetch(src).then(response => {
      if (!response.ok) throw new Error('Could not load this library attachment.');
      return response.blob();
    }).then(blob => {
      objectUrl = URL.createObjectURL(blob);
      if (active) setUrl(objectUrl);
    }).catch(() => { if (active) setUrl(''); });
    return () => { active = false; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [src]);
  if (!url) return <span className="vault-media-loading">Loading attachment…</span>;
  if (type === 'iframe') return <iframe src={url} {...props}/>;
  if (type === 'audio') return <audio src={url} controls {...props}/>;
  return <img src={url} {...props}/>;
}

function Vault() {
  const [currentPath, setCurrentPath] = useState('');
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openedNote, setOpenedNote] = useState(null);
  const [editingMarkdown, setEditingMarkdown] = useState(false);
  const [markdownDraft, setMarkdownDraft] = useState('');
  const [savingMarkdown, setSavingMarkdown] = useState(false);
  const [markdownSaveStatus, setMarkdownSaveStatus] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [embedDraft, setEmbedDraft] = useState('');
  const [showEmbedInput, setShowEmbedInput] = useState(false);
  const [showNewNote, setShowNewNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [creatingNote, setCreatingNote] = useState(false);
  const markdownAutoSaveTimer = useRef(null);
  const markdownTextarea = useRef(null);
  const imagePicker = useRef(null);
  const markdownSaveInFlight = useRef(false);
  const queuedMarkdownSave = useRef(null);
  const [noteLoading, setNoteLoading] = useState(false);
  const [learningNote, setLearningNote] = useState('');
  const [learningNotePath, setLearningNotePath] = useState('');
  const [learningNoteStatus, setLearningNoteStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => () => clearTimeout(markdownAutoSaveTimer.current), []);

  useEffect(() => {
    browse('');
    const params = new URLSearchParams(window.location.search);
    const path = params.get('path');
    const q = params.get('q');
    if (path) openFile({ name: path.split('/').pop(), path, extension: `.${path.split('.').pop().toLowerCase()}` });
    else if (q) { setQuery(q); searchLinkedNote(q); }
  }, []);

  async function browse(path) {
    setLoading(true); setError(''); setSelectedFile(null); setOpenedNote(null); setEditingMarkdown(false); setSearchResults(null); setQuery('');
    try {
      const response = await apiFetch(`${API}/api/vault/browse?path=${encodeURIComponent(path)}`);
      const data = await response.json(); if (!response.ok) throw new Error(data.detail || 'Could not open this library folder.');
      setListing(data); setCurrentPath(path);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function searchVault(event) {
    event.preventDefault(); if (query.trim().length < 2) return;
    setSearching(true); setError(''); setOpenedNote(null); setEditingMarkdown(false); setSelectedFile(null);
    try {
      const response = await apiFetch(`${API}/api/vault/search?q=${encodeURIComponent(query.trim())}&limit=80`);
      const data = await response.json(); if (!response.ok) throw new Error(data.detail || 'Search failed.');
      setSearchResults(data);
    } catch (e) { setError(e.message); }
    finally { setSearching(false); }
  }

  async function searchLinkedNote(target) {
    const title = target.split('/').pop().replace(/\.md$/i, '');
    setQuery(title); setSearching(true); setError('');
    try {
      const response = await apiFetch(`${API}/api/vault/search?q=${encodeURIComponent(title)}&limit=80`);
      const data = await response.json(); if (!response.ok) throw new Error(data.detail || 'Could not find that linked note.');
      setSearchResults(data);
    } catch (e) { setError(e.message); }
    finally { setSearching(false); }
  }

  async function openFile(file) {
    setSelectedFile(file); setOpenedNote(null); setEditingMarkdown(false); setMarkdownSaveStatus(''); setError('');
    if (!noteExtensions.has(file.extension)) return;
    setNoteLoading(true);
    try {
      const response = await apiFetch(`${API}/api/vault/note/${encodePath(file.path)}`);
      const data = await response.json(); if (!response.ok) throw new Error(data.detail || 'Could not read this note.');
      setOpenedNote(data);
      setMarkdownDraft(data.text);
    } catch (e) { setError(e.message); }
    finally { setNoteLoading(false); }
  }

  async function saveMarkdown(text = markdownDraft, path = openedNote?.path, closeEditor = true) {
    if (!path) return;
    if (markdownSaveInFlight.current) {
      queuedMarkdownSave.current = { text, path, closeEditor };
      return;
    }
    clearTimeout(markdownAutoSaveTimer.current);
    markdownSaveInFlight.current = true;
    setSavingMarkdown(true); setMarkdownSaveStatus('Saving to the HIT library…'); setError('');
    try {
      const response = await apiFetch(`${API}/api/vault/note/${encodePath(path)}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Could not save this Markdown note.');
      setOpenedNote(current => current?.path === path ? data : current);
      if (openedNote?.path === path) {
        if (closeEditor) setEditingMarkdown(false);
        setMarkdownSaveStatus('Saved to your HIT library');
      }
    } catch (e) { setMarkdownSaveStatus('Save failed'); setError(e.message); }
    finally {
      markdownSaveInFlight.current = false;
      const queued = queuedMarkdownSave.current;
      queuedMarkdownSave.current = null;
      if (queued) void saveMarkdown(queued.text, queued.path, queued.closeEditor);
      else setSavingMarkdown(false);
    }
  }

  function updateMarkdownDraft(value) {
    setMarkdownDraft(value);
    setMarkdownSaveStatus('Unsaved changes · autosaving…');
    clearTimeout(markdownAutoSaveTimer.current);
    const targetPath = openedNote?.path;
    markdownAutoSaveTimer.current = setTimeout(() => saveMarkdown(value, targetPath, false), 800);
  }

  function cancelMarkdownEdit() {
    clearTimeout(markdownAutoSaveTimer.current);
    setMarkdownDraft(openedNote?.text || ''); setEditingMarkdown(false); setMarkdownSaveStatus('');
  }

  function insertMarkdownAtCursor(snippet) {
    const textarea = markdownTextarea.current;
    const start = textarea?.selectionStart ?? markdownDraft.length;
    const end = textarea?.selectionEnd ?? markdownDraft.length;
    const prefix = markdownDraft && start > 0 && markdownDraft[start - 1] !== '\n' ? '\n' : '';
    const suffix = markdownDraft && end < markdownDraft.length && markdownDraft[end] !== '\n' ? '\n' : '';
    const next = `${markdownDraft.slice(0, start)}${prefix}${snippet}${suffix}${markdownDraft.slice(end)}`;
    updateMarkdownDraft(next);
    requestAnimationFrame(() => {
      textarea?.focus();
      const cursor = start + prefix.length + snippet.length + suffix.length;
      textarea?.setSelectionRange(cursor, cursor);
    });
  }

  async function uploadImage(file) {
    if (!file || !openedNote?.path) return;
    setImageUploading(true); setError('');
    try {
      const response = await apiFetch(`${API}/api/vault/asset/${encodePath(openedNote.path)}?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST', headers: { 'Content-Type': file.type || 'application/octet-stream' }, body: file,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Could not add this image to the HIT library.');
      insertMarkdownAtCursor(`![[${data.name}]]`);
    } catch (e) { setError(e.message); }
    finally { setImageUploading(false); }
  }

  function insertEmbed(event) {
    event.preventDefault();
    const url = embedDraft.trim();
    if (!/^https?:\/\//i.test(url)) { setError('Enter a full http or https link to the video, audio, or PDF.'); return; }
    insertMarkdownAtCursor(`![[${url}]]`);
    setEmbedDraft(''); setShowEmbedInput(false); setError('');
  }

  async function createNote(event) {
    event.preventDefault();
    if (!newNoteTitle.trim()) return;
    setCreatingNote(true); setError('');
    try {
      const response = await apiFetch(`${API}/api/vault/note`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newNoteTitle.trim(), folder_path: currentPath }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Could not create a note.');
      await browse(currentPath);
      setSelectedFile({ name: data.name, path: data.path, extension: '.md' });
      setOpenedNote(data); setMarkdownDraft(data.text); setEditingMarkdown(true);
      setShowNewNote(false); setNewNoteTitle('');
    } catch (e) { setError(e.message); }
    finally { setCreatingNote(false); }
  }

  useEffect(() => {
    if (!openedNote?.path) return;
    const key = `hit-learning-note:${openedNote.path}`;
    try { setLearningNote(localStorage.getItem(key) || ''); setLearningNoteStatus('Saved in this browser'); }
    catch { setLearningNote(''); setLearningNoteStatus('Browser storage is unavailable'); }
    setLearningNotePath(openedNote.path);
  }, [openedNote?.path]);

  function saveLearningNote(value) {
    setLearningNote(value);
    if (!openedNote?.path) return;
    try {
      localStorage.setItem(`hit-learning-note:${openedNote.path}`, value);
      setLearningNoteStatus('Saved in this browser');
    } catch { setLearningNoteStatus('Could not save in browser storage'); }
  }

  function downloadLearningNote() {
    if (!openedNote?.path || !learningNote.trim()) return;
    const title = openedNote.name.replace(/\.md$/i, '');
    const content = `# My learning notes: ${title}\n\nSource: ${openedNote.path}\n\n${learningNote.trim()}\n`;
    const url = URL.createObjectURL(new Blob([content], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = `${title} - My Learning Notes.md`; link.click();
    URL.revokeObjectURL(url);
  }

  const crumbs = useMemo(() => currentPath ? currentPath.split('/') : [], [currentPath]);
  const fileUrl = (path) => `${API}/api/vault/file/${encodePath(path)}`;
  const assetUrl = (target, notePath) => `${API}/api/vault/asset?note_path=${encodeURIComponent(notePath)}&target=${encodeURIComponent(target)}`;
  async function openFileInTab(path) {
    try {
      const response = await apiFetch(fileUrl(path));
      if (!response.ok) throw new Error('Could not open this attachment.');
      const url = URL.createObjectURL(await response.blob());
      window.open(url, '_blank', 'noopener,noreferrer');
      window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (e) { setError(e.message); }
  }
  const markdown = (source, notePath) => source
    .replace(/!\[\[([^\]]+)\]\]/g, (_, rawTarget) => { const [target, alias] = rawTarget.split('|').map(value => value.trim()); return /^https?:\/\//i.test(target) ? `![${alias || 'Embedded resource'}](vaultembed:${encodeURIComponent(target)})` : `![${alias || target}](vaultasset:${target})`; })
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, target, label) => `[${label}](vaultnote:${target})`)
    .replace(/\[\[([^\]]+)\]\]/g, (_, target) => `[${target}](vaultnote:${target})`);

  function resolveAsset(target, notePath) { return assetUrl(target, notePath); }

  return <div className="site-shell vault-shell">
    <header className="topbar"><Link to="/" className="brand-lockup"><span className="brand-mark"><FolderOpen size={18}/></span><span>HIT <b>University</b></span></Link><nav className="top-nav"><Link to="/">Campus</Link><Link className="active" to="/vault">Library</Link><Link to="/tutor">AI Tutor</Link></nav><Link to="/" className="back-link"><ArrowLeft size={15}/> Campus</Link></header>
    <main className="vault-page">
      <div className="vault-heading"><div><p className="eyebrow">HIT KNOWLEDGE REPOSITORY</p><h1>Knowledge library</h1><p>Browse your knowledge folders, open notes, and search the HIT library.</p></div><div className="vault-heading-actions"><span className="vault-chip"><FolderOpen size={15}/> Independent library</span><button className="vault-new-note-button" onClick={() => { setShowNewNote(value => !value); setError(''); }}><Plus size={14}/> New note</button></div></div>
      {showNewNote && <form className="vault-new-note-form" onSubmit={createNote}><input autoFocus value={newNoteTitle} onChange={event => setNewNoteTitle(event.target.value)} placeholder={`Note title in ${currentPath || 'the library root'}`} aria-label="New note title"/><button type="submit" disabled={creatingNote || !newNoteTitle.trim()}>{creatingNote ? <Loader2 className="spin" size={14}/> : <Plus size={14}/>} Create note</button><button type="button" className="vault-new-note-cancel" onClick={() => { setShowNewNote(false); setNewNoteTitle(''); }}>Cancel</button></form>}
      <form className="vault-search" onSubmit={searchVault}><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search note titles and contents…" aria-label="Search the library"/><button disabled={searching}>{searching ? <Loader2 className="spin" size={16}/> : 'Search library'}</button></form>
      <div className="vault-breadcrumb"><button onClick={() => browse('')} aria-label="Library root"><Home size={14}/> Library</button>{crumbs.map((crumb, index) => <span key={`${crumb}-${index}`}><ChevronRight size={13}/><button onClick={() => browse(crumbs.slice(0, index + 1).join('/'))}>{crumb}</button></span>)}</div>
      <p className="vault-footnote"><Check size={13}/> Notes and attachments are stored in HIT School’s own knowledge library.</p>
      {error && <div className="vault-error" role="alert">{error}</div>}
      <div className="vault-layout">
        <aside className="vault-browser"><div className="vault-browser-title"><b>{searchResults ? 'Search results' : (listing?.name || 'Library folders')}</b>{searchResults && <button onClick={() => setSearchResults(null)} aria-label="Clear search"><X size={15}/></button>}</div>
          {loading || searching ? <div className="vault-loading"><Loader2 className="spin" size={17}/> Loading…</div> : searchResults ? <div className="vault-entry-list">{searchResults.results.length ? searchResults.results.map((result, index) => <button key={`${result.path}-${index}`} className="vault-search-result" onClick={() => openFile({ ...result, extension: '.md' })}><FileText size={16}/><span><b>{result.name}</b><small>{result.path}</small><small>{result.excerpt}</small></span></button>) : <p className="vault-empty">No matching notes found.</p>}{searchResults.limited && <p className="vault-search-limit">Showing the first 80 matches.</p>}</div> : <div className="vault-entry-list">{listing?.folders.map(folder => <button className="vault-folder-row" key={folder.path} onClick={() => browse(folder.path)}><Folder size={16}/><span>{folder.name}</span><ChevronRight size={14}/></button>)}{listing?.files.filter(file => !ignoredApiFiles.has(file.name.toLowerCase())).map(file => <button className={`vault-file-row ${selectedFile?.path === file.path ? 'selected' : ''}`} key={file.path} onClick={() => openFile(file)}>{file.extension === '.md' ? <FileText size={15}/> : <File size={15}/>}<span>{file.name}</span><small>{file.extension || 'file'}</small></button>)}{!listing?.folders.length && !listing?.files.length && <p className="vault-empty">This folder is empty.</p>}</div>}
        </aside>
        <section className="vault-preview">
          {!selectedFile && <div className="vault-welcome"><span><FolderOpen size={24}/></span><h2>Everything in one place</h2><p>Choose a folder to explore the library, or search it for a topic.</p><small>Hidden app settings and build files stay out of the learning library.</small></div>}
          {selectedFile && <>
            <div className="vault-preview-header"><div><p className="eyebrow">{selectedFile.extension?.replace('.', '').toUpperCase() || 'LIBRARY FILE'}</p><h2>{selectedFile.name}</h2><small>{selectedFile.path}</small></div><div className="vault-preview-actions">{openedNote && selectedFile.extension === '.md' && !editingMarkdown && <button className="vault-edit-button" onClick={() => { setMarkdownDraft(openedNote.text); setMarkdownSaveStatus(''); setEditingMarkdown(true); }}><Pencil size={14}/> Edit Markdown</button>}{editingMarkdown && <><button className="vault-edit-cancel" onClick={cancelMarkdownEdit} disabled={savingMarkdown}><X size={14}/> Cancel</button><button className="vault-edit-save" onClick={saveMarkdown} disabled={savingMarkdown}>{savingMarkdown ? <Loader2 size={14} className="spin"/> : <Save size={14}/>} {savingMarkdown ? 'Saving…' : 'Save note'}</button></>}<button type="button" onClick={() => openFileInTab(selectedFile.path)} className="vault-open-link">Open file <ArrowUpRight size={14}/></button></div></div>
            {noteLoading ? <div className="vault-loading"><Loader2 className="spin" size={18}/> Opening note…</div> : openedNote ? (editingMarkdown ? <section className="vault-markdown vault-inline-markdown-editor"><div className="vault-editor-status"><Pencil size={13}/> Editing this library note · {markdownDraft.length.toLocaleString()} characters</div><div className="vault-insert-tools"><input ref={imagePicker} type="file" accept="image/png,image/jpeg,image/gif,image/webp,image/svg+xml" hidden onChange={event => { uploadImage(event.target.files?.[0]); event.target.value = ''; }}/><button type="button" className="vault-insert-button" onClick={() => imagePicker.current?.click()} disabled={imageUploading}><ImagePlus size={14}/>{imageUploading ? 'Adding image…' : 'Add image'}</button><button type="button" className="vault-insert-button" onClick={() => { setShowEmbedInput(value => !value); setError(''); }}><Link2 size={14}/>Embed link</button>{showEmbedInput && <form className="vault-embed-form" onSubmit={insertEmbed}><input value={embedDraft} onChange={event => setEmbedDraft(event.target.value)} placeholder="Paste YouTube, video, audio, or PDF URL" aria-label="Embed URL"/><button type="submit"><Upload size={13}/> Insert</button></form>}</div><textarea ref={markdownTextarea} value={markdownDraft} onChange={event => updateMarkdownDraft(event.target.value)} spellCheck="false" aria-label={`Edit ${openedNote.name}`} autoFocus/><div className="vault-inline-editor-footer"><span>{markdownSaveStatus || 'Changes autosave to your vault as you type.'}</span></div></section> : <article className="vault-markdown"><ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: ({ href = '', children, ...props }) => href.startsWith('vaultnote:') ? <button className="vault-wikilink" onClick={() => searchLinkedNote(decodeURIComponent(href.slice('vaultnote:'.length)))} {...props}>{children}</button> : <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} {...props}>{children}</a>, img: ({ src = '', alt, ...props }) => {
                const embedded = src.startsWith('vaultembed:');
                const protectedAsset = src.startsWith('vaultasset:');
                const target = embedded ? decodeURIComponent(src.slice('vaultembed:'.length)) : protectedAsset ? src.slice('vaultasset:'.length) : src;
                const extension = target.split(/[?#]/)[0].split('.').pop()?.toLowerCase();
                const youtubeId = target.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)?.[1];
                const url = embedded ? target : protectedAsset ? resolveAsset(target, openedNote.path) : src;
                if (youtubeId) return <div className="vault-embed-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} title={alt || 'Embedded video'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/></div>;
                if (['pdf','mp4','webm','mov'].includes(extension || '')) return protectedAsset ? <AuthenticatedMedia className="vault-embed-document" title={alt || 'Embedded resource'} src={url} type="iframe"/> : <iframe className="vault-embed-document" title={alt || 'Embedded resource'} src={url}/>;
                if (['mp3','m4a','wav','ogg'].includes(extension || '')) return protectedAsset ? <AuthenticatedMedia className="vault-embed-audio" src={url} type="audio"/> : <audio className="vault-embed-audio" controls src={url}/>;
                return protectedAsset ? <AuthenticatedMedia src={url} alt={alt || ''} loading="lazy" {...props}/> : <img src={url} alt={alt || ''} loading="lazy" {...props}/>;
              } }}>{markdown(openedNote.text, openedNote.path)}</ReactMarkdown></article>) : selectedFile.extension === '.pdf' ? <AuthenticatedMedia className="vault-pdf" title={selectedFile.name} src={fileUrl(selectedFile.path)} type="iframe"/> : selectedFile.extension?.match(/^\.(png|jpe?g|gif|webp|svg)$/) ? <AuthenticatedMedia className="vault-image" src={fileUrl(selectedFile.path)} alt={selectedFile.name}/> : selectedFile.extension === '.mp3' || selectedFile.extension === '.m4a' || selectedFile.extension === '.wav' ? <div className="vault-media"><AuthenticatedMedia type="audio" src={fileUrl(selectedFile.path)}/><button type="button" onClick={() => openFileInTab(selectedFile.path)}>{selectedFile.name}</button></div> : <div className="vault-download"><File size={26}/><p>This attachment can be opened or downloaded.</p><button type="button" onClick={() => openFileInTab(selectedFile.path)}>Open attachment <ArrowUpRight size={14}/></button></div>}
            {openedNote && <section className="learning-note-editor"><div className="learning-note-heading"><div><p className="eyebrow">YOUR REFLECTION</p><h3>What did you learn?</h3></div><span>{learningNotePath === openedNote.path ? learningNoteStatus : 'Loading your note…'}</span></div><textarea value={learningNotePath === openedNote.path ? learningNote : ''} onChange={event => saveLearningNote(event.target.value)} placeholder="Write what you understood, what surprised you, questions to ask your tutor, or ideas for a project…" aria-label="Your learning notes"/><div className="learning-note-footer"><small>Saved on this device. Cloud sync can be connected separately.</small><button onClick={downloadLearningNote} disabled={!learningNote.trim()}><Download size={14}/> Download note</button></div></section>}
          </>}
        </section>
      </div>
    </main>
  </div>;
}

export default Vault;
