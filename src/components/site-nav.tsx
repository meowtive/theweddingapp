"use client";

import { useState } from "react";
import { wedding } from "@/data/wedding";
import { cn } from "@/lib/utils";

export function SiteNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={cn("relative z-20", className)}>
      <button
        type="button"
        className="md:hidden rounded-full border border-white/40 bg-white/70 px-4 py-2 text-xs tracking-[0.2em] uppercase text-ink backdrop-blur"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Abrir menu"
      >
        Menu
      </button>

      <ul
        className={cn(
          "items-center gap-5 text-[11px] tracking-[0.28em] uppercase text-ink/80",
          open
            ? "absolute left-1/2 top-12 flex w-[min(90vw,20rem)] -translate-x-1/2 flex-col gap-4 rounded-2xl bg-paper/95 p-6 shadow-lg backdrop-blur md:static md:w-auto md:translate-x-0 md:flex-row md:bg-transparent md:p-0 md:shadow-none"
            : "hidden md:flex",
        )}
      >
        {wedding.nav.map((item, index) => (
          <li key={item.href} className="flex items-center gap-5">
            {index > 0 && (
              <span
                className="hidden h-px w-6 bg-ink/25 md:block"
                aria-hidden
              />
            )}
            <a
              href={item.href}
              className="transition-colors hover:text-accent"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
