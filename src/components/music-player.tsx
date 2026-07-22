"use client";

import { useEffect, useRef, useState } from "react";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const unlockedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.45;
    audio.setAttribute("playsinline", "true");

    const start = async () => {
      if (unlockedRef.current) return;
      try {
        await audio.play();
        unlockedRef.current = true;
        setPlaying(true);
        setNeedsGesture(false);
        return true;
      } catch {
        setNeedsGesture(true);
        setPlaying(false);
        return false;
      }
    };

    void start();

    const unlock = () => {
      void start().then((ok) => {
        if (ok) {
          window.removeEventListener("pointerdown", unlock);
          window.removeEventListener("touchstart", unlock);
          window.removeEventListener("keydown", unlock);
        }
      });
    };

    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("keydown", unlock);

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
      unlockedRef.current = true;
      setNeedsGesture(false);
    } catch {
      setNeedsGesture(true);
    }
  }

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 sm:right-5">
      <audio
        ref={audioRef}
        src="/theme.mp3"
        preload="auto"
        playsInline
        loop
      />
      <div
        className={`flex items-center gap-2 rounded-full border bg-paper/95 px-3 py-2 shadow-[0_12px_40px_rgba(44,36,31,0.12)] backdrop-blur transition ${
          needsGesture && !playing
            ? "border-accent animate-pulse"
            : "border-line"
        }`}
      >
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
            {needsGesture && !playing ? "Toque para ouvir" : "Tribalistas"}
          </p>
          <p className="font-serif text-sm text-ink">Aliança</p>
        </div>
      </div>
    </div>
  );
}
