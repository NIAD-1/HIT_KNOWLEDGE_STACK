import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Radio } from 'lucide-react';

const AudioPlayerContext = createContext(null);

export function AudioPlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentTrack = queue[currentIndex] || null;

  const playQueue = (tracks, index = 0) => {
    const prepared = tracks.map((track) => ({ ...track, playbackUrl: track.blob ? URL.createObjectURL(track.blob) : track.url }));
    setQueue(prepared);
    setCurrentIndex(index);
    const player = audioRef.current;
    if (player && prepared[index]?.playbackUrl) {
      player.src = prepared[index].playbackUrl;
      player.play().catch(() => {});
    }
  };

  const togglePlayback = () => {
    const player = audioRef.current;
    if (!player || !currentTrack) return;
    if (player.paused) player.play().catch(() => {});
    else player.pause();
  };

  const moveTrack = (direction) => {
    const nextIndex = currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= queue.length) return;
    setCurrentIndex(nextIndex);
    if (audioRef.current) {
      audioRef.current.src = queue[nextIndex].playbackUrl;
      audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (!currentTrack || !('mediaSession' in navigator) || typeof MediaMetadata === 'undefined') return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: (currentTrack.name || 'Lesson audio').replace(/\.mp3$/i, ''),
      artist: 'HIT University',
      album: 'Study audio',
    });
    const safeHandler = (action, handler) => {
      try { navigator.mediaSession.setActionHandler(action, handler); } catch { /* Optional browser action. */ }
    };
    safeHandler('play', () => audioRef.current?.play());
    safeHandler('pause', () => audioRef.current?.pause());
    safeHandler('previoustrack', () => moveTrack(-1));
    safeHandler('nexttrack', () => moveTrack(1));
  }, [currentIndex, currentTrack]);

  const handleEnded = () => {
    if (currentIndex < queue.length - 1) moveTrack(1);
    else setIsPlaying(false);
  };

  return <AudioPlayerContext.Provider value={{ queue, currentIndex, currentTrack, isPlaying, playQueue, togglePlayback, moveTrack }}>
    {children}
    {currentTrack && <div className="global-audio-player"><span className="global-player-art"><Radio size={17}/></span><div className="global-player-info"><b>{(currentTrack.name || '').replace(/\.mp3$/i, '')}</b><small>HIT University · Study audio</small></div><button className="global-skip" onClick={() => moveTrack(-1)} disabled={currentIndex <= 0} aria-label="Previous audio"><ChevronLeft size={18}/></button><button className="global-play" onClick={togglePlayback} aria-label={isPlaying ? 'Pause audio' : 'Play audio'}>{isPlaying ? <Pause size={16} fill="currentColor"/> : <Play size={16} fill="currentColor"/>}</button><button className="global-skip" onClick={() => moveTrack(1)} disabled={currentIndex >= queue.length - 1} aria-label="Next audio"><ChevronRight size={18}/></button><audio ref={audioRef} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={handleEnded} controls preload="metadata"/></div>}
  </AudioPlayerContext.Provider>;
}

export function useAudioPlayer() {
  return useContext(AudioPlayerContext);
}
