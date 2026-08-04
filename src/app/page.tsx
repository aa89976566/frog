import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { WhoIsAfraid } from "@/components/sections/WhoIsAfraid";
import { TheTest } from "@/components/sections/TheTest";
import { Exhibit } from "@/components/sections/Exhibit";
import { Campaign } from "@/components/sections/Campaign";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <WhoIsAfraid />
        <TheTest />
        <Exhibit />
        <Campaign />
      </main>
      <SiteFooter />
    </>
  );
}
