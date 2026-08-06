"use client";

import { useEffect, useRef, useState, useCallback, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  STORY_ACTS,
  SCROLL_RANGES,
  CHAPTER_HEIGHT_SVH,
  CHAPTER_OVERLAP_SVH,
} from "@/lib/story";
import { FilmHero } from "@/components/film/FilmHero";
import { FilmChapter } from "@/components/film/FilmChapter";
import { CaptionPill } from "@/components/story/CaptionPill";

gsap.registerPlugin(ScrollTrigger);

/**
 * Master scroll-story film strip — sticky cinematic plates,
 * brush-seam overlaps, scrubbed entrance/exit. No empty flat gaps.
 */
export function ScrollFilm() {
  const rootRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [captionVisible, setCaptionVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  const setChapterRef = useCallback((el: HTMLElement | null, i: number) => {
    chapterRefs.current[i] = el;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const chapters = chapterRefs.current.filter(Boolean) as HTMLElement[];
    if (chapters.length === 0) return;

    const ctx = gsap.context(() => {
      chapters.forEach((chapter, i) => {
        const plate = chapter.querySelector<HTMLElement>("[data-chapter-plate]");
        const shade = chapter.querySelector<HTMLElement>("[data-chapter-shade]");
        const onion = chapter.querySelector<HTMLElement>("[data-onion]");
        const interlude = chapter.querySelector<HTMLElement>("[data-interlude]");
        if (!plate) return;

        // Initial states
        if (i === 0) {
          gsap.set(plate, {
            yPercent: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
          });
          if (shade) gsap.set(shade, { opacity: 0 });
        } else {
          gsap.set(plate, {
            yPercent: 35,
            scale: 1.06,
            clipPath: "inset(18% 0% 0% 0%)",
          });
          if (shade) gsap.set(shade, { opacity: 0 });
        }

        if (onion) {
          gsap.set(onion, { opacity: 0 });
        }
        if (interlude) {
          gsap.set(interlude, { opacity: 0, xPercent: -8 });
        }

        // —— Incoming: chapter rises into view (chapters 1+) ——
        if (i > 0) {
          ScrollTrigger.create({
            trigger: chapter,
            start: "top bottom",
            end: "top top",
            scrub: 0.45,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const t = self.progress; // 0→1 as chapter top travels bottom→top
              // Map to incoming band (full travel = incoming settle)
              const y = gsap.utils.interpolate(35, 0, t);
              const scale = gsap.utils.interpolate(1.06, 1, t);
              const inset = gsap.utils.interpolate(18, 0, t);
              gsap.set(plate, {
                yPercent: y,
                scale,
                clipPath: `inset(${inset}% 0% 0% 0%)`,
              });
            },
          });
        }

        // —— Hold / outgoing while sticky ——
        ScrollTrigger.create({
          id: `film-chapter-${i}`,
          trigger: chapter,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.45,
          invalidateOnRefresh: true,
          onEnter: () => {
            setActive(i);
            setCaptionVisible(true);
          },
          onEnterBack: () => {
            setActive(i);
            setCaptionVisible(true);
          },
          onLeave: () => {
            if (i === chapters.length - 1) setCaptionVisible(false);
          },
          onUpdate: (self) => {
            const p = self.progress;
            const {
              holdEnd,
              outgoingStart,
              outgoingEnd,
            } = SCROLL_RANGES;

            // Active caption: dominant while in hold / early outgoing
            if (p >= 0 && p < outgoingEnd) {
              setActive(i);
              setCaptionVisible(true);
            }

            // Outgoing: remain under next plate, then scale + darken/blur
            if (p < outgoingStart) {
              if (i === 0 || p > SCROLL_RANGES.incomingEnd) {
                gsap.set(plate, {
                  scale: 1,
                  filter: "brightness(1) blur(0px)",
                });
              }
              if (shade) gsap.set(shade, { opacity: 0 });
            } else if (p <= outgoingEnd) {
              const t =
                (p - outgoingStart) / (outgoingEnd - outgoingStart);
              const scale = gsap.utils.interpolate(1, 1.08, t);
              const bright = gsap.utils.interpolate(1, 0.72, t);
              const blur = gsap.utils.interpolate(0, 2.5, t);
              gsap.set(plate, {
                scale,
                filter: `brightness(${bright}) blur(${blur}px)`,
              });
              if (shade) gsap.set(shade, { opacity: t * 0.45 });
            } else {
              gsap.set(plate, {
                scale: 1.08,
                filter: "brightness(0.68) blur(3px)",
              });
              if (shade) gsap.set(shade, { opacity: 0.5 });
            }

            // Onion-skin on emotional beats during hold
            if (onion) {
              if (p > 0.12 && p < holdEnd) {
                const pulse = 0.08 + Math.sin(p * Math.PI * 4) * 0.06;
                gsap.set(onion, { opacity: Math.min(0.22, pulse + 0.1) });
              } else {
                gsap.set(onion, { opacity: 0 });
              }
            }

            // Giant type interlude peeks during mid-hold
            if (interlude) {
              if (p > 0.2 && p < 0.55) {
                const t = (p - 0.2) / 0.35;
                gsap.set(interlude, {
                  opacity: Math.sin(t * Math.PI) * 0.92,
                  xPercent: gsap.utils.interpolate(-6, 4, t),
                });
              } else {
                gsap.set(interlude, { opacity: 0 });
              }
            }
          },
        });
      });

      // Hide caption when still in hero
      ScrollTrigger.create({
        trigger: root.querySelector("[data-film-hero]"),
        start: "top top",
        end: "bottom top",
        onEnter: () => setCaptionVisible(false),
        onEnterBack: () => setCaptionVisible(false),
        onLeave: () => setCaptionVisible(true),
      });

      ScrollTrigger.refresh();
    }, root);

    return () => {
      ctx.revert();
    };
  }, [reduced]);

  const act = STORY_ACTS[active] ?? STORY_ACTS[0];

  if (reduced) {
    return (
      <div className="scroll-film scroll-film--reduced" ref={rootRef} id="top">
        <FilmHero />
        <div className="scroll-film__stack" id="story">
          {STORY_ACTS.map((a) => (
            <article
              key={a.id}
              className="film-reduced-card"
              id={`act-${a.chapter}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.image}
                alt={a.aria}
                className="film-reduced-card__img"
                style={{ objectPosition: a.objectPosition }}
              />
              <div
                className="film-reduced-card__caption"
                style={{ backgroundColor: a.pillBg, color: a.pillFg }}
              >
                <span className="film-reduced-card__label">
                  {a.chapter} · {a.pillLabel}
                </span>
                <p>{a.lines[0]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="scroll-film"
      ref={rootRef}
      data-scroll-film
      id="top"
      style={
          {
            "--chapter-h": `${CHAPTER_HEIGHT_SVH}svh`,
            "--chapter-overlap": `${CHAPTER_OVERLAP_SVH}svh`,
          } as CSSProperties
        }
    >
      <FilmHero />

      <div className="scroll-film__chapters" data-film-chapters id="story">
        {/* Black tension beat before first image */}
        <div className="film-void" aria-hidden="true" />

        {STORY_ACTS.map((a, i) => (
          <FilmChapter
            key={a.id}
            act={a}
            index={i}
            total={STORY_ACTS.length}
            ref={(el) => setChapterRef(el, i)}
          />
        ))}
      </div>

      <CaptionPill
        chapter={act.chapter}
        label={act.pillLabel}
        copy={act.lines[0] ?? ""}
        bg={act.pillBg}
        fg={act.pillFg}
        visible={captionVisible}
      />
    </div>
  );
}
