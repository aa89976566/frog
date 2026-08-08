"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BrandSticker } from "@/components/hero/BrandSticker";
import { HERO_MASTER } from "@/lib/story";

const TYPE_LINE = "青蛙誰在怕　";

/**
 * Full-bleed poster hero: black void · rhythmic acid type wall (behind)
 * · dominant framed close-up · secondary brand sticker · no face overlays.
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

    gsap.set(type, { xPercent: 0, yPercent: 0 });
    if (frame) gsap.set(frame, { scale: 1.035 });

    // Entrance: type drifts 2–4%, image settles 1.035→1
    tweens.push(
      gsap.to(type, {
        xPercent: -2.5,
        duration: 1.35,
        ease: "power2.out",
      }),
    );
    if (frame) {
      tweens.push(
        gsap.to(frame, {
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        }),
      );
    }

    // Idle marquee — slow, even, no bounce
    tracks.forEach((track, i) => {
      const reverse = i % 2 === 1;
      gsap.set(track, { xPercent: reverse ? -20 : 0 });
      tweens.push(
        gsap.to(track, {
          xPercent: reverse ? 0 : -20,
          duration: 28 + i * 2.5,
          ease: "none",
          repeat: -1,
        }),
      );
    });

    return () => tweens.forEach((t) => t.kill());
  }, []);

  const rows = Array.from({ length: 6 }, () => TYPE_LINE);

  return (
    <div
      ref={rootRef}
      className="candy-hero"
      data-film-hero
      aria-label="嗷嗚計畫開場"
    >
      <h1 className="sr-only">嗷嗚計畫｜匠寵｜青蛙誰在怕</h1>

      <div
        className="candy-hero__typewall"
        data-hero-type
        ref={typeRef}
        aria-hidden="true"
      >
        {rows.map((line, row) => {
          const doubled = Array.from({ length: 8 }, () => line).join("");
          return (
            <div
              key={row}
              className={`candy-hero__type-row candy-hero__type-row--${row % 2 === 0 ? "a" : "b"}`}
            >
              <div data-type-track className="candy-hero__type-track">
                <span>{doubled}</span>
                <span aria-hidden="true">{doubled}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="candy-hero__frame" data-hero-frog>
        <div
          className="candy-hero__master"
          style={{ backgroundImage: `url(${HERO_MASTER})` }}
          role="img"
          aria-label="西裝青蛙近景——第一屏 Hero 獨立主視覺"
        />
      </div>

      <BrandSticker />

      <div className="candy-hero__grain" aria-hidden="true" />
    </div>
  );
}
