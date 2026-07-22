"use client";

import Image from "next/image";
import { useState } from "react";
import type { Gift } from "@/data/gifts";
import { GiftPaymentSheet } from "@/components/gift-payment-sheet";
import { formatBRL, cn } from "@/lib/utils";

export function GiftCard({
  gift,
  compact = false,
}: {
  gift: Gift;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article
        className={cn(
          "group flex shrink-0 snap-center flex-col overflow-hidden bg-paper",
          compact
            ? "w-[70vw] max-w-[260px] md:w-[280px] md:max-w-[280px]"
            : "w-full",
        )}
      >
        <div className="relative aspect-[5/4] overflow-hidden">
          <Image
            src={gift.image}
            alt={gift.name}
            fill
            sizes="(max-width: 768px) 70vw, 280px"
            className={cn(
              "object-cover transition duration-700 group-hover:scale-[1.03]",
              gift.presented && "grayscale-[35%] opacity-80",
            )}
          />
          {gift.presented && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink/35">
              <span className="rounded-full bg-paper px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase text-ink">
                Já presenteado
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col px-3.5 py-4 md:px-4 md:py-5">
          <h3 className="font-serif text-lg leading-snug text-ink md:text-xl">
            {gift.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-muted md:text-[13px]">
            {gift.description}
          </p>
          <p className="mt-3 font-serif text-lg text-accent">
            {formatBRL(gift.priceInCents)}
          </p>

          <button
            type="button"
            disabled={gift.presented}
            onClick={() => setOpen(true)}
            className="mt-3 w-full bg-accent px-4 py-2.5 text-[10px] tracking-[0.22em] uppercase text-paper transition hover:bg-ink active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-sand disabled:text-muted touch-manipulation md:py-3 md:text-[11px]"
          >
            {gift.presented ? "Já presenteado" : "Presentear"}
          </button>
        </div>
      </article>

      <GiftPaymentSheet
        gift={gift}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
