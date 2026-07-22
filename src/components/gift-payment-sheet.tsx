"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Gift } from "@/data/gifts";
import { wedding } from "@/data/wedding";
import { formatBRL, cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function GiftPaymentSheet({
  gift,
  open,
  onClose,
}: {
  gift: Gift;
  open: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function copyPix() {
    try {
      await navigator.clipboard.writeText(wedding.pix.key);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-100 flex items-end justify-center sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="Fechar"
            className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.35, ease }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gift-pay-title"
            className="relative z-10 flex max-h-[92svh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-paper shadow-[0_-12px_48px_rgba(44,36,31,0.18)] sm:rounded-3xl sm:shadow-[0_24px_60px_rgba(44,36,31,0.2)]"
            initial={
              reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 0,
                    y: 28,
                    scale: 0.98,
                    filter: "blur(6px)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 16,
                    scale: 0.98,
                    filter: "blur(4px)",
                  }
            }
            transition={{
              duration: reduceMotion ? 0.15 : 0.45,
              ease,
            }}
          >
            <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-sand sm:hidden" />

            <div className="overflow-y-auto px-6 pb-8 pt-5 sm:px-8 sm:pt-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase text-muted">
                    Presentear
                  </p>
                  <h2
                    id="gift-pay-title"
                    className="mt-1.5 font-serif text-2xl leading-snug text-ink"
                  >
                    {gift.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 rounded-full border border-line px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase text-muted transition hover:border-ink/30 hover:text-ink"
                >
                  Fechar
                </button>
              </div>

              <p className="mt-4 font-serif text-3xl text-accent">
                {formatBRL(gift.priceInCents)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Pague este valor via PIX para o telefone abaixo. É rápido e chega
                direto para nós.
              </p>

              <div className="mt-6 rounded-2xl border border-line bg-cream/80 p-4 sm:p-5">
                <p className="text-[10px] tracking-[0.22em] uppercase text-muted">
                  Chave PIX · {wedding.pix.typeLabel}
                </p>
                <p className="mt-2 font-serif text-2xl tracking-wide text-ink tabular-nums">
                  {wedding.pix.displayLabel}
                </p>
                <p className="mt-1 text-xs text-muted">{wedding.pix.key}</p>

                <button
                  type="button"
                  onClick={copyPix}
                  className={cn(
                    "mt-4 w-full px-4 py-3.5 text-[11px] tracking-[0.22em] uppercase transition active:scale-[0.98]",
                    copied
                      ? "bg-ink text-paper"
                      : "bg-accent text-paper hover:bg-ink",
                  )}
                >
                  {copied ? "Chave copiada!" : "Copiar chave PIX"}
                </button>
              </div>

              <ol className="mt-6 space-y-3 text-sm leading-relaxed text-muted">
                <li className="flex gap-3">
                  <span className="font-serif text-accent">1.</span>
                  <span>Abra o app do seu banco e escolha PIX.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-serif text-accent">2.</span>
                  <span>
                    Cole a chave (telefone) e confira o valor{" "}
                    <span className="text-ink">
                      {formatBRL(gift.priceInCents)}
                    </span>
                    .
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-serif text-accent">3.</span>
                  <span>Confirme o pagamento — e obrigado pelo carinho.</span>
                </li>
              </ol>

              {gift.productUrl && (
                <div className="mt-8 border-t border-line pt-6">
                  <p className="text-center font-serif text-lg text-ink">
                    Ou pague com cartão
                  </p>
                  <p className="mt-2 text-center text-sm leading-relaxed text-ink/70">
                    Prefere cartão? Abra o produto na loja e compre por lá.
                  </p>
                  <a
                    href={gift.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center border border-accent bg-sand/50 px-4 py-3.5 text-[11px] tracking-[0.22em] uppercase text-accent transition hover:bg-accent hover:text-paper"
                  >
                    Abrir na loja
                  </a>
                </div>
              )}

              <button
                type="button"
                onClick={onClose}
                className="mt-6 w-full py-3 text-[11px] tracking-[0.2em] uppercase text-muted transition hover:text-ink"
              >
                Já paguei · Fechar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
