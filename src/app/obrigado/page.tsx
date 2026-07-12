import Link from "next/link";
import { getGiftById } from "@/data/gifts";
import { wedding } from "@/data/wedding";

export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<{ gift?: string }>;
}) {
  const params = await searchParams;
  const gift = params.gift ? getGiftById(params.gift) : undefined;

  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-cream px-6 py-24">
      <div className="max-w-lg text-center">
        <p className="mb-4 text-[11px] tracking-[0.35em] uppercase text-muted">
          Obrigado
        </p>
        <h1 className="font-serif text-4xl text-ink md:text-5xl">
          Seu carinho chegou até nós
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
          {gift
            ? `Recebemos com alegria a intenção do presente “${gift.name}”. Muito obrigado por fazer parte desse momento.`
            : "Recebemos com alegria o seu presente. Muito obrigado por fazer parte desse momento."}
        </p>
        <p className="mt-8 font-script text-3xl text-accent-soft">
          {wedding.names}
        </p>
        <Link
          href="/"
          className="mt-10 inline-block bg-accent px-6 py-3 text-[11px] tracking-[0.22em] uppercase text-paper transition hover:bg-ink"
        >
          Voltar ao site
        </Link>
      </div>
    </main>
  );
}
