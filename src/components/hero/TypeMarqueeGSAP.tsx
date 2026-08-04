"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const LINE_A = "青蛙誰在怕　嗷嗚計畫　";
const LINE_B = "嗷嗚計畫　青蛙誰在怕　";
const ROWS = 10;

/**
 * GSAP marquee type wall — HTML text only, independent row speeds.
 */
export function TypeMarqueeGSAP() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const tracks = root.querySelectorAll<HTMLElement>("[data-marquee-track]");
    const tweens: gsap.core.Tween[] = [];

    tracks.forEach((track, i) => {
      const reverse = i % 2 === 1;
      const duration = 18 + (i % 5) * 3.2;
      // Duplicate content width ≈ 50% of track (two identical spans)
      gsap.set(track, { xPercent: reverse ? -50 : 0 });
      const tween = gsap.to(track, {
        xPercent: reverse ? 0 : -50,
        duration,
        ease: "none",
        repeat: -1,
      });
      tweens.push(tween);
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-[-12%] z-[1] flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div className="flex w-[155%] rotate-[-8deg] flex-col gap-[0.08em]">
        {Array.from({ length: ROWS }).map((_, i) => {
          const reverse = i % 2 === 1;
          const text = (reverse ? LINE_B : LINE_A).repeat(6);
          return (
            <div
              key={i}
              className="overflow-hidden whitespace-nowrap leading-[0.84]"
            >
              <div
                data-marquee-track
                className="inline-block font-black tracking-tight text-[#f5e14a]"
                style={{
                  fontSize: "clamp(2.8rem, 12vw, 8.75rem)",
                  textShadow: "0 2px 0 rgba(0,0,0,0.25)",
                  willChange: "transform",
                }}
              >
                <span>{text}</span>
                <span aria-hidden="true">{text}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
