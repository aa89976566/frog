"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const LINE_A = "青蛙誰在怕　嗷嗚計畫　";
const LINE_B = "嗷嗚計畫　青蛙誰在怕　";
/** Four oversized rows — lilfrogeth EXPERIENCE density */
const ROWS = 4;

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
      const duration = 16 + i * 4.5;
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
      className="pointer-events-none absolute inset-[-8%] z-[1] flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div className="flex w-[160%] rotate-[-7deg] flex-col gap-[0.02em]">
        {Array.from({ length: ROWS }).map((_, i) => {
          const reverse = i % 2 === 1;
          const text = (reverse ? LINE_B : LINE_A).repeat(8);
          return (
            <div
              key={i}
              className="overflow-hidden whitespace-nowrap leading-[0.86]"
              style={{ opacity: 0.55 + (i % 3) * 0.12 }}
            >
              <div
                data-marquee-track
                className="inline-block font-black tracking-tight text-[#f5e14a]"
                style={{
                  fontSize: "clamp(3.4rem, 14vw, 9.5rem)",
                  textShadow: "0 2px 0 rgba(0,0,0,0.22)",
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
