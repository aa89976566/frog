"use client";

import { useEffect, useRef } from "react";

/**
 * Drive-cropped transparent frog — readable, independent layer.
 * Subtle float + fine-pointer parallax only (no glitch / distortion).
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
      tx = x * 12;
      ty = y * 8;
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
    <div className="absolute inset-0 z-10 flex items-center justify-center px-2 pt-12 md:pt-8">
      <div
        ref={stageRef}
        className="hero-frog-stage relative flex h-[min(92svh,900px)] w-full max-w-[720px] items-end justify-center md:max-w-[780px]"
      >
        <div className="hero-frog-glow" aria-hidden="true" />
        <div className="hero-frog-shadow" aria-hidden="true" />
        <div className="hero-frog-float relative z-[1]">
          <img
            ref={imgRef}
            src="/assets/hero/hero-frog.png"
            alt="嗷嗚計畫青蛙角色"
            width={719}
            height={972}
            fetchPriority="high"
            decoding="async"
            className="hero-frog h-[min(86svh,860px)] w-auto max-w-[min(96vw,640px)] object-contain object-bottom md:max-w-[min(72vw,700px)]"
          />
        </div>
      </div>
    </div>
  );
}
