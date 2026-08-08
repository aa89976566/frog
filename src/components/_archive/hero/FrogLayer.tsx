"use client";

import { useEffect, useRef } from "react";

/**
 * Drive-cropped transparent frog — oversized beyond viewport.
 * Breath float + pointer parallax + eyelid blink (psychedelic, not spooky).
 */
export function FrogLayer() {
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const lidsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const img = imgRef.current;
    const lids = lidsRef.current;
    if (!stage || !img) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      img.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (lids) {
        lids.style.transform = `translate3d(${cx * 0.92}px, ${cy * 0.92}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      tx = x * 16;
      ty = y * 10;
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      img.style.transform = "";
      if (lids) lids.style.transform = "";
    };
  }, []);

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden px-0 pt-14 md:pt-10">
      <div
        ref={stageRef}
        className="hero-frog-stage relative flex h-full w-full max-w-none items-end justify-center pb-0"
      >
        <div className="hero-frog-glow" aria-hidden="true" />
        <div className="hero-frog-bloom" aria-hidden="true" />
        <div className="hero-frog-shadow" aria-hidden="true" />
        <div className="hero-frog-float relative z-[1] mb-[-8vh] md:mb-[-12vh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src="/assets/hero/hero-frog.png"
            alt="嗷嗚計畫青蛙角色"
            width={642}
            height={1426}
            fetchPriority="high"
            decoding="async"
            className="hero-frog h-[min(108svh,980px)] w-auto max-w-none object-contain object-bottom md:h-[min(112svh,1080px)]"
          />
          {/* Soft eyelid flash — suggests blink without swapping character art */}
          <div
            ref={lidsRef}
            className="hero-frog-lids pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <span className="hero-lid hero-lid-l" />
            <span className="hero-lid hero-lid-r" />
          </div>
        </div>
      </div>
    </div>
  );
}
