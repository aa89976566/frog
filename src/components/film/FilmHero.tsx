"use client";

import { BrandSticker } from "@/components/hero/BrandSticker";
import { BrushMask } from "@/components/story/BrushMask";

/**
 * Lil Frogeth grammar hero — candy clouds + type wall + full-body frog.
 * No traditional bottom-left title block; type IS the composition.
 */
export function FilmHero() {
  return (
    <div className="candy-hero" data-film-hero aria-label="嗷嗚計畫開場" style={{ zIndex: 4 }}>
      <div className="candy-hero__clouds" data-hero-clouds aria-hidden="true">
        <span className="candy-hero__cloud candy-hero__cloud--a" />
        <span className="candy-hero__cloud candy-hero__cloud--b" />
        <span className="candy-hero__cloud candy-hero__cloud--c" />
        <span className="candy-hero__cloud candy-hero__cloud--d" />
      </div>

      <div className="candy-hero__typewall" data-hero-type aria-hidden="true">
        <div className="candy-hero__type-row candy-hero__type-row--a">
          <span>青蛙誰在怕</span>
          <span>FROG WHO&apos;S AFRAID</span>
          <span>青蛙誰在怕</span>
          <span>FROG WHO&apos;S AFRAID</span>
        </div>
        <div className="candy-hero__type-row candy-hero__type-row--b">
          <span>FROG WHO&apos;S AFRAID</span>
          <span>青蛙誰在怕</span>
          <span>FROG WHO&apos;S AFRAID</span>
          <span>青蛙誰在怕</span>
        </div>
        <div className="candy-hero__type-row candy-hero__type-row--c">
          <span>青蛙誰在怕</span>
          <span>FROG WHO&apos;S AFRAID</span>
          <span>青蛙誰在怕</span>
          <span>FROG WHO&apos;S AFRAID</span>
        </div>
        <div className="candy-hero__type-row candy-hero__type-row--d">
          <span>FROG WHO&apos;S AFRAID</span>
          <span>青蛙誰在怕</span>
          <span>FROG WHO&apos;S AFRAID</span>
          <span>青蛙誰在怕</span>
        </div>
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

      <BrushMask edge="bottom" className="candy-hero__brush" />
    </div>
  );
}
