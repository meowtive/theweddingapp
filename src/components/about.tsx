"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";
import { BlurFade } from "@/components/ui/blur-fade";

export function About() {
  const [index, setIndex] = useState(0);
  const photos = wedding.aboutImages;

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
          <div className="mx-auto max-w-lg lg:mx-0">
            <p className="mb-8 text-[11px] tracking-[0.3em] uppercase text-muted">
              {wedding.about.eyebrow}
            </p>

            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-x-3 -inset-y-2 rotate-[-1.5deg] bg-sand/60 shadow-sm"
              />
              <article className="letter-paper relative rotate-[0.8deg] px-8 py-10 shadow-[0_18px_50px_-28px_rgba(58,42,32,0.45)] md:px-11 md:py-12">
                <div className="space-y-4 font-serif text-[1.2rem] leading-relaxed text-ink/90 md:text-[1.3rem]">
                  {wedding.about.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
                <p className="mt-8 text-right font-script text-4xl text-ink md:text-5xl">
                  {wedding.about.signature}
                </p>
              </article>
            </div>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.15} className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-md">
            <div className="photo-frame rotate-1">
              <div className="relative aspect-[3/4] overflow-hidden">
                {photos.map((photo, photoIndex) => (
                  <div
                    key={photo.src}
                    className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
                      photoIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden={photoIndex !== index}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 90vw, 420px"
                      className="object-cover"
                      priority={photoIndex === 0}
                    />
                  </div>
                ))}
              </div>
              <div className="relative mt-3 h-10">
                {photos.map((photo, photoIndex) => (
                  <p
                    key={photo.src}
                    className={`absolute inset-x-0 text-center font-script text-2xl text-accent transition-opacity duration-[1600ms] ease-out ${
                      photoIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden={photoIndex !== index}
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
