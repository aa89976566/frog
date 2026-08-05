"use client";

import { useEffect, useRef } from "react";

/**
 * Drive-cropped transparent frog — oversized beyond viewport like reference hero.
 * Subtle float + fine-pointer parallax only.
 */
export function FrogLayer() {
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const img = imgRef.current;
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
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      tx = x * 14;
      ty = y * 9;
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      img.style.transform = "";
    };
  }, []);

  return (
    <div className="absolute inset-0 z-10 flex items-end justify-center overflow-hidden px-0 pt-10">
      <div
        ref={stageRef}
        className="hero-frog-stage relative flex h-[115%] w-full max-w-none items-end justify-center"
      >
        <div className="hero-frog-glow" aria-hidden="true" />
        <div className="hero-frog-shadow" aria-hidden="true" />
        <div className="hero-frog-float relative z-[1]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src="/assets/hero/hero-frog.png"
            alt="嗷嗚計畫青蛙角色"
            width={719}
            height={972}
            fetchPriority="high"
            decoding="async"
            className="hero-frog h-[min(118svh,1100px)] w-auto max-w-none object-contain object-bottom"
          />
        </div>
      </div>
    </div>
  );
}
