"use client";

import { useRef } from "react";
import { gifts } from "@/data/gifts";
import { GiftCard } from "@/components/gift-card";
import { BlurFade } from "@/components/ui/blur-fade";

export function GiftsGrid() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    cancelAnimationFrame(frameRef.current);

    const amount = Math.min(el.clientWidth * 0.85, 320);
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const target = Math.min(max, Math.max(0, el.scrollLeft + direction * amount));
    const start = el.scrollLeft;
    const pageY = window.scrollY;

    if (
      Math.abs(target - start) < 1 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.scrollLeft = target;
      return;
    }

    // Animate scrollLeft directly. scrollBy({ behavior: "smooth" }) on this
    // snap scroller also resets the document scroll position in WebKit.
    const duration = 380;
    const t0 = performance.now();
    const frame = (now: number) => {
      const progress = Math.min(1, (now - t0) / duration);
      const ease = 1 - (1 - progress) ** 3;
      el.scrollLeft = start + (target - start) * ease;
      if (Math.abs(window.scrollY - pageY) > 1) window.scrollTo(0, pageY);
      if (progress < 1) frameRef.current = requestAnimationFrame(frame);
    };
    frameRef.current = requestAnimationFrame(frame);
  }

  return (
    <section id="presentes" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <BlurFade inView className="mx-auto max-w-2xl px-6 text-center">
          <p className="mb-3 text-[11px] tracking-[0.35em] uppercase text-muted">
            Lista de presentes
          </p>
          <h2 className="font-serif text-4xl text-ink md:text-5xl">
            Presenteie com carinho
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
            Vales, experiências na lua de mel em Santiago e itens para o lar.
            Pague via PIX ou, quando disponível, com cartão na loja do produto.
          </p>
        </BlurFade>

        <div className="relative mt-10 md:mt-14">
          <button
            type="button"
            aria-label="Presentes anteriores"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => scrollByCard(-1)}
            className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-line bg-paper/95 text-xl text-accent backdrop-blur transition hover:bg-sand md:flex lg:left-0 lg:-translate-x-1/2"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Próximos presentes"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => scrollByCard(1)}
            className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-line bg-paper/95 text-xl text-accent backdrop-blur transition hover:bg-sand md:flex lg:right-0 lg:translate-x-1/2"
          >
            ›
          </button>

          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-6 pb-2 md:gap-4 md:px-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {gifts.map((gift) => (
              <GiftCard key={gift.id} gift={gift} compact />
            ))}
          </div>
        </div>

        <p className="mt-4 px-6 text-center text-[11px] tracking-[0.16em] uppercase text-muted md:hidden">
          Deslize para o lado →
        </p>
      </div>
    </section>
  );
}
