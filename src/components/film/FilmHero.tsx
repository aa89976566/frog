"use client";

import { BrandSticker } from "@/components/hero/BrandSticker";
import { BrushMask } from "@/components/story/BrushMask";

/**
 * Candy hero — type wall + full-body frog + layered clouds + grain.
 * No traditional title block; type IS the composition.
 */
export function FilmHero() {
  return (
    <div className="candy-hero" data-film-hero aria-label="嗷嗚計畫開場">
      <div className="candy-hero__clouds" data-hero-clouds aria-hidden="true">
        <span className="candy-hero__cloud candy-hero__cloud--a" />
        <span className="candy-hero__cloud candy-hero__cloud--b" />
        <span className="candy-hero__cloud candy-hero__cloud--c" />
        <span className="candy-hero__cloud candy-hero__cloud--d" />
      </div>

      <div className="candy-hero__halftone" aria-hidden="true" />

      <div className="candy-hero__typewall" data-hero-type aria-hidden="true">
        {Array.from({ length: 5 }).map((_, row) => (
          <div
            key={row}
            className={`candy-hero__type-row candy-hero__type-row--${row % 2 === 0 ? "a" : "b"}`}
            style={{ transform: `translateX(${-6 - row * 4}%)` }}
          >
            <span>青蛙誰在怕</span>
            <span>FROG WHO&apos;S AFRAID</span>
            <span>青蛙誰在怕</span>
            <span>FROG WHO&apos;S AFRAID</span>
            <span>青蛙誰在怕</span>
          </div>
        ))}
      </div>

      <div className="candy-hero__frog" data-hero-frog>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/hero/hero-frog.png"
          alt="穿蛙裝的匠寵角色全身站姿"
          width={642}
          height={1426}
          decoding="async"
          fetchPriority="high"
          className="candy-hero__frog-img"
        />
      </div>

      <BrandSticker />

      <div className="candy-hero__grain" aria-hidden="true" />

      <BrushMask edge="bottom" className="candy-hero__brush" />
    </div>
  );
}
