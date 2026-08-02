import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Whispers } from "@/components/sections/Whispers";
import { DogGaze } from "@/components/sections/DogGaze";
import { GrassHunt } from "@/components/sections/GrassHunt";
import { Mission } from "@/components/sections/Mission";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Whispers />
        <DogGaze />
        <GrassHunt />
        <Mission />
      </main>
      <SiteFooter />
    </>
  );
}
