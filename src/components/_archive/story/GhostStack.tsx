"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export type GhostMode = "scatter" | "breathe" | "chase";

type GhostStackProps = {
  src: string;
  layers?: number;
  mode: GhostMode;
  /** 0–1 progress driven by parent ScrollTrigger timeline via CSS var or imperative API */
  active: boolean;
  className?: string;
};

/**
 * Onion-skin / multiple-exposure ghost frames.
 * 4–6 duplicate layers peel apart on scroll: opacity 0.35→0, blur 0→8px, staggered x/y.
 */
export function GhostStack({
  src,
  layers = 5,
  mode,
  active,
  className = "",
}: GhostStackProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !active) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ghosts = root.querySelectorAll<HTMLElement>("[data-ghost]");
    if (!ghosts.length) return;

    if (reduced) {
      ghosts.forEach((el, i) => {
        gsap.set(el, { opacity: i === 0 ? 1 : 0, x: 0, y: 0, filter: "blur(0px)" });
      });
      return;
    }

    // Base pose: stacked
    ghosts.forEach((el, i) => {
      gsap.set(el, {
        opacity: i === 0 ? 1 : 0.28,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        force3D: true,
      });
    });

    const offsets = Array.from({ length: layers }, (_, i) => {
      const t = i / Math.max(1, layers - 1);
      if (mode === "scatter") {
        const dir = i % 2 === 0 ? -1 : 1;
        return { x: dir * (28 + t * 90), y: (i % 3) * 8 - 8, blur: t * 8, op: 0.35 * (1 - t) };
      }
      if (mode === "breathe") {
        return { x: (i - layers / 2) * 6, y: -t * 14, blur: t * 4, op: 0.28 * (1 - t * 0.7) };
      }
      // chase
      return { x: -20 - t * 110, y: (i % 2) * 10 - 4, blur: t * 8, op: 0.35 * (1 - t) };
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.closest("[data-shake-stage]") ?? root,
        start: "top top",
        end: "bottom top",
        scrub: 0.7,
      },
    });

    ghosts.forEach((el, i) => {
      if (i === 0) {
        // Primary stays readable; slight drift only
        tl.to(
          el,
          {
            x: mode === "chase" ? -18 : mode === "scatter" ? 4 : 0,
            y: mode === "breathe" ? -6 : 0,
            duration: 1,
            ease: "none",
          },
          0,
        );
        return;
      }
      const o = offsets[i];
      tl.to(
        el,
        {
          x: o.x,
          y: o.y,
          opacity: o.op,
          filter: `blur(${o.blur}px)`,
          duration: 1,
          ease: "none",
        },
        0,
      );
      // Fade ghosts out toward end of segment
      tl.to(el, { opacity: 0, duration: 0.35, ease: "none" }, 0.65);
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [active, layers, mode, src]);

  return (
    <div ref={rootRef} className={`absolute inset-0 ${className}`} aria-hidden={!active}>
      {Array.from({ length: layers }).map((_, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          data-ghost
          src={src}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
          style={{
            zIndex: layers - i,
            mixBlendMode: i === 0 ? "normal" : i % 2 === 0 ? "screen" : "plus-lighter",
            opacity: i === 0 ? 1 : 0.28,
          }}
        />
      ))}
    </div>
  );
}
