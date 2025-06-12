import Hero from "@/components/sections/Hero";
import PlayerProjections from "@/components/sections/PlayerProjections";
// import { SquadsSection } from "@/components/sections/SquadsSection";
// import { Ecosystem } from "@/components/sections/Ecosystem";
// import { Footer } from "@/components/sections/Footer";
import WavyDivider from "@/components/dividers/floating-divider";
import { SportsStatsExample } from "@/components/dividers/sport-stats";

export default function Home() {
  return (
    <main>
      <Hero />
      <WavyDivider />
      <PlayerProjections />
      <SportsStatsExample />
      {/* <SquadsSection />
      <Ecosystem />
      <Footer /> */}
    </main>
  );
}
