"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const LINE_A = "青蛙誰在怕　嗷嗚計畫　";
const LINE_B = "嗷嗚計畫　青蛙誰在怕　匠寵　";
const ROWS = 5;

const ROW_COLORS = ["#B8FF32", "#FF38C7", "#39FF14", "#C77DFF", "#B8FF32"];

/**
 * Oversized cropped type wall — Lil Frogeth density, Furmosa copy.
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
      const duration = 14 + i * 3.8;
      gsap.set(track, { xPercent: reverse ? -50 : 0 });
      tweens.push(
        gsap.to(track, {
          xPercent: reverse ? 0 : -50,
          duration,
          ease: "none",
          repeat: -1,
        }),
      );
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-[-14%] z-[1] flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div className="flex w-[180%] rotate-[-8deg] flex-col gap-[0.01em]">
        {Array.from({ length: ROWS }).map((_, i) => {
          const reverse = i % 2 === 1;
          const text = (reverse ? LINE_B : LINE_A).repeat(10);
          const color = ROW_COLORS[i % ROW_COLORS.length];
          return (
            <div
              key={i}
              className="overflow-hidden whitespace-nowrap leading-[0.82]"
              style={{ opacity: 0.55 + (i % 3) * 0.12 }}
            >
              <div
                data-marquee-track
                className="hero-type-row inline-block font-black tracking-tight"
                style={{
                  color,
                  fontSize: "clamp(3.8rem, 15vw, 10.5rem)",
                  textShadow: `0 0 22px ${color}55, 0 2px 0 rgba(0,0,0,0.45)`,
                  willChange: "transform",
                  mixBlendMode: i % 2 === 0 ? "screen" : "normal",
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
