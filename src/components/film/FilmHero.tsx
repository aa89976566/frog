"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BrandSticker } from "@/components/hero/BrandSticker";
import { BrushMask } from "@/components/story/BrushMask";
import { HERO_MASTER } from "@/lib/story";

const TYPE_A = ["青蛙誰在怕", "FROG WHO'S AFRAID", "嗷嗚計畫", "匠寵"];
const TYPE_B = ["嗷嗚計畫", "青蛙誰在怕", "FURMOSA", "RIBBIT"];

/**
 * Lil Frogeth grammar: giant repeating type wall + central master character
 * + capsule nav (SiteNav) + right brand sticker + hand-drawn brush edge.
 */
export function FilmHero() {
  const typeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = typeRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tracks = root.querySelectorAll<HTMLElement>("[data-type-track]");
    const tweens: gsap.core.Tween[] = [];

    tracks.forEach((track, i) => {
      const reverse = i % 2 === 1;
      gsap.set(track, { xPercent: reverse ? -40 : 0 });
      tweens.push(
        gsap.to(track, {
          xPercent: reverse ? 0 : -40,
          duration: 18 + i * 2.4,
          ease: "none",
          repeat: -1,
        }),
      );
    });

    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <div className="candy-hero" data-film-hero aria-label="嗷嗚計畫開場">
      <h1 className="sr-only">嗷嗚計畫｜匠寵｜青蛙誰在怕</h1>

      {/* Master as CSS background — avoids sibling compositing paint drops */}
      <div
        className="candy-hero__master"
        data-hero-frog
        style={{ backgroundImage: `url(${HERO_MASTER})` }}
        role="img"
        aria-label="穿西裝的匠寵青蛙與小狗站在蘑菇派對中央"
      />

      <div className="candy-hero__clouds" data-hero-clouds aria-hidden="true">
        <span className="candy-hero__cloud candy-hero__cloud--a" />
        <span className="candy-hero__cloud candy-hero__cloud--b" />
        <span className="candy-hero__cloud candy-hero__cloud--c" />
        <span className="candy-hero__cloud candy-hero__cloud--d" />
      </div>

      <div className="candy-hero__halftone" aria-hidden="true" />

      <div
        className="candy-hero__typewall"
        data-hero-type
        ref={typeRef}
        aria-hidden="true"
      >
        {Array.from({ length: 6 }).map((_, row) => {
          const words = row % 2 === 0 ? TYPE_A : TYPE_B;
          const line = Array.from({ length: 8 }, () => words)
            .flat()
            .join("　");
          return (
            <div
              key={row}
              className={`candy-hero__type-row candy-hero__type-row--${row % 2 === 0 ? "a" : "b"}`}
            >
              <div data-type-track className="candy-hero__type-track">
                <span>{line}</span>
                <span aria-hidden="true">{line}</span>
              </div>
            </div>
          );
        })}
      </div>

      <BrandSticker />

      <div className="candy-hero__grain" aria-hidden="true" />

      <BrushMask edge="bottom" className="candy-hero__brush" />
    </div>
  );
}
