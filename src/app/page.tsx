import { About } from "@/components/about";
import { Countdown } from "@/components/countdown";
import { Footer } from "@/components/footer";
import { GiftsGrid } from "@/components/gifts-grid";
import { Hero } from "@/components/hero";
import { MusicPlayer } from "@/components/music-player";

export default function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
      <About />
      <GiftsGrid />
      <Footer />
      <MusicPlayer />
    </main>
  );
}
