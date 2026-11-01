import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, AudioLines, BookOpen, Check, ChevronDown, HelpCircle, ExternalLink, FileAudio, FileText, Lightbulb, Link2, MessageCircle, Mic, Play, Save, Send, Sparkles, Trash2, Upload, Video, Wrench } from 'lucide-react';
import { pilotSchool } from '../data/pilotSchool';

const AUDIO_DB = 'hit-university-media';
const AUDIO_STORE = 'recordings';
const PDF_STORE = 'documents';

function openAudioDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(AUDIO_DB, 3);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(AUDIO_STORE)) request.result.createObjectStore(AUDIO_STORE, { keyPath: 'id' });
      if (!request.result.objectStoreNames.contains('narrations')) request.result.createObjectStore('narrations', { keyPath: 'id' });
      if (!request.result.objectStoreNames.contains(PDF_STORE)) request.result.createObjectStore(PDF_STORE, { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveTopicPdf(id, file) {
  const db = await openAudioDB();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(PDF_STORE, 'readwrite');
    transaction.objectStore(PDF_STORE).put({ id, blob: file, name: file.name, updatedAt: Date.now() });
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

async function readTopicPdfs(prefix) {
  const db = await openAudioDB();
  const documents = await new Promise((resolve, reject) => {
    const request = db.transaction(PDF_STORE, 'readonly').objectStore(PDF_STORE).getAll();
    request.onsuccess = () => resolve(request.result.filter((document) => document.id.startsWith(prefix)));
    request.onerror = () => reject(request.error);
  });
  db.close();
  return documents;
}

async function deleteTopicPdf(id) {
  const db = await openAudioDB();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(PDF_STORE, 'readwrite');
    transaction.objectStore(PDF_STORE).delete(id);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

async function writeRecording(id, blob, name) {
  const db = await openAudioDB();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(AUDIO_STORE, 'readwrite');
    transaction.objectStore(AUDIO_STORE).put({ id, blob, name, updatedAt: Date.now() });
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

async function readRecording(id) {
  const db = await openAudioDB();
  const recording = await new Promise((resolve, reject) => {
    const request = db.transaction(AUDIO_STORE, 'readonly').objectStore(AUDIO_STORE).get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return recording;
}

async function removeRecording(id) {
  const db = await openAudioDB();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(AUDIO_STORE, 'readwrite');
    transaction.objectStore(AUDIO_STORE).delete(id);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

async function writeNarration(id, blob, name) {
  const db = await openAudioDB();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction('narrations', 'readwrite');
    transaction.objectStore('narrations').put({ id, blob, name, updatedAt: Date.now() });
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

async function readNarration(id) {
  const db = await openAudioDB();
  const narration = await new Promise((resolve, reject) => {
    const request = db.transaction('narrations', 'readonly').objectStore('narrations').get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return narration;
}

function getYouTubeId(value) {
  try {
    const url = new URL(value);
    if (url.hostname.includes('youtu.be')) return url.pathname.slice(1).split('/')[0];
    if (url.hostname.includes('youtube.com')) return url.searchParams.get('v') || url.pathname.split('/').filter(Boolean).at(-1);
  } catch {
    return '';
  }
  return '';
}

function Classroom() {
  const { schoolId, moduleId } = useParams();
  const module = pilotSchool.modules.find((item) => item.id === moduleId) || pilotSchool.modules[0];
  const isPilotLesson = module.id === pilotSchool.modules[0].id;
  const [videoUrl, setVideoUrl] = useState(() => localStorage.getItem(`video:${module.id}`) || '');
  const [videos, setVideos] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`videos:${module.id}`) || '[]'); } catch { return []; }
  });
  const [videoDraft, setVideoDraft] = useState(videoUrl);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState('');
  const [activeTab, setActiveTab] = useState('lesson');
  const [activeTopic, setActiveTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [topicPdfs, setTopicPdfs] = useState([]);
  const [pdfError, setPdfError] = useState('');
  const [recording, setRecording] = useState(null);
  const [narration, setNarration] = useState(null);
  const [narrationLoading, setNarrationLoading] = useState(false);
  const [recordingBusy, setRecordingBusy] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingError, setRecordingError] = useState('');
  const recorderRef = useRef(null);
  const lesson = pilotSchool.lesson;
  const lessonTopics = isPilotLesson ? [lesson.title, 'Voltage and potential', 'Resistance and power', 'Putting it together'] : module.topics;
  const topicKey = `${module.id}:${activeTopic || lessonTopics[0]}`;
  const videoId = useMemo(() => getYouTubeId(videoUrl), [videoUrl]);

  useEffect(() => {
    let savedVideos = [];
    try { savedVideos = JSON.parse(localStorage.getItem(`videos:${module.id}`) || '[]'); } catch { savedVideos = []; }
    const legacyVideo = localStorage.getItem(`video:${module.id}`) || '';
    if (!savedVideos.length && legacyVideo) savedVideos = [legacyVideo];
    setVideos(savedVideos);
    setVideoUrl(savedVideos[0] || '');
    setVideoDraft('');
    setActiveTopic((current) => current && lessonTopics.includes(current) ? current : lessonTopics[0]);
    let currentUrl;
    readRecording(module.id).then((saved) => {
      if (saved?.blob) {
        currentUrl = URL.createObjectURL(saved.blob);
        setRecording({ ...saved, url: currentUrl });
      } else {
        setRecording(null);
      }
    }).catch(() => setRecordingError('Browser storage is unavailable for audio files.'));
    let narrationUrl;
    readNarration(module.id).then((saved) => {
      if (saved?.blob) {
        narrationUrl = URL.createObjectURL(saved.blob);
        setNarration({ ...saved, url: narrationUrl });
      } else {
        setNarration(null);
      }
    }).catch(() => {});
    return () => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      if (narrationUrl) URL.revokeObjectURL(narrationUrl);
    };
  }, [module.id]);

  useEffect(() => {
    const savedTopicNotes = localStorage.getItem(`lesson-note:${topicKey}`);
    const priorModuleNotes = activeTopic === lessonTopics[0] ? localStorage.getItem(`lesson-note:${module.id}`) : '';
    setNotes(savedTopicNotes ?? priorModuleNotes ?? '');
    setTopicPdfs([]);
    setPdfError('');
    let urls = [];
    readTopicPdfs(`topic-pdf:${topicKey}:`).then((documents) => {
      urls = documents.map((document) => ({ ...document, url: URL.createObjectURL(document.blob) }));
      setTopicPdfs(urls);
    }).catch(() => setPdfError('Could not load this topic’s PDFs from browser storage.'));
    return () => urls.forEach((document) => URL.revokeObjectURL(document.url));
  }, [topicKey]);

  const saveVideo = (event) => {
    event.preventDefault();
    const id = getYouTubeId(videoDraft);
    if (!id) return;
    const updatedVideos = [...new Set([...videos, videoDraft.trim()])];
    localStorage.setItem(`videos:${module.id}`, JSON.stringify(updatedVideos));
    setVideoUrl(videoDraft);
    setVideos(updatedVideos);
    setVideoDraft('');
  };

  const removeVideo = (url) => {
    const updatedVideos = videos.filter((item) => item !== url);
    localStorage.setItem(`videos:${module.id}`, JSON.stringify(updatedVideos));
    setVideos(updatedVideos);
    if (videoUrl === url) setVideoUrl(updatedVideos[0] || '');
  };

  const saveNotes = (value) => {
    setNotes(value);
    localStorage.setItem(`lesson-note:${topicKey}`, value);
  };

  const addTopicPdf = async (file) => {
    if (!file) return;
    setPdfError('');
    try {
      const id = `topic-pdf:${topicKey}:${Date.now()}:${file.name}`;
      await saveTopicPdf(id, file);
      const url = URL.createObjectURL(file);
      setTopicPdfs((current) => [...current, { id, name: file.name, blob: file, url }]);
    } catch {
      setPdfError('Could not save this PDF in browser storage. Try a smaller file.');
    }
  };

  const removeTopicPdf = async (document) => {
    try {
      await deleteTopicPdf(document.id);
      URL.revokeObjectURL(document.url);
      setTopicPdfs((current) => current.filter((item) => item.id !== document.id));
    } catch {
      setPdfError('Could not remove this PDF from browser storage.');
    }
  };

  const storeAudio = async (file) => {
    if (!file) return;
    setRecordingBusy(true);
    setRecordingError('');
    try {
      await writeRecording(module.id, file, file.name || 'Lesson recording');
      setRecording((current) => {
        if (current?.url) URL.revokeObjectURL(current.url);
        return { name: file.name || 'Lesson recording', blob: file, url: URL.createObjectURL(file) };
      });
    } catch {
      setRecordingError('Could not save this audio file in browser storage. Try a smaller file.');
    } finally {
      setRecordingBusy(false);
    }
  };

  const toggleRecording = async () => {
    setRecordingError('');
    if (recorderRef.current?.state === 'recording') {
      recorderRef.current.stop();
      setIsRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
        const extension = blob.type.includes('mp4') ? 'm4a' : 'webm';
        await storeAudio(new File([blob], `lesson-recording-${Date.now()}.${extension}`, { type: blob.type }));
      };
      recorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setRecordingError('Microphone access was unavailable. You can upload an audio file instead.');
    }
  };

  const clearRecording = async () => {
    try {
      await removeRecording(module.id);
      setRecording((current) => {
        if (current?.url) URL.revokeObjectURL(current.url);
        return null;
      });
    } catch {
      setRecordingError('Could not remove this recording from browser storage.');
    }
  };

  const generateNarration = async () => {
    const noteText = localStorage.getItem(`lesson-note:${topicKey}`) || '';
    const text = [lesson.title, ...lesson.sections.flatMap((section) => [section.heading, section.body, section.callout || '']), noteText ? `My notes. ${noteText}` : ''].filter(Boolean).join('\n\n');
    setNarrationLoading(true);
    setRecordingError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.BASE_URL.replace(/\/$/, ''))}/api/narrate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: activeTopic || lesson.title, text }),
      });
      if (!response.ok) {
        const detail = await response.json().catch(() => ({}));
        throw new Error(detail.detail || 'The local audio service could not create an MP3.');
      }
      const blob = await response.blob();
      await writeNarration(module.id, blob, `${lesson.title}.mp3`);
      setNarration((current) => {
        if (current?.url) URL.revokeObjectURL(current.url);
        return { id: module.id, name: `${lesson.title}.mp3`, blob, url: URL.createObjectURL(blob), updatedAt: Date.now() };
      });
    } catch (error) {
      setRecordingError(error.message || 'The local audio service is unavailable.');
    } finally {
      setNarrationLoading(false);
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const question = chatMessage.trim();
    if (!question || chatLoading) return;
    setChatHistory((history) => [...history, { role: 'user', content: question }]);
    setChatMessage('');
    setChatError('');
    setChatLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.BASE_URL.replace(/\/$/, ''))}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `Current lesson: ${lesson.title}. School: ${pilotSchool.name}. Lesson content: ${lesson.sections.map((section) => `${section.heading}: ${section.body}`).join('\n')}\n\nStudent question: ${question}`,
          school: schoolId,
          level: 'L1',
        }),
      });
      if (!response.ok) throw new Error(`Tutor service returned ${response.status}.`);
      const result = await response.json();
      setChatHistory((history) => [...history, { role: 'assistant', content: result.answer || 'I could not find an answer for that yet.' }]);
    } catch {
      setChatError('The tutor service is unavailable. Start the local API to ask questions from this lesson.');
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="site-shell lesson-shell">
      <header className="topbar"><Link to="/" className="brand-lockup"><span className="brand-mark"><BookOpen size={19}/></span><span>HIT <b>University</b></span></Link><div className="lesson-breadcrumb"><Link to={`/school/${schoolId}`}>School of Electronics</Link><span>/</span><span>{module.title}</span></div><Link to={`/school/${schoolId}`} className="back-link"><ArrowLeft size={15}/> Course home</Link></header>
      <main className="lesson-page">
        <aside className="lesson-outline"><p className="eyebrow">YOUR COURSE</p><h3>{module.title}</h3><div className="outline-progress"><span style={{ width: `${module.progress || 5}%` }}/></div><small className="outline-progress-label">{module.progress || 0}% explored</small><p className="outline-label">LESSONS</p>{lessonTopics.map((topic, index) => <button key={topic} className={`outline-link ${activeTopic === topic ? 'selected' : ''}`} onClick={() => { setActiveTopic(topic); setActiveTab('lesson'); }}><span className="outline-check">{index === 0 ? <Play size={11} fill="currentColor"/> : index < 2 && isPilotLesson ? <Check size={12}/> : String(index + 1).padStart(2, '0')}</span><span>{topic}</span>{!isPilotLesson && <span className="outline-soon">SOON</span>}</button>)}<div className="outline-bottom"><span className="outline-icon"><Wrench size={15}/></span><p><b>Build as you learn</b><small>Connect lesson ideas to a project.</small></p></div></aside>

        <div className="lesson-main-column">
        <div className="lesson-kicker"><span><span className="kicker-dot"/> MODULE {module.number}</span><span>·</span><span>{module.topics.length} TOPICS</span><button className="lesson-more">•••</button></div>
          {isPilotLesson ? <>
            <h1 className="lesson-title">{lesson.title}<span className="period">.</span></h1><p className="lesson-lead">The language of every circuit. Get comfortable with the quantities that make electronics work.</p>
            <div className="lesson-tabs"><button className={activeTab === 'lesson' ? 'active' : ''} onClick={() => setActiveTab('lesson')}><BookOpen size={15}/> Lesson</button><button className={activeTab === 'video' ? 'active' : ''} onClick={() => setActiveTab('video')}><Video size={15}/> Media</button><button className={activeTab === 'notes' ? 'active' : ''} onClick={() => setActiveTab('notes')}><FileText size={15}/> My notes</button><button className={activeTab === 'practice' ? 'active' : ''} onClick={() => setActiveTab('practice')}><Lightbulb size={15}/> Practice</button></div>
            {activeTab === 'lesson' && <article className="lesson-article"><div className="learning-goals"><span className="goals-icon"><Sparkles size={17}/></span><div><b>By the end of this lesson</b><ul>{lesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></div></div><div className="lesson-prose">{lesson.sections.map((section, index) => <section key={section.heading} className="lesson-section"><span className="section-index">0{index + 1}</span><div><h2>{section.heading}</h2><p>{section.body}</p>{section.callout && <div className="lesson-callout"><Lightbulb size={17}/><span>{section.callout}</span></div>}</div></section>)}</div><div className="source-note"><FileText size={15}/><span>Based on your library note</span><Link to={lesson.resources[0].href}>Open in HIT Library <ArrowUpRight size={13}/></Link></div></article>}
            {activeTab === 'video' && <div className="media-stack"><section className="video-tab-card"><div className="tab-card-heading"><span className="resource-icon youtube-icon"><Play size={17} fill="currentColor"/></span><div><h2>Your video shelf</h2><p>Save videos you find and keep them beside this lesson.</p></div></div>{videoId ? <div className="video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${videoId}`} title={`${lesson.title} video lesson`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/></div> : <div className="video-empty"><div className="video-empty-icon"><Video size={25}/></div><b>Add a video to this lesson</b><span>Paste a YouTube link, then select it from your saved video shelf.</span></div>}<form className="video-add-form" onSubmit={saveVideo}><input value={videoDraft} onChange={(event) => setVideoDraft(event.target.value)} placeholder="Paste a YouTube URL" aria-label="YouTube video URL"/><button type="submit" className="button button-dark">Save video <ArrowRight size={15}/></button></form>{videos.length > 0 && <div className="saved-video-list">{videos.map((url, index) => <div className={`saved-video-row ${videoUrl === url ? 'selected' : ''}`} key={url}><button onClick={() => setVideoUrl(url)}><Play size={13} fill="currentColor"/><span>{getYouTubeId(url)}</span></button><button className="remove-media" aria-label={`Remove saved video ${index + 1}`} onClick={() => removeVideo(url)}><Trash2 size={13}/></button></div>)}</div>}<a className="resource-search-link" href={lesson.resources[1].href} target="_blank" rel="noreferrer">Search YouTube for this topic <ExternalLink size={13}/></a></section>
              <section className="audio-card"><div className="audio-title"><span className="resource-icon audio-icon"><AudioLines size={18}/></span><div><h2>Audio notes</h2><p>Record a quick thought or add an audio file.</p></div></div>{recording ? <div className="saved-audio"><div className="saved-audio-name"><FileAudio size={15}/><span>{recording.name}</span><button className="remove-media" onClick={clearRecording} aria-label="Remove audio"><Trash2 size={14}/></button></div><audio controls src={recording.url}>Audio playback is not supported in this browser.</audio></div> : <div className="audio-empty">Your recording or audio upload will appear here.</div>}<div className="audio-actions"><button className={`audio-record ${isRecording ? 'recording' : ''}`} onClick={toggleRecording} type="button"><Mic size={15}/>{isRecording ? 'Stop recording' : 'Record audio'}</button><label className="audio-upload"><Upload size={14}/>{recordingBusy ? 'Saving…' : 'Upload audio'}<input type="file" accept="audio/*" disabled={recordingBusy} onChange={(event) => { storeAudio(event.target.files?.[0]); event.target.value = ''; }}/></label></div><div className="narration-section"><div><b>Listen to this lesson</b><small>Make an MP3 that you can keep and play offline.</small></div><button className="narration-button" disabled={narrationLoading} onClick={generateNarration}>{narrationLoading ? 'Creating MP3…' : narration ? 'Refresh MP3' : 'Create lesson MP3'} <ArrowRight size={14}/></button></div>{narration && <div className="saved-audio narration-player"><div className="saved-audio-name"><AudioLines size={15}/><span>{narration.name}</span><a className="download-audio" href={narration.url} download={narration.name}>Download</a></div><audio controls src={narration.url} onPlay={() => { if ('mediaSession' in navigator && typeof MediaMetadata !== 'undefined') navigator.mediaSession.metadata = new MediaMetadata({ title: activeTopic || lesson.title, artist: 'HIT University', album: 'School of Electronics' }); }}>Audio playback is not supported in this browser.</audio></div>}{recordingError && <p className="media-error">{recordingError}</p>}<small className="storage-note">Files stay in this browser. MP3 creation uses the local Mac voice service; it does not send note text to a speech provider.</small></section><section className="pdf-shelf"><div className="tab-card-heading"><span className="resource-icon pdf-icon"><FileText size={17}/></span><div><h2>Textbooks and PDFs</h2><p>Keep reference PDFs beside {activeTopic || lesson.title}.</p></div><label className="audio-upload"><Upload size={14}/> Add PDF<input type="file" accept="application/pdf,.pdf" onChange={(event) => { addTopicPdf(event.target.files?.[0]); event.target.value = ''; }}/></label></div>{pdfError && <p className="media-error">{pdfError}</p>}{topicPdfs.map((document) => <div className="topic-pdf-item" key={document.id}><div className="saved-audio-name"><FileText size={15}/><span>{document.name}</span><button className="remove-media" onClick={() => removeTopicPdf(document)} aria-label={`Remove ${document.name}`}><Trash2 size={14}/></button></div><iframe className="topic-pdf-frame" title={document.name} src={document.url}/></div>)}{!topicPdfs.length && !pdfError && <div className="audio-empty">Add a PDF to read it right here in this topic.</div>}</section></div>}
            {activeTab === 'notes' && <section className="personal-notes-card"><div className="notes-heading"><span className="resource-icon notes-icon"><FileText size={18}/></span><div><h2>My notes · {activeTopic || lesson.title}</h2><p>Capture questions, examples, or your own explanation for this topic.</p></div><span className="autosave-mark"><Save size={13}/> Saved here</span></div><textarea value={notes} onChange={(event) => saveNotes(event.target.value)} placeholder={`Write your notes about ${activeTopic || lesson.title}…\n\n• What clicked for me\n• Questions to ask the tutor\n• How I could apply this in a project`} aria-label="Personal lesson notes"/><div className="notes-footer"><span>Private to this browser · autosaved for this topic</span><span>{notes.length} characters</span></div></section>}
            {activeTab === 'practice' && <section className="practice-card"><span className="eyebrow">QUICK CHECK · NO GRADES</span><h2>Think it through</h2><p>A sensor circuit uses a 3.3 V supply and draws 10 mA. What resistance would draw that current if it were the only load?</p><details><summary>Show a hint <ChevronDown size={15}/></summary><p>Use Ohm’s law: R = V / I. Convert milliamps into amps first.</p></details><details><summary>Reveal the worked answer <ChevronDown size={15}/></summary><p>10 mA = 0.01 A, so R = 3.3 / 0.01 = 330 Ω.</p></details></section>}
            <div className="resource-strip"><div><span className="eyebrow">GO DEEPER</span><b>Resources selected for this lesson</b></div>{lesson.resources.slice(1).map((resource) => <a key={resource.title} href={resource.href} target="_blank" rel="noreferrer"><span className="resource-type">{resource.kind}</span><b>{resource.title}</b><ExternalLink size={14}/></a>)}</div>
            <div className="lesson-footer-nav"><span><Check size={14}/> Lesson notes stay connected to your library</span><Link to={`/school/${schoolId}#projects`}>Next: build a project <ArrowRight size={15}/></Link></div>
          </> : <section className="module-preview-card"><span className="module-preview-icon"><BookOpen size={23}/></span><p className="eyebrow">CURRICULUM PREVIEW</p><h1>{module.title}</h1><p>This module is mapped in the Electronics curriculum. Select a topic to keep notes and reference PDFs with it.</p><div className="module-topic-chips">{module.topics.map((topic) => <button type="button" className={activeTopic === topic ? 'selected' : ''} key={topic} onClick={() => setActiveTopic(topic)}>{topic}</button>)}</div><section className="personal-notes-card"><div className="notes-heading"><span className="resource-icon notes-icon"><FileText size={18}/></span><div><h2>My notes · {activeTopic || module.topics[0]}</h2><p>Capture questions, examples, or your own explanation for this topic.</p></div><span className="autosave-mark"><Save size={13}/> Saved here</span></div><textarea value={notes} onChange={(event) => saveNotes(event.target.value)} placeholder={`Write your notes about ${activeTopic || module.topics[0]}…`} aria-label="Personal topic notes"/><div className="notes-footer"><span>Private to this browser · autosaved for this topic</span><span>{notes.length} characters</span></div></section><section className="pdf-shelf"><div className="tab-card-heading"><span className="resource-icon pdf-icon"><FileText size={17}/></span><div><h2>Textbooks and PDFs</h2><p>Keep reference PDFs beside {activeTopic || module.topics[0]}.</p></div><label className="audio-upload"><Upload size={14}/> Add PDF<input type="file" accept="application/pdf,.pdf" onChange={(event) => { addTopicPdf(event.target.files?.[0]); event.target.value = ''; }}/></label></div>{pdfError && <p className="media-error">{pdfError}</p>}{topicPdfs.map((document) => <div className="topic-pdf-item" key={document.id}><div className="saved-audio-name"><FileText size={15}/><span>{document.name}</span><button className="remove-media" onClick={() => removeTopicPdf(document)} aria-label={`Remove ${document.name}`}><Trash2 size={14}/></button></div><iframe className="topic-pdf-frame" title={document.name} src={document.url}/></div>)}{!topicPdfs.length && !pdfError && <div className="audio-empty">Add a PDF to read it right here in this topic.</div>}</section><Link to={`/classroom/${schoolId}/${pilotSchool.modules[0].id}`} className="button button-dark">Open the pilot lesson <ArrowRight size={15}/></Link></section>}
        </div>

        <aside className="lesson-right-rail"><section className="tutor-card"><div className="tutor-heading"><span className="tutor-avatar"><Sparkles size={17}/></span><span><b>Ask your tutor</b><small>Lesson-aware · preview</small></span><span className="tutor-status" title="Local API connection"/></div><p className="tutor-intro">Ask about <b>{isPilotLesson ? lesson.title : module.title}</b>. The lesson context is sent with your question.</p><div className="tutor-starters"><span>Try asking</span>{['Why do electrons move opposite to current?', 'How does voltage make current flow?'].map((question) => <button key={question} onClick={() => setChatMessage(question)}>{question}<ArrowUpRight size={12}/></button>)}</div><div className="tutor-chat" aria-live="polite">{chatHistory.length === 0 ? <div className="tutor-empty"><MessageCircle size={18}/><span>Your lesson conversation will show up here.</span></div> : chatHistory.map((message, index) => <div key={`${message.role}-${index}`} className={`chat-bubble ${message.role}`}>{message.content}</div>)}{chatLoading && <div className="chat-bubble assistant typing">Thinking through the lesson…</div>}{chatError && <p className="chat-error">{chatError}</p>}</div><form className="tutor-form" onSubmit={handleSendMessage}><input value={chatMessage} onChange={(event) => setChatMessage(event.target.value)} placeholder="Ask a question…" aria-label="Ask the tutor"/><button type="submit" disabled={chatLoading || !chatMessage.trim()} aria-label="Send question"><Send size={15}/></button></form><small className="tutor-footnote"><HelpCircle size={12}/> Local tutor API connection required</small></section>
          <section className="connected-card"><p className="eyebrow">CONNECTED PROJECT</p><div className="connected-title"><span className="connected-icon"><Wrench size={16}/></span><b>Cold-chain logger</b></div><p>See how circuit fundamentals power a medicine safety device.</p><div className="connected-path"><span>Electrical quantities</span><ArrowRight size={12}/><span>Sensor circuit</span><ArrowRight size={12}/><span>Logger</span></div><Link to={`/school/${schoolId}#projects`} className="text-link">Open project path <ArrowUpRight size={14}/></Link></section>
          <section className="connected-card map-connection"><p className="eyebrow">MIND MAP CONNECTION</p><div className="mini-map"><span className="mini-map-line ml-a"/><span className="mini-map-line ml-b"/><span className="mini-map-node central">Current</span><span className="mini-map-node mn-a">Charge</span><span className="mini-map-node mn-b">Voltage</span><span className="mini-map-node mn-c">Circuit</span></div><Link to={`/school/${schoolId}#map`} className="text-link">See connected ideas <Link2 size={14}/></Link></section>
        </aside>
      </main>
    </div>
  );
}

export default Classroom;
