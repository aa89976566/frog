"use client";

import { forwardRef, type CSSProperties } from "react";
import type { StoryAct } from "@/lib/story";
import { BrushMask } from "@/components/story/BrushMask";

type FilmChapterProps = {
  act: StoryAct;
  index: number;
  total: number;
};

/**
 * Chapter: 180svh wrapper + 100svh sticky stage.
 * Incoming rises from below with clip-path; outgoing stays underneath.
 */
export const FilmChapter = forwardRef<HTMLElement, FilmChapterProps>(
  function FilmChapter({ act, index, total }, ref) {
    const onion = act.ghost !== "none";

    return (
      <section
        ref={ref}
        className="film-chapter"
        id={`act-${act.chapter}`}
        aria-label={act.aria}
        data-film-chapter={index}
        data-act={act.id}
        style={
          {
            "--chapter-z": index + 2,
            "--obj-pos": act.objectPosition,
          } as CSSProperties
        }
      >
        <div className="film-chapter__pin">
          <div className="film-chapter__stage" data-chapter-stage>
            <div className="film-chapter__plate" data-chapter-plate>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={act.image}
                alt={act.aria}
                className="film-chapter__img"
                width={1024}
                height={576}
                decoding="async"
                loading={index === 0 ? "eager" : "lazy"}
                data-chapter-img
              />

              {onion ? (
                <div
                  className="film-chapter__onion"
                  aria-hidden="true"
                  data-onion
                  data-ghost-kind={act.ghost}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={act.image} alt="" className="film-chapter__onion-a" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={act.image} alt="" className="film-chapter__onion-b" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={act.image} alt="" className="film-chapter__onion-c" />
                </div>
              ) : null}

              <div
                className="film-chapter__shade"
                aria-hidden="true"
                data-chapter-shade
              />
            </div>

            {act.interlude ? (
              <div
                className="film-chapter__interlude"
                aria-hidden="true"
                data-interlude
              >
                <span className="film-chapter__interlude-text">
                  {act.interlude}
                </span>
              </div>
            ) : null}

            <BrushMask edge="top" className="film-chapter__mask-top" />
            {index < total - 1 ? (
              <BrushMask edge="bottom" className="film-chapter__mask-bottom" />
            ) : null}
          </div>
        </div>
      </section>
    );
  },
);
