"use client";

import { useEffect, useRef, useState } from "react";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.45;

    const tryPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
        setNeedsGesture(false);
      } catch {
        setNeedsGesture(true);
        setPlaying(false);
      }
    };

    void tryPlay();
  }, []);

  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
      setNeedsGesture(false);
    } catch {
      setNeedsGesture(true);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio ref={audioRef} src="/theme.mp3" preload="auto" playsInline />
      <div className="flex items-center gap-2 rounded-full border border-line bg-paper/95 px-3 py-2 shadow-[0_12px_40px_rgba(44,36,31,0.12)] backdrop-blur">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-paper transition hover:bg-ink"
          aria-label={playing ? "Pausar música" : "Tocar música"}
        >
          {playing ? (
            <span className="text-sm" aria-hidden>
              ❚❚
            </span>
          ) : (
            <span className="ml-0.5 text-sm" aria-hidden>
              ▶
            </span>
          )}
        </button>
        <div className="pr-2">
          <p className="text-[10px] tracking-[0.18em] uppercase text-muted">
            {needsGesture ? "Toque para ouvir" : "Tribalistas"}
          </p>
          <p className="font-serif text-sm text-ink">Aliança</p>
        </div>
      </div>
    </div>
  );
}
