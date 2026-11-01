"use client";

import { useEffect, useRef } from "react";
import { gifts } from "@/data/gifts";
import { GiftCard } from "@/components/gift-card";
import { BlurFade } from "@/components/ui/blur-fade";

export function GiftsGrid() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let pageY = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let horizontal: boolean | null = null;
    let pinning = false;
    let touching = false;
    let momentum = 0;
    let releasePin = 0;
    let restoreFrame = 0;

    const holdPage = (y: number) => {
      if (Math.abs(window.scrollY - y) <= 1) return;
      const root = document.documentElement;
      const previous = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, y);
      root.style.scrollBehavior = previous;
    };

    const keepPage = () => {
      const y = pageY;
      holdPage(y);
      cancelAnimationFrame(restoreFrame);
      restoreFrame = requestAnimationFrame(() => {
        holdPage(y);
        restoreFrame = requestAnimationFrame(() => holdPage(y));
      });
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      cancelAnimationFrame(frameRef.current);
      cancelAnimationFrame(momentum);
      window.clearTimeout(releasePin);
      const touch = event.touches[0];
      startX = lastX = touch.clientX;
      startY = touch.clientY;
      startLeft = el.scrollLeft;
      pageY = window.scrollY;
      lastTime = performance.now();
      velocity = 0;
      horizontal = null;
      pinning = false;
      touching = true;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      const touch = event.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (horizontal === null) {
        if (Math.hypot(dx, dy) < 8) return;
        horizontal = Math.abs(dx) > Math.abs(dy);
        if (!horizontal) return;
        pinning = true;
        pageY = window.scrollY;
        startLeft = el.scrollLeft;
      }
      if (!horizontal) return;
      if (event.cancelable) event.preventDefault();
      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) {
        const nextVelocity = (touch.clientX - lastX) / dt;
        velocity = Math.max(-2.2, Math.min(2.2, nextVelocity));
      }
      lastX = touch.clientX;
      lastTime = now;
      el.scrollLeft = startLeft - dx;
      keepPage();
    };

    const release = () => {
      releasePin = window.setTimeout(() => {
        pinning = false;
        touching = false;
      }, 500);
    };

    const onTouchEnd = () => {
      if (!horizontal) {
        release();
        return;
      }
      let speed = -velocity * 18;
      const tick = () => {
        speed *= 0.92;
        if (Math.abs(speed) < 0.5) {
          release();
          return;
        }
        el.scrollLeft += speed;
        keepPage();
        momentum = requestAnimationFrame(tick);
      };
      momentum = requestAnimationFrame(tick);
    };

    const onWindowScroll = () => {
      if (pinning || (touching && pageY > 240 && window.scrollY < 40)) {
        keepPage();
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    window.addEventListener("scroll", onWindowScroll, { passive: true });

    return () => {
      cancelAnimationFrame(momentum);
      cancelAnimationFrame(restoreFrame);
      window.clearTimeout(releasePin);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, []);

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

          <div className="overflow-hidden">
            <div
              ref={scrollerRef}
              className="flex touch-pan-y gap-3 overflow-x-auto overflow-y-hidden overscroll-x-none px-6 pb-2 [overflow-anchor:none] md:snap-x md:snap-mandatory md:touch-auto md:gap-4 md:overscroll-x-contain md:px-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {gifts.map((gift) => (
                <GiftCard key={gift.id} gift={gift} compact />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 px-6 text-center text-[11px] tracking-[0.16em] uppercase text-muted md:hidden">
          Deslize para o lado →
        </p>
      </div>
    </section>
  );
}
