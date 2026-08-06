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
 * Lil Frogeth layout language:
 * full-bleed psychedelic field · oversized cropped type · central character ·
 * capsule nav (SiteNav) · bottom caption strip — Furmosa brand & frog kept.
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
    const bloom = scene.querySelector<HTMLElement>(".hero-scroll-bloom");
    const veil = scene.querySelector<HTMLElement>(".hero-exit-veil");

    const tween = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: "top top",
        end: "bottom top",
        scrub: 0.45,
      },
    });

    if (frog) tween.to(frog, { scale: 1.28, yPercent: 12, ease: "none" }, 0);
    if (type) tween.to(type, { opacity: 0.18, scale: 1.08, yPercent: -6, ease: "none" }, 0);
    if (bloom) tween.to(bloom, { opacity: 0.85, scale: 1.15, ease: "none" }, 0);
    if (veil) tween.to(veil, { opacity: 1, ease: "none" }, 0.35);

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
      <div
        className="hero-scroll-bloom pointer-events-none absolute inset-0 z-[15] opacity-0"
        aria-hidden="true"
      />
      <div className="hero-drybrush pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[12%]" aria-hidden="true" />
      <div
        className="hero-exit-veil pointer-events-none absolute inset-0 z-30 opacity-0"
        aria-hidden="true"
      />
      <div className="hero-caption-bar absolute inset-x-0 bottom-0 z-40 px-4 py-2.5 text-center">
        <a
          href="#story"
          className="text-[11px] font-black tracking-[0.32em] text-[#050706] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8FF32]"
        >
          往下看故事｜青蛙誰在怕
        </a>
      </div>
    </section>
  );
}
