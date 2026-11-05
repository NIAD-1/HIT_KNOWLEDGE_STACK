import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Bell, BookOpen, Check, Clock3, Headphones, Link2, Loader2, Play, Search, Sparkles, Volume2 } from 'lucide-react';
import { useAudioPlayer } from '../components/AudioPlayer';
import { API, apiFetch } from '../lib/api';

const reminderKey = 'hit-daily-learning-reminder';
const streakKey = 'hit-learning-days';

function Tutor() {
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(null);
  const [pathway, setPathway] = useState(null);
  const [goal, setGoal] = useState('');
  const [currentKnowledge, setCurrentKnowledge] = useState('');
  const [podcastUrl, setPodcastUrl] = useState('');
  const [busy, setBusy] = useState('');
  const [pathwayBusy, setPathwayBusy] = useState(false);
  const [error, setError] = useState('');
  const [reminder, setReminder] = useState(() => { try { return JSON.parse(localStorage.getItem(reminderKey)) || { enabled: false, time: '18:00' }; } catch { return { enabled: false, time: '18:00' }; } });
  const [streak, setStreak] = useState(() => { try { return JSON.parse(localStorage.getItem(streakKey)) || []; } catch { return []; } });
  const timer = useRef(null);
  const { playQueue } = useAudioPlayer();

  useEffect(() => () => { clearTimeout(timer.current); if (podcastUrl) URL.revokeObjectURL(podcastUrl); }, [podcastUrl]);

  const markLearningToday = () => {
    const today = new Date().toLocaleDateString('en-CA');
    const next = [...new Set([...streak, today])].sort();
    setStreak(next); localStorage.setItem(streakKey, JSON.stringify(next));
  };

  const today = new Date().toLocaleDateString('en-CA');
  const learnedToday = streak.includes(today);
  const currentStreak = (() => {
    let count = 0; const days = new Set(streak); const date = new Date();
    if (!days.has(today)) date.setDate(date.getDate() - 1);
    while (days.has(date.toLocaleDateString('en-CA'))) { count += 1; date.setDate(date.getDate() - 1); }
    return count;
  })();

  const saveReminder = async () => {
    setError('');
    if (!reminder.enabled) { setReminder({ ...reminder, enabled: true }); localStorage.setItem(reminderKey, JSON.stringify({ ...reminder, enabled: true })); }
    if (!('Notification' in window)) { setError('This browser does not support notifications. Your reminder time is saved on this device.'); return; }
    const permission = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
    if (permission !== 'granted') { setError('Allow notifications in your browser settings to receive the reminder.'); return; }
    const [hours, minutes] = reminder.time.split(':').map(Number); const next = new Date(); next.setHours(hours, minutes, 0, 0); if (next <= new Date()) next.setDate(next.getDate() + 1);
    const updated = { ...reminder, enabled: true }; setReminder(updated); localStorage.setItem(reminderKey, JSON.stringify(updated));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (!learnedToday) new Notification('HIT University', { body: 'Your daily learning session is ready. Pick up one idea today.', icon: '/icons/app-icon.svg', tag: 'hit-daily-learning' });
      const tomorrow = new Date(Date.now() + 86400000); tomorrow.setHours(hours, minutes, 0, 0);
      timer.current = setTimeout(() => { if (!learnedToday) new Notification('HIT University', { body: 'A few minutes of learning today keeps your streak alive.', tag: 'hit-daily-learning' }); }, Math.max(1000, tomorrow - new Date()));
    }, Math.max(1000, next - new Date()));
  };

  const tutorRequest = async (path, payload) => {
    const response = await apiFetch(`${API}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!response.ok) { let message = 'The tutor could not complete that request.'; try { message = (await response.json()).detail || message; } catch {} throw new Error(message); }
    return response;
  };

  const research = async (event) => {
    event?.preventDefault(); if (!topic.trim()) return; setBusy('research'); setError(''); setPodcastUrl('');
    try { const response = await tutorRequest('/api/tutor/research', { topic, question }); setResult(await response.json()); markLearningToday(); }
    catch (e) { setError(e.message); } finally { setBusy(''); }
  };

  const buildPathway = async (event) => {
    event?.preventDefault();
    if (!topic.trim()) { setError('Enter a subject first so the planner can arrange your learning path.'); return; }
    setPathwayBusy(true); setError(''); setPathway(null);
    try {
      const response = await tutorRequest('/api/tutor/pathway', { topic, goal, current_knowledge: currentKnowledge, level: 'beginner' });
      setPathway(await response.json());
      markLearningToday();
    } catch (e) { setError(e.message); }
    finally { setPathwayBusy(false); }
  };

  const makePodcast = async () => {
    if (!topic.trim()) { setError('Enter a topic first, then create its podcast.'); return; }
    setBusy('podcast'); setError('');
    try {
      const response = await tutorRequest('/api/tutor/podcast', { topic }); const data = await response.json();
      const audioResponse = await tutorRequest('/api/narrate', { title: `${topic} learning podcast`, text: data.script });
      const blob = await audioResponse.blob(); const id = `topic-${Date.now()}`; const name = `${topic}.mp3`;
      const dbRequest = indexedDB.open('hit-university-media', 2);
      await new Promise((resolve, reject) => { dbRequest.onupgradeneeded = () => { if (!dbRequest.result.objectStoreNames.contains('recordings')) dbRequest.result.createObjectStore('recordings', { keyPath: 'id' }); if (!dbRequest.result.objectStoreNames.contains('narrations')) dbRequest.result.createObjectStore('narrations', { keyPath: 'id' }); }; dbRequest.onerror = () => reject(dbRequest.error); dbRequest.onsuccess = () => { const db = dbRequest.result; const tx = db.transaction('narrations', 'readwrite'); tx.objectStore('narrations').put({ id, name, blob, updatedAt: Date.now() }); tx.oncomplete = () => { db.close(); resolve(); }; tx.onerror = () => { db.close(); reject(tx.error); }; }; });
      const url = URL.createObjectURL(blob); setPodcastUrl(url); markLearningToday(); playQueue([{ id, name, blob }], 0);
    } catch (e) { setError(e.message); } finally { setBusy(''); }
  };

  return <div className="site-shell tutor-shell">
    <header className="topbar"><Link to="/" className="brand-lockup"><span className="brand-mark"><Sparkles size={18}/></span><span>HIT <b>University</b></span></Link><nav className="top-nav"><Link to="/">Campus</Link><Link to="/listen">Listen</Link><a className="active" href="#tutor">AI Tutor</a></nav><Link to="/" className="back-link"><ArrowLeft size={15}/> Campus</Link></header>
    <main className="tutor-page" id="tutor">
      <section className="tutor-hero"><div><p className="eyebrow"><span className="tutor-live-dot"/> YOUR RESEARCH AND LEARNING COMPANION</p><h1>Follow your curiosity.<br/><span>Learn it deeply.</span></h1><p>Ask about any topic. Your tutor brings together relevant notes from your vault and current web sources, then teaches you the topic.</p></div><div className="tutor-hero-mark"><Sparkles size={31}/><span>AI</span></div></section>
      <div className="tutor-layout">
        <section className="tutor-main-card">
          <form className="tutor-research-form" onSubmit={research}><label htmlFor="topic-input">What do you want to understand?</label><div className="tutor-topic-field"><Search size={19}/><input id="topic-input" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. How do lithium-ion batteries work?"/><button className="button button-dark" disabled={!!busy}>{busy === 'research' ? <Loader2 size={16} className="spin"/> : <Search size={16}/>} Teach me</button></div><label htmlFor="question-input" className="tutor-sub-label">Add a specific question (optional)</label><input id="question-input" className="tutor-question-input" value={question} onChange={e => setQuestion(e.target.value)} placeholder="What should I focus on? Compare the latest approaches…"/></form>
          <div className="tutor-suggestions"><span>TRY A TOPIC</span>{['Artificial intelligence', 'Solar energy', 'Semiconductors', 'Climate technology'].map(item => <button key={item} onClick={() => { setTopic(item); setQuestion(''); }}>{item}</button>)}</div>
          {error && <div className="tutor-error" role="alert">{error}</div>}
          <section className="pathway-builder"><div className="pathway-builder-heading"><span className="tutor-answer-icon"><Link2 size={17}/></span><div><p className="eyebrow">AI LEARNING PLANNER</p><h2>Arrange my learning</h2><p>Build an ordered path and connect it to matching notes in your vault.</p></div></div><form onSubmit={buildPathway}><label htmlFor="pathway-goal">What do you want to be able to do?</label><input id="pathway-goal" value={goal} onChange={event => setGoal(event.target.value)} placeholder="e.g. Build and troubleshoot a sensor circuit"/><label htmlFor="pathway-knowledge">What do you already know? <span>Optional</span></label><input id="pathway-knowledge" value={currentKnowledge} onChange={event => setCurrentKnowledge(event.target.value)} placeholder="e.g. Basic algebra and voltage"/><button className="button button-dark" type="submit" disabled={pathwayBusy || !topic.trim()}>{pathwayBusy ? <><Loader2 size={15} className="spin"/> Arranging path…</> : <>Arrange my path <ArrowRight size={15}/></>}</button></form></section>
          {pathway && <article className="pathway-result"><div className="pathway-result-heading"><div><p className="eyebrow">YOUR ORDERED PATH</p><h2>{pathway.title}</h2></div><div className="pathway-badges"><span>{pathway.steps.length} steps</span><span>{pathway.provider === 'ollama' ? 'Local AI' : 'AI + web search'}</span></div></div><p className="pathway-summary">{pathway.summary}</p><ol className="pathway-steps">{pathway.steps.map((step, index) => <li key={step.id}><span className="pathway-step-number">{String(index + 1).padStart(2, '0')}</span><div className="pathway-step-copy"><h3>{step.title}</h3>{step.why && <p>{step.why}</p>}{step.prerequisite_titles?.length > 0 && <small>Builds on: {step.prerequisite_titles.join(', ')}</small>}{step.project && <small className="pathway-project">Try it: {step.project}</small>}{step.vault_path && <Link className="pathway-vault-link" to={`/vault?path=${encodeURIComponent(step.vault_path)}`}><BookOpen size={13}/> Open matching library note <ArrowUpRight size={13}/></Link>}</div></li>)}</ol>{pathway.connections?.length > 0 && <div className="pathway-connections"><h3><Link2 size={14}/> How the topics connect</h3>{pathway.connections.map((edge, index) => { const from = pathway.steps.find(step => step.id === edge.from)?.title; const to = pathway.steps.find(step => step.id === edge.to)?.title; return <p key={`${edge.from}-${edge.to}-${index}`}><b>{from}</b> <ArrowRight size={12}/> <b>{to}</b><span>{edge.reason}</span></p>; })}</div>}{pathway.vault_sources?.length > 0 && <div className="tutor-sources"><h3>Related notes in your library</h3><div>{pathway.vault_sources.map(source => <Link key={source.path} to={`/vault?path=${encodeURIComponent(source.path)}`}><span>{source.title}<small className="tutor-source-path">{source.path}</small></span><ArrowUpRight size={14}/></Link>)}</div></div>}{pathway.web_sources?.length > 0 && <div className="tutor-sources"><h3>Sources checked for this path</h3><div>{pathway.web_sources.slice(0, 6).map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer"><span>{source.title}</span><ArrowUpRight size={14}/></a>)}</div></div>}</article>}
          {busy === 'research' && <div className="tutor-loading"><Loader2 className="spin" size={20}/> Searching sources and preparing your lesson…</div>}
          {result && <article className="tutor-answer"><div className="tutor-answer-heading"><span className="tutor-answer-icon"><BookOpen size={17}/></span><div><p className="eyebrow">YOUR LEARNING BRIEF</p><h2>{result.topic}</h2></div></div><div className="tutor-answer-text">{result.answer}</div>{result.vault_sources?.length > 0 && <div className="tutor-sources"><h3>From your library</h3><div>{result.vault_sources.map(source => <Link key={source.path} to={`/vault?path=${encodeURIComponent(source.path)}`}><span>{source.title}<small className="tutor-source-path">{source.path}</small></span><ArrowUpRight size={14}/></Link>)}</div></div>}{result.sources?.length > 0 && <div className="tutor-sources"><h3>Web sources to explore</h3><div>{result.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer"><span>{source.title}</span><ArrowUpRight size={14}/></a>)}</div></div>}</article>}
        </section>
        <aside className="tutor-side">
          <section className="podcast-card"><span className="podcast-icon"><Headphones size={19}/></span><p className="eyebrow">LEARN WHILE YOU MOVE</p><h2>Turn a topic into a podcast</h2><p>Your tutor writes a friendly audio lesson and makes an MP3 for your listening library.</p><button className="button button-light" onClick={makePodcast} disabled={!!busy}>{busy === 'podcast' ? <><Loader2 size={15} className="spin"/> Creating audio…</> : <><Volume2 size={15}/> Create topic podcast</>}</button>{podcastUrl && <div className="podcast-audio"><audio controls src={podcastUrl}/><a href={podcastUrl} download={`${topic || 'topic'}-podcast.mp3`}><Play size={13}/> Download MP3</a></div>}<small className="podcast-note">MP3 generation uses the Mac’s local voice service.</small></section>
          <section className="streak-card"><div className="streak-heading"><span className="streak-flame">✳</span><div><p className="eyebrow">YOUR LEARNING STREAK</p><h2>{currentStreak} {currentStreak === 1 ? 'day' : 'days'}</h2></div></div><div className="streak-week">{['M','T','W','T','F','S','S'].map((day, index) => { const date = new Date(); const mondayOffset = (date.getDay() + 6) % 7; date.setDate(date.getDate() - mondayOffset + index); const key = date.toLocaleDateString('en-CA'); return <span key={`${day}-${index}`} className={streak.includes(key) ? 'done' : ''}><i>{streak.includes(key) ? <Check size={13}/> : day}</i><small>{day}</small></span>; })}</div><button className={`streak-checkin ${learnedToday ? 'checked' : ''}`} onClick={markLearningToday} disabled={learnedToday}>{learnedToday ? <><Check size={15}/> Today’s learning complete</> : <><BookOpen size={15}/> Count today’s learning</>}</button></section>
          <section className="reminder-card"><div className="reminder-title"><Bell size={16}/><b>Daily nudge</b></div><p>Choose a time for your daily learning reminder.</p><div className="reminder-controls"><label className="sr-only" htmlFor="reminder-time">Reminder time</label><input id="reminder-time" type="time" value={reminder.time} onChange={e => setReminder({ ...reminder, time: e.target.value })}/><button onClick={saveReminder}>{reminder.enabled ? 'Update' : 'Set reminder'}</button></div><small><Clock3 size={12}/> Browser notifications work while this app is open.</small></section>
        </aside>
      </div>
      <footer className="tutor-footer"><Sparkles size={14}/> HIT Tutor searches current web sources. Always check original sources for important decisions.</footer>
    </main>
  </div>;
}

export default Tutor;
