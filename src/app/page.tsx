import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollFilm } from "@/components/film/ScrollFilm";
import { Close } from "@/components/sections/Close";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <ScrollFilm />
        <Close />
      </main>
      <SiteFooter />
    </>
  );
}
