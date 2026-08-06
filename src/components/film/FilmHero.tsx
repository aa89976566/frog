"use client";

import { BrushMask } from "@/components/story/BrushMask";

/**
 * Hero plate: 120svh full-bleed character + oversized cropped type behind.
 * Exit via black brush mask into the film strip.
 */
export function FilmHero() {
  return (
    <section
      className="film-hero"
      aria-label="嗷嗚計畫開場"
      data-film-hero
    >
      <div className="film-hero__stage">
        <div className="film-hero__type" aria-hidden="true">
          <span className="film-hero__type-line film-hero__type-line--zh">
            青蛙誰在怕
          </span>
          <span className="film-hero__type-line film-hero__type-line--en">
            OWOO · FEARLESS
          </span>
          <span className="film-hero__type-line film-hero__type-line--zh film-hero__type-line--dup">
            青蛙誰在怕
          </span>
        </div>

        <div className="film-hero__art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero/hero-frog.png"
            alt="穿蛙裝的匠寵角色，準備踏上嗷嗚計畫"
            className="film-hero__img"
            width={1024}
            height={1024}
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="film-hero__copy">
          <p className="film-hero__brand">匠寵 FURMOSA</p>
          <h1 className="film-hero__title">
            嗷嗚計畫
            <span className="film-hero__title-sub">青蛙誰在怕</span>
          </h1>
          <p className="film-hero__lede">
            五幕連續膠卷。往下捲，故事會自己過來找你。
          </p>
        </div>
      </div>

      <BrushMask edge="bottom" className="film-hero__exit-mask" />
    </section>
  );
}
