import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, AudioLines, BookOpen, Download, Headphones, Pause, Play, Radio, Sparkles } from 'lucide-react';
import { pilotSchool } from '../data/pilotSchool';
import { useAudioPlayer } from '../components/AudioPlayer';

function Listen() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentTrack, isPlaying, playQueue, togglePlayback } = useAudioPlayer();

  useEffect(() => {
    let objectUrls = [];
    const request = indexedDB.open('hit-university-media', 2);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains('recordings')) request.result.createObjectStore('recordings', { keyPath: 'id' });
      if (!request.result.objectStoreNames.contains('narrations')) request.result.createObjectStore('narrations', { keyPath: 'id' });
    };
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['narrations', 'recordings'], 'readonly');
      const narrationRequest = transaction.objectStore('narrations').getAll();
      const recordingRequest = transaction.objectStore('recordings').getAll();
      transaction.oncomplete = () => {
        const savedNarrations = narrationRequest.result.map((item) => ({ ...item, kind: 'Lesson MP3' }));
        const savedRecordings = recordingRequest.result.map((item) => ({ ...item, kind: 'Audio note' }));
        objectUrls = [...savedNarrations, ...savedRecordings].map((item) => ({ ...item, url: URL.createObjectURL(item.blob) }));
        setTracks(objectUrls);
        setLoading(false);
        db.close();
      };
      transaction.onerror = () => { setLoading(false); db.close(); };
    };
    request.onerror = () => setLoading(false);
    return () => objectUrls.forEach((track) => URL.revokeObjectURL(track.url));
  }, []);

  const playTrack = (index) => playQueue(tracks, index);

  return <div className="site-shell listen-shell">
    <header className="topbar"><Link to="/" className="brand-lockup"><span className="brand-mark"><Headphones size={18}/></span><span>HIT <b>University</b></span></Link><div className="listen-header-label">YOUR LEARNING AUDIO</div><Link to={`/classroom/${pilotSchool.id}/${pilotSchool.modules[0].id}`} className="back-link"><ArrowLeft size={15}/> Back to lesson</Link></header>
    <main className="listen-page">
      <div className="listen-welcome"><span className="listen-orb"><AudioLines size={27}/></span><p className="eyebrow">HIT AUDIO · YOUR LIBRARY</p><h1>Take your learning<br/><span>with you.</span></h1><p>Listen to lesson MP3s while you commute, walk, or take a break.</p><Link to={`/classroom/${pilotSchool.id}/${pilotSchool.modules[0].id}`} className="button button-dark"><BookOpen size={15}/> Create lesson audio</Link></div>
      <section className="playlist-card"><div className="playlist-heading"><div><p className="eyebrow">OFFLINE READY</p><h2>Your lesson playlist</h2><p>MP3s saved on this device can play without a connection.</p></div><span className="track-count">{tracks.length} {tracks.length === 1 ? 'TRACK' : 'TRACKS'}</span></div>{loading ? <div className="playlist-empty">Loading your audio…</div> : tracks.length === 0 ? <div className="playlist-empty"><span className="playlist-empty-icon"><Radio size={20}/></span><b>Your playlist is ready for its first lesson.</b><span>Open a lesson and choose “Create lesson MP3” to add one here.</span><Link to={`/classroom/${pilotSchool.id}/${pilotSchool.modules[0].id}`} className="text-link">Go to Electrical Quantities <ArrowUpRight size={14}/></Link></div> : <div className="track-list">{tracks.map((track, index) => <div className={`track-row ${currentTrack?.id === track.id ? 'active' : ''}`} key={`${track.kind}:${track.id}`}><span className="track-index">{String(index + 1).padStart(2, '0')}</span><span className="track-art"><AudioLines size={16}/></span><div className="track-copy"><b>{track.name.replace(/\.mp3$/i, '')}</b><small>School of Electronics · {track.kind}</small></div><button className="track-play" onClick={() => playTrack(index)} aria-label={`Play ${track.name}`}>{currentTrack?.id === track.id && isPlaying ? <Pause size={14} fill="currentColor"/> : <Play size={14} fill="currentColor"/>}</button><a className="track-download" href={track.url} download={track.name} aria-label={`Download ${track.name}`}><Download size={15}/></a></div>)}</div>}
        {currentTrack && <div className="full-player"><div className="player-track"><span className="player-art"><Sparkles size={18}/></span><span><b>{currentTrack.name.replace(/\.mp3$/i, '')}</b><small>HIT University · Study audio</small></span><button className="listen-big-play" onClick={togglePlayback} aria-label={isPlaying ? 'Pause' : 'Play'}>{isPlaying ? <Pause size={18} fill="currentColor"/> : <Play size={18} fill="currentColor"/>}</button></div><p className="player-note">Playback continues as you move around the app. Lock-screen controls depend on iPhone Safari support.</p></div>}
      </section>
      <div className="listen-privacy"><span><Sparkles size={14}/> Personal audio stays in this browser’s storage.</span><span>MP3 narration is generated on your Mac.</span></div>
    </main>
  </div>;
}

export default Listen;
