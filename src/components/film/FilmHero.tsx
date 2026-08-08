"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BrandSticker } from "@/components/hero/BrandSticker";
import { HERO_MASTER } from "@/lib/story";

const ROW_A = "青蛙誰在怕　WHO'S AFRAID OF THE FROG?　";
const ROW_B = "WHO'S AFRAID OF THE FROG?　青蛙誰在怕　";

/**
 * Lil Frogeth grammar: pure black void · acid type wall (z0)
 * · framed hero plate (z2) · brand sticker (z3) · grain.
 * Same locked dog as story 01 — never regenerate art.
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
      gsap.set(track, { xPercent: reverse ? -35 : 0 });
      tweens.push(
        gsap.to(track, {
          xPercent: reverse ? 0 : -35,
          duration: 22 + i * 3.2,
          ease: "none",
          repeat: -1,
        }),
      );
    });

    return () => tweens.forEach((t) => t.kill());
  }, []);

  const rows = [ROW_A, ROW_B, ROW_A, ROW_B];

  return (
    <div className="candy-hero" data-film-hero aria-label="嗷嗚計畫開場">
      <h1 className="sr-only">嗷嗚計畫｜匠寵｜青蛙誰在怕</h1>

      {/* z0 — HTML type wall, cropped by viewport edges */}
      <div
        className="candy-hero__typewall"
        data-hero-type
        ref={typeRef}
        aria-hidden="true"
      >
        {rows.map((line, row) => {
          const doubled = Array.from({ length: 6 }, () => line).join("");
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

      {/* z2 — independent Hero close-up only; never reuse on chapter 2 */}
      <div className="candy-hero__frame" data-hero-frog>
        <div
          className="candy-hero__master"
          style={{ backgroundImage: `url(${HERO_MASTER})` }}
          role="img"
          aria-label="西裝青蛙近景——第一屏 Hero 獨立主視覺"
        />
      </div>

      {/* z3 — brand mark */}
      <BrandSticker />

      {/* soft grain — does not obscure faces */}
      <div className="candy-hero__grain" aria-hidden="true" />
      <div className="candy-hero__halftone" aria-hidden="true" />
    </div>
  );
}
