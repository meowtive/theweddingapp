import Image from "next/image";
import { wedding } from "@/data/wedding";
import { BlurFade } from "@/components/ui/blur-fade";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="local" className="bg-paper">
      <div className="border-b border-line bg-cream px-6 py-16">
        <BlurFade inView className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[11px] tracking-[0.35em] uppercase text-muted">
            Onde vai ser
          </p>
          <h2 className="font-serif text-4xl text-ink md:text-5xl">
            {wedding.venue.name}
          </h2>
          <p className="mt-4 text-sm text-muted md:text-base">
            {wedding.venue.fullAddress}
          </p>
          <a
            href={wedding.venue.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block border border-accent px-6 py-3 text-[11px] tracking-[0.22em] uppercase text-accent transition hover:bg-accent hover:text-paper"
          >
            Abrir no Google Maps
          </a>
        </BlurFade>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">
          {wedding.venueImages.map((src, i) => (
            <BlurFade key={src} inView delay={0.08 * i}>
              <div className="photo-frame">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={src}
                    alt={`Espaço do casamento ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </BlurFade>
          ))}
        </div>

        <BlurFade inView delay={0.1} className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-line shadow-[0_20px_50px_rgba(44,36,31,0.08)]">
          <iframe
            title={`Mapa de ${wedding.venue.name}`}
            src={wedding.venue.mapEmbedUrl}
            className="h-[320px] w-full border-0 md:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </BlurFade>
      </div>

      <div className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <svg
              viewBox="0 0 64 64"
              className="mb-6 h-12 w-12 text-accent-soft"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              aria-hidden
            >
              <path d="M32 52c-8-6-20-16-20-28a12 12 0 0 1 22-6 12 12 0 0 1 22 6c0 12-12 22-20 28Z" />
            </svg>
            <h3 className="max-w-md font-serif text-3xl leading-snug text-ink md:text-4xl">
              Que a gente se encontre para celebrar o amor.
            </h3>
            <p className="mt-4 font-script text-3xl text-accent-soft">
              {wedding.names}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="mb-4 text-[11px] tracking-[0.28em] uppercase text-ink">
                Navegação
              </p>
              <ul className="space-y-3 text-muted">
                {wedding.nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="hover:text-accent">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[11px] tracking-[0.28em] uppercase text-ink">
                Local
              </p>
              <ul className="space-y-3 text-muted">
                <li>{wedding.venue.name}</li>
                <li>{wedding.venue.street}</li>
                <li>
                  {wedding.venue.neighborhood}, {wedding.venue.city}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {year} {wedding.names}. Todos os direitos reservados.
          </p>
          <p>13 de dezembro de 2026</p>
        </div>
      </div>
    </footer>
  );
}
