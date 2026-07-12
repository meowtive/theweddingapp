import { About } from "@/components/about";
import { Countdown } from "@/components/countdown";
import { Footer } from "@/components/footer";
import { GiftsGrid } from "@/components/gifts-grid";
import { Hero } from "@/components/hero";
import { hasAbacateKey } from "@/lib/abacate";

export default function Home() {
  const paymentsEnabled = hasAbacateKey();

  return (
    <main>
      <Hero />
      <Countdown />
      <About />
      <GiftsGrid paymentsEnabled={paymentsEnabled} />
      <Footer />
    </main>
  );
}
