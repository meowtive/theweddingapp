"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import type { Gift } from "@/data/gifts";
import { formatBRL } from "@/lib/utils";

export function GiftCard({
  gift,
  paymentsEnabled,
}: {
  gift: Gift;
  paymentsEnabled: boolean;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handlePresentear() {
    if (gift.presented || !paymentsEnabled) return;
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ giftId: gift.id }),
        });
        const data = (await res.json()) as { url?: string; error?: string };
        if (!res.ok || !data.url) {
          setError(data.error ?? "Não foi possível iniciar o pagamento.");
          return;
        }
        window.location.href = data.url;
      } catch {
        setError("Algo deu errado. Tente novamente.");
      }
    });
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden bg-paper">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={gift.image}
          alt={gift.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition duration-700 group-hover:scale-[1.03] ${
            gift.presented ? "grayscale-[35%] opacity-80" : ""
          }`}
        />
        {gift.presented && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/35">
            <span className="rounded-full bg-paper px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-ink">
              Já presenteado
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 py-6">
        <h3 className="font-serif text-2xl leading-snug text-ink">{gift.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {gift.description}
        </p>
        <p className="mt-5 font-serif text-xl text-accent">
          {formatBRL(gift.priceInCents)}
        </p>

        <button
          type="button"
          disabled={gift.presented || !paymentsEnabled || pending}
          onClick={handlePresentear}
          className="mt-5 w-full bg-accent px-5 py-3 text-[11px] tracking-[0.24em] uppercase text-paper transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-sand disabled:text-muted"
        >
          {gift.presented
            ? "Já presenteado"
            : !paymentsEnabled
              ? "Pagamento em breve"
              : pending
                ? "Abrindo..."
                : "Presentear"}
        </button>

        {error && <p className="mt-3 text-xs text-red-700">{error}</p>}
      </div>
    </article>
  );
}
