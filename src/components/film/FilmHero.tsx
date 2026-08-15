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
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const frame = root.querySelector<HTMLElement>("[data-hero-frog]");
    const tweens: gsap.core.Tween[] = [];

    if (frame) gsap.set(frame, { autoAlpha: 0, scale: 1.025 });
    if (frame) {
      tweens.push(
        gsap.to(frame, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.95,
          ease: "power2.out",
        }),
      );
    }

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
          const sequence = Array.from({ length: 8 }, () => TYPE_LINE).join("");
          return (
            <div
              key={row}
              className={`poster-typewall__row poster-typewall__row--${row % 2 === 0 ? "a" : "b"}`}
            >
              <div data-type-track className="poster-typewall__track">
                <span>{sequence}</span>
                <span aria-hidden="true">{sequence}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="poster-frame" data-hero-frog>
        <img
          className="poster-frame__frog"
          src={HERO_MASTER}
          alt="粉紅上衣綠色青蛙站在輪播的青蛙誰在怕字牆前"
        />
        <div className="poster-frame__sticker">
          <BrandSticker />
        </div>
      </div>
    </div>
  );
}
