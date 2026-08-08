"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BrandSticker } from "@/components/hero/BrandSticker";
import { HERO_MASTER } from "@/lib/story";

const TYPE_LINE = "青蛙誰在怕　";
const TYPE_ROWS = 4;

/**
 * Shared poster-grid hero: typographic frame (3–4 rows) behind a
 * 90vw × 84–88svh visual, sticker locked to the frame corner.
 */
export function FilmHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const type = typeRef.current;
    if (!root || !type) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const frame = root.querySelector<HTMLElement>("[data-hero-frog]");
    const tracks = type.querySelectorAll<HTMLElement>("[data-type-track]");
    const tweens: gsap.core.Tween[] = [];

    if (frame) gsap.set(frame, { scale: 1.035 });
    if (frame) {
      tweens.push(
        gsap.to(frame, {
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        }),
      );
    }

    // Slow 2–3% opposing drift on alternate rows
    tracks.forEach((track, i) => {
      const amp = i % 2 === 0 ? -2.6 : 2.6;
      gsap.set(track, { xPercent: 0 });
      tweens.push(
        gsap.to(track, {
          xPercent: amp,
          duration: 7.5 + i * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }),
      );
    });

    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <div
      ref={rootRef}
      className="candy-hero poster-scene"
      data-film-hero
      aria-label="嗷嗚計畫開場"
    >
      <h1 className="sr-only">嗷嗚計畫｜匠寵｜青蛙誰在怕</h1>

      <div
        className="poster-typewall"
        data-hero-type
        ref={typeRef}
        aria-hidden="true"
      >
        {Array.from({ length: TYPE_ROWS }, (_, row) => {
          const doubled = Array.from({ length: 10 }, () => TYPE_LINE).join("");
          return (
            <div
              key={row}
              className={`poster-typewall__row poster-typewall__row--${row % 2 === 0 ? "a" : "b"}`}
            >
              <div data-type-track className="poster-typewall__track">
                <span>{doubled}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="poster-frame" data-hero-frog>
        <div
          className="poster-frame__media"
          style={{ backgroundImage: `url(${HERO_MASTER})` }}
          role="img"
          aria-label="西裝青蛙近景——第一屏 Hero 獨立主視覺"
        />
        <div className="poster-frame__sticker">
          <BrandSticker />
        </div>
      </div>
    </div>
  );
}
