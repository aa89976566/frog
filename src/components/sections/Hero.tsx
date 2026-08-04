import Image from "next/image";

/** Hero = the Drive campaign JPEG only. No overlays, type walls, or extra UI. */
export function Hero() {
  return (
    <section
      id="top"
      className="relative h-[100svh] w-full overflow-hidden bg-black"
      aria-label="嗨嗨計畫主視覺"
    >
      <h1 className="sr-only">嗨嗨計畫｜匠寵｜青蛙誰在怕</h1>
      <Image
        src="/assets/hero/hero-main.jpg"
        alt="嗨嗨計畫｜匠寵｜青蛙誰在怕"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </section>
  );
}
