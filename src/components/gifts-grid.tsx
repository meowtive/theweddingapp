import { gifts } from "@/data/gifts";
import { GiftCard } from "@/components/gift-card";
import { BlurFade } from "@/components/ui/blur-fade";

export function GiftsGrid({ paymentsEnabled }: { paymentsEnabled: boolean }) {
  return (
    <section id="presentes" className="bg-cream px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <BlurFade inView className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-[11px] tracking-[0.35em] uppercase text-muted">
            Lista de presentes
          </p>
          <h2 className="font-serif text-4xl text-ink md:text-5xl">
            Presenteie com carinho
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
            Escolha um presente e finalize com pagamento seguro. Quando alguém
            presentear, o item fica marcado como presenteado para evitar
            duplicidade.
          </p>
        </BlurFade>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gifts.map((gift, index) => (
            <BlurFade key={gift.id} inView delay={Math.min(index * 0.04, 0.4)}>
              <GiftCard gift={gift} paymentsEnabled={paymentsEnabled} />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
