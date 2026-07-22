"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";
import { SiteNav } from "@/components/site-nav";
import { BlurFade } from "@/components/ui/blur-fade";

export function Hero() {
  const [slide, setSlide] = useState(0);
  const total = wedding.heroImages.length;

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((current) => (current + 1) % total);
    }, 7000);
    return () => window.clearInterval(id);
  }, [total]);

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] overflow-hidden bg-sand"
    >
      {wedding.heroImages.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
            index === slide ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== slide}
        >
          <Image
            src={image.src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover hero-ken-burns"
            style={{ objectPosition: image.objectPosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f7f3ec]/70 via-[#f7f3ec]/35 to-[#f7f3ec]/80" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center px-6 pb-16 pt-10 text-center">
        <BlurFade delay={0.05} className="relative z-50 mb-8">
          <p className="font-script text-4xl text-accent-soft md:text-5xl">
            {wedding.names}
          </p>
        </BlurFade>

        <BlurFade delay={0.15} className="relative z-50">
          <SiteNav />
        </BlurFade>

        <div className="relative z-0 mt-auto mb-auto flex flex-col items-center gap-6 py-16">
          <BlurFade delay={0.25}>
            <h1 className="max-w-3xl font-serif text-2xl leading-snug text-ink sm:text-3xl md:text-4xl md:leading-snug">
              {wedding.tagline}
            </h1>
          </BlurFade>
          <BlurFade delay={0.35}>
            <p className="font-serif text-lg tracking-[0.2em] text-ink/80 md:text-xl">
              {wedding.dateLabel}
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.45} className="mt-auto">
          <div className="flex items-center gap-4 font-serif text-sm tracking-[0.18em] text-ink/70">
            <button
              type="button"
              aria-label="Foto anterior"
              className="transition hover:text-accent"
              onClick={() => setSlide((s) => (s - 1 + total) % total)}
            >
              ←
            </button>
            <span>
              {slide + 1}/{total}
            </span>
            <button
              type="button"
              aria-label="Próxima foto"
              className="transition hover:text-accent"
              onClick={() => setSlide((s) => (s + 1) % total)}
            >
              →
            </button>
          </div>
        </BlurFade>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
