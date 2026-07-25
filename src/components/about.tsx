"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";
import { BlurFade } from "@/components/ui/blur-fade";

export function About() {
  const letters = wedding.about.letters;
  const photos = wedding.aboutImages;
  const [letterIndex, setLetterIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const letterCount = letters.length;

  function goToLetter(next: number) {
    const index = ((next % letterCount) + letterCount) % letterCount;
    setLetterIndex(index);
    const preferred = photos.findIndex(
      (photo) => photo.src === letters[index].photoSrc,
    );
    if (preferred >= 0) setPhotoIndex(preferred);
  }

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setLetterIndex((current) => {
        const index = (current + 1) % letterCount;
        const preferred = photos.findIndex(
          (photo) => photo.src === letters[index].photoSrc,
        );
        if (preferred >= 0) setPhotoIndex(preferred);
        return index;
      });
    }, 14000);
    return () => window.clearInterval(id);
  }, [paused, letterCount, letters, photos]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setPhotoIndex((i) => (i + 1) % photos.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused, photos.length]);

  return (
    <section id="sobre" className="bg-paper px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <BlurFade inView className="order-2 lg:order-1">
          <div className="mx-auto max-w-lg lg:mx-0">
            <p className="mb-6 text-[11px] tracking-[0.3em] uppercase text-muted">
              {wedding.about.eyebrow}
            </p>

            <div
              className="mb-8 flex items-center gap-1 border-b border-line"
              role="tablist"
              aria-label="Cartas"
            >
              {letters.map((item, index) => {
                const active = index === letterIndex;
                return (
                  <button
                    key={item.author}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={`relative px-4 pb-3 pt-1 font-serif text-lg transition ${
                      active ? "text-ink" : "text-muted hover:text-ink/70"
                    }`}
                    onClick={() => {
                      setPaused(true);
                      goToLetter(index);
                    }}
                  >
                    {item.author}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3 -bottom-px h-px bg-accent transition-opacity duration-500 ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div
                aria-hidden
                className="absolute -inset-x-3 -inset-y-2 rotate-[-1.5deg] bg-sand/60 shadow-sm"
              />
              <div className="relative">
                {letters.map((item, index) => (
                  <article
                    key={item.author}
                    className={`letter-paper rotate-[0.8deg] px-8 py-10 shadow-[0_18px_50px_-28px_rgba(58,42,32,0.45)] transition-opacity duration-[1000ms] ease-out md:px-11 md:py-12 ${
                      index === letterIndex
                        ? "relative opacity-100"
                        : "pointer-events-none absolute inset-x-0 top-0 opacity-0"
                    }`}
                    aria-hidden={index !== letterIndex}
                  >
                    <div className="space-y-4 font-serif text-[1.15rem] leading-relaxed text-ink/90 md:text-[1.25rem]">
                      {item.body.map((paragraph) => (
                        <p key={paragraph.slice(0, 28)}>{paragraph}</p>
                      ))}
                    </div>
                    <p className="mt-8 text-right font-script text-4xl text-ink md:text-5xl">
                      {item.signature}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {letters.map((item, index) => (
                  <button
                    key={item.author}
                    type="button"
                    aria-label={`Ver carta de ${item.author}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index === letterIndex
                        ? "w-7 bg-accent"
                        : "w-1.5 bg-line hover:bg-accent-soft"
                    }`}
                    onClick={() => {
                      setPaused(true);
                      goToLetter(index);
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3 text-accent">
                <button
                  type="button"
                  aria-label="Carta anterior"
                  className="flex h-10 w-10 items-center justify-center border border-line transition hover:bg-sand"
                  onClick={() => {
                    setPaused(true);
                    goToLetter(letterIndex - 1);
                  }}
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Próxima carta"
                  className="flex h-10 w-10 items-center justify-center border border-line transition hover:bg-sand"
                  onClick={() => {
                    setPaused(true);
                    goToLetter(letterIndex + 1);
                  }}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.15} className="order-1 lg:sticky lg:top-24 lg:order-2">
          <div className="relative mx-auto max-w-md">
            <div className="photo-frame rotate-1">
              <div className="relative aspect-[3/4] overflow-hidden">
                {photos.map((photo, photoIdx) => (
                  <div
                    key={photo.src}
                    className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
                      photoIdx === photoIndex ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden={photoIdx !== photoIndex}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 90vw, 420px"
                      className="object-cover"
                      priority={photoIdx === 0}
                    />
                  </div>
                ))}
              </div>
              <div className="relative mt-3 h-10">
                {photos.map((photo, photoIdx) => (
                  <p
                    key={photo.src}
                    className={`absolute inset-x-0 text-center font-script text-2xl text-accent transition-opacity duration-[1600ms] ease-out ${
                      photoIdx === photoIndex ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden={photoIdx !== photoIndex}
                  >
                    {photo.caption}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-4 text-accent">
              <button
                type="button"
                aria-label="Foto anterior"
                className="flex h-10 w-10 items-center justify-center border border-line transition hover:bg-sand"
                onClick={() => {
                  setPaused(true);
                  setPhotoIndex(
                    (i) => (i - 1 + photos.length) % photos.length,
                  );
                }}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Próxima foto"
                className="flex h-10 w-10 items-center justify-center border border-line transition hover:bg-sand"
                onClick={() => {
                  setPaused(true);
                  setPhotoIndex((i) => (i + 1) % photos.length);
                }}
              >
                ›
              </button>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
