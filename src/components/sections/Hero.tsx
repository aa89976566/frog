"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AtmosphereBackground } from "@/components/hero/AtmosphereBackground";
import { TypeMarqueeGSAP } from "@/components/hero/TypeMarqueeGSAP";
import { FrogLayer } from "@/components/hero/FrogLayer";
import { BrandSticker } from "@/components/hero/BrandSticker";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero — digital installation / movie poster
 * Seamless zoom/crop handoff into Story act 01.
 */
export function Hero() {
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const frog = scene.querySelector<HTMLElement>(".hero-frog-float");
    const type = scene.querySelector<HTMLElement>(".hero-type-layer");
    const veil = scene.querySelector<HTMLElement>(".hero-exit-veil");

    const tween = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    if (frog) {
      tween.to(frog, { scale: 1.35, yPercent: 12, ease: "none" }, 0);
    }
    if (type) {
      tween.to(type, { opacity: 0.15, scale: 1.08, ease: "none" }, 0);
    }
    if (veil) {
      tween.to(veil, { opacity: 1, ease: "none" }, 0.35);
    }

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      id="top"
      className="hero-scene relative h-[100svh] w-full overflow-hidden bg-[#12061c]"
      aria-label="嗷嗚計畫主視覺"
    >
      <h1 className="sr-only">嗷嗚計畫｜匠寵｜青蛙誰在怕</h1>
      <AtmosphereBackground />
      <div className="hero-type-layer absolute inset-0 z-[1]">
        <TypeMarqueeGSAP />
      </div>
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
      {/* Black dry-brush bottom mask */}
      <div className="hero-drybrush pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[18%]" aria-hidden="true" />
      {/* Exit veil for seamless zoom into story */}
      <div
        className="hero-exit-veil pointer-events-none absolute inset-0 z-30 opacity-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 60%, rgba(42,15,69,0.15) 0%, rgba(18,6,28,0.85) 100%)",
        }}
      />
      <a
        href="#story"
        className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 text-[10px] tracking-[0.35em] text-[#f5e14a]/70 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5e14a]"
      >
        往下看故事
      </a>
    </section>
  );
}
