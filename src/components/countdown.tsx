"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";
import { BlurFade } from "@/components/ui/blur-fade";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getRemaining(target: number): Remaining {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const labels: Record<keyof Remaining, string> = {
  days: "Dias",
  hours: "Horas",
  minutes: "Minutos",
  seconds: "Segundos",
};

export function Countdown() {
  const target = new Date(wedding.dateISO).getTime();
  const [remaining, setRemaining] = useState<Remaining>(() =>
    getRemaining(target),
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining(getRemaining(target));
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <section
      id="contador"
      className="relative bg-cream px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-4xl text-center">
        <BlurFade inView>
          <p className="mb-3 text-[11px] tracking-[0.35em] uppercase text-muted">
            Contagem regressiva
          </p>
          <h2 className="font-serif text-4xl text-ink md:text-5xl">
            Falta pouco para o grande dia
          </h2>
        </BlurFade>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
          {(Object.keys(labels) as Array<keyof Remaining>).map((key, i) => (
            <BlurFade key={key} inView delay={0.08 * i}>
              <div className="rounded-[1.5rem] bg-paper px-4 py-8 shadow-[0_12px_40px_rgba(44,36,31,0.05)]">
                <p className="font-serif text-4xl tabular-nums text-accent md:text-5xl">
                  {String(remaining[key]).padStart(2, "0")}
                </p>
                <p className="mt-3 text-[11px] tracking-[0.25em] uppercase text-muted">
                  {labels[key]}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
