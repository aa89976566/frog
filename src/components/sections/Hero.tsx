import { AtmosphereBackground } from "@/components/hero/AtmosphereBackground";
import { TypeMarqueeGSAP } from "@/components/hero/TypeMarqueeGSAP";
import { FrogLayer } from "@/components/hero/FrogLayer";
import { BrandSticker } from "@/components/hero/BrandSticker";

/**
 * Hero — digital installation / movie poster compositing
 *
 * L01 Atmosphere (procedural)
 * L02 HTML GSAP typography
 * L03 Transparent frog (Drive crop only)
 * L04 Brand sticker
 * (+ Nav / Noise mounted outside)
 */
export function Hero() {
  return (
    <section
      id="top"
      className="hero-scene relative h-[100svh] w-full overflow-hidden bg-[#12061c]"
      aria-label="嗷嗚計畫主視覺"
    >
      <h1 className="sr-only">嗷嗚計畫｜匠寵｜青蛙誰在怕</h1>
      <AtmosphereBackground />
      <TypeMarqueeGSAP />
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 48% 58% at 50% 52%, transparent 0%, rgba(10,4,20,0.28) 100%)",
        }}
      />
      <FrogLayer />
      <BrandSticker />
    </section>
  );
}
