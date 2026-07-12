"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";
import { BlurFade } from "@/components/ui/blur-fade";

export function About() {
  const [index, setIndex] = useState(0);
  const photos = wedding.aboutImages;
  const current = photos[index];

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [photos.length]);

  return (
    <section id="sobre" className="bg-paper px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <BlurFade inView className="order-2 lg:order-1">
          <div className="relative bg-cream px-8 py-12 md:px-12 md:py-16">
            <div className="mb-10 flex items-start justify-between gap-4">
              <svg
                viewBox="0 0 64 64"
                className="h-12 w-12 text-accent-soft"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                aria-hidden
              >
                <path d="M32 52c-8-6-20-16-20-28a12 12 0 0 1 22-6 12 12 0 0 1 22 6c0 12-12 22-20 28Z" />
                <path d="M20 22c4 2 8 2 12 0M32 22c4 2 8 2 12 0" />
              </svg>
              <p className="text-right text-xs tracking-[0.18em] uppercase text-muted">
                {wedding.names}
                <br />
                ( 2026 )
              </p>
            </div>

            <p className="mb-4 text-[11px] tracking-[0.3em] uppercase text-muted">
              {wedding.about.eyebrow}
            </p>
            <h2 className="font-serif text-3xl leading-snug text-ink md:text-4xl">
              {wedding.about.title}
            </h2>
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted md:text-base">
              {wedding.about.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-10 font-script text-3xl text-accent-soft">
              {wedding.about.signature} {wedding.names}
            </p>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.15} className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-md">
            <div className="photo-frame rotate-1">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 420px"
                  className="object-cover transition-opacity duration-500"
                  priority={false}
                />
              </div>
              <p className="mt-3 text-center font-script text-2xl text-accent">
                {current.caption}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-end gap-4 text-accent">
              <button
                type="button"
                aria-label="Foto anterior"
                className="flex h-10 w-10 items-center justify-center border border-line transition hover:bg-sand"
                onClick={() =>
                  setIndex((i) => (i - 1 + photos.length) % photos.length)
                }
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Próxima foto"
                className="flex h-10 w-10 items-center justify-center border border-line transition hover:bg-sand"
                onClick={() => setIndex((i) => (i + 1) % photos.length)}
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
