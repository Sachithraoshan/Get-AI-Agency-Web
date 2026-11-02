import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  scriptTitle: string;
  audioUrl: string;
  duration?: string;
  description: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  scriptTitle,
  audioUrl,
  duration = '0:30',
  description
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showScript, setShowScript] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setTotalDuration(audio.duration || 30);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio playback error:', err);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const restartAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    if (!isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <div className="bg-neutral-900 text-white border border-neutral-800 rounded-sm p-5 sm:p-6">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Header Info */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
            {title}
          </span>
          <h4 className="text-base font-bold text-white tracking-tight">
            {scriptTitle}
          </h4>
        </div>
        <span className="text-[11px] font-mono text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-xs">
          {duration}
        </span>
      </div>

      {/* Controls and Scrubber */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="w-10 h-10 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-black" />
            ) : (
              <Play className="w-4 h-4 fill-black ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={restartAudio}
            title="Restart"
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Progress Slider */}
          <div className="flex-1 flex items-center gap-2">
            <span className="text-[10px] font-mono text-neutral-400 w-8 text-right">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={totalDuration || 30}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white"
            />
            <span className="text-[10px] font-mono text-neutral-400 w-8">
              {formatTime(totalDuration || 30)}
            </span>
          </div>

          <button
            type="button"
            onClick={toggleMute}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Script Toggle */}
        <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowScript(!showScript)}
            className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            {showScript ? 'Hide Narration Script' : 'Read Narration Script'}
          </button>
          <span className="text-[10px] font-mono text-neutral-500">
            Synthetic Voice Model
          </span>
        </div>

        {/* Expandable Script Box */}
        {showScript && (
          <div className="mt-3 p-4 bg-neutral-950 border border-neutral-800 rounded-xs text-xs text-neutral-300 leading-relaxed font-sans">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-2">
              Full Voiceover Transcript:
            </span>
            <p className="italic">
              "{description}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
