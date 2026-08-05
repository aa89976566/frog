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
 * Hero — bright candy underground-comic installation
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
      tween.to(frog, { scale: 1.28, yPercent: 10, ease: "none" }, 0);
    }
    if (type) {
      tween.to(type, { opacity: 0.25, scale: 1.06, ease: "none" }, 0);
    }
    if (veil) {
      tween.to(veil, { opacity: 1, ease: "none" }, 0.4);
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
      className="hero-scene relative h-[100svh] w-full overflow-hidden"
      aria-label="嗷嗚計畫主視覺"
    >
      <h1 className="sr-only">嗷嗚計畫｜匠寵｜青蛙誰在怕</h1>
      <AtmosphereBackground />
      <div className="hero-type-layer absolute inset-0 z-[1]">
        <TypeMarqueeGSAP />
      </div>
      <FrogLayer />
      <BrandSticker />
      <div className="hero-drybrush pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[14%]" aria-hidden="true" />
      {/* Soft candy handoff — no black fog */}
      <div
        className="hero-exit-veil pointer-events-none absolute inset-0 z-30 opacity-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 55%, rgba(255,210,240,0.15) 0%, rgba(232,200,255,0.55) 100%)",
        }}
      />
      <a
        href="#story"
        className="absolute bottom-5 left-1/2 z-40 -translate-x-1/2 text-[10px] font-bold tracking-[0.35em] text-[#f3f597] transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3f597]"
      >
        往下看故事
      </a>
    </section>
  );
}
