import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { FiveActStory } from "@/components/story/FiveActStory";
import { Close } from "@/components/sections/Close";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <FiveActStory />
        <Close />
      </main>
      <SiteFooter />
    </>
  );
}
