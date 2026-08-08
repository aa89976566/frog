"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_ACTS, FILM_SEGMENTS } from "@/lib/story";
import { FilmHero } from "@/components/film/FilmHero";
import { CaptionPill } from "@/components/story/CaptionPill";

gsap.registerPlugin(ScrollTrigger);

/** Hero caption — existing campaign copy only (HTML, never baked into bitmap). */
const HERO_CAPTION = {
  chapter: "00",
  label: "開場",
  copy: "青蛙誰在怕",
  bg: "#EFF476",
  fg: "#050505" as const,
};

/** Image crossfade length in timeline units (1 unit ≈ 1svh of scroll). */
const IMAGE_CROSS = 0.15;

/**
 * Single pinned stage · controlled cinematic handoff.
 * At most two images during a short crossfade; one title readable at a time.
 */
export function ScrollFilm() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [captionVisible, setCaptionVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    if (!root || !pin || reduced) return;

    const hero = pin.querySelector<HTMLElement>("[data-film-hero]");
    const heroType = pin.querySelector<HTMLElement>("[data-hero-type]");
    const heroFrog = pin.querySelector<HTMLElement>("[data-hero-frog]");
    const acts = gsap.utils.toArray<HTMLElement>(
      pin.querySelectorAll("[data-act-plate]"),
    );
    const actTitles = gsap.utils.toArray<HTMLElement>(
      pin.querySelectorAll("[data-act-title]"),
    );
    const captionEl = captionRef.current;

    const { heroHold, transition, actHold, act5Hold } = FILM_SEGMENTS;
    const totalUnits =
      heroHold + transition + actHold * 4 + transition * 4 + act5Hold;

    type CapWin = { index: number; start: number; end: number };
    const captionWindows: CapWin[] = [];

    const ctx = gsap.context(() => {
      gsap.set(hero, { autoAlpha: 1, zIndex: 12, scale: 1 });
      if (heroType) gsap.set(heroType, { autoAlpha: 1 });
      acts.forEach((el) => {
        gsap.set(el, { autoAlpha: 0, scale: 1.025, zIndex: 8 });
      });
      actTitles.forEach((el) => {
        gsap.set(el, { autoAlpha: 0 });
      });

      // Caption entrance: rise 24px / fade in
      if (
        captionEl &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.fromTo(
          captionEl,
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.95, ease: "power2.out", delay: 0.15 },
        );
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${window.innerHeight * totalUnits}`,
          pin: pin,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const unit = self.progress * totalUnits;
            let next = -1;
            for (const w of captionWindows) {
              if (unit >= w.start && unit < w.end) {
                next = w.index;
                break;
              }
            }
            if (
              next < 0 &&
              captionWindows.length &&
              unit >= (captionWindows.at(-1)?.start ?? Infinity)
            ) {
              next = captionWindows.at(-1)?.index ?? -1;
            }
            // Hero caption while before first chapter window
            const firstStart = captionWindows[0]?.start ?? Infinity;
            if (unit < firstStart) {
              setActive(-1);
              setCaptionVisible(true);
              return;
            }
            setActive(next);
            setCaptionVisible(next >= 0);
          },
        },
      });

      /**
       * Controlled handoff:
       * 1) outgoing title fades fully
       * 2) short image crossfade (≈12–18vh): out 1→0 / 1→0.985, in 0→1 / 1.025→1
       * 3) incoming title only after outgoing title is gone
       * Caption swaps at incoming image opacity ≥ 0.7
       */
      const handoff = (
        outgoing: HTMLElement | null,
        outgoingTitle: HTMLElement | null,
        incoming: HTMLElement,
        incomingTitle: HTMLElement | null,
        at: number,
        dur: number,
        captionIndex: number,
      ) => {
        const titleOutDur = Math.min(0.38, dur * 0.28);
        const crossAt = at + titleOutDur * 0.85;
        const crossDur = IMAGE_CROSS;
        const titleInAt = crossAt + crossDur * 0.55;

        if (outgoing) tl.set(outgoing, { zIndex: 14 }, at);
        tl.set(incoming, { zIndex: 16, scale: 1.025 }, at);

        if (outgoingTitle) {
          tl.to(
            outgoingTitle,
            { autoAlpha: 0, duration: titleOutDur },
            at,
          );
        }

        // Image crossfade — only two images coexist here
        if (outgoing) {
          tl.to(
            outgoing,
            { autoAlpha: 0, scale: 0.985, duration: crossDur },
            crossAt,
          );
        }
        tl.fromTo(
          incoming,
          { autoAlpha: 0, scale: 1.025 },
          { autoAlpha: 1, scale: 1, duration: crossDur },
          crossAt,
        );

        // Incoming title after outgoing title is unreadable
        if (incomingTitle) {
          tl.fromTo(
            incomingTitle,
            { autoAlpha: 0 },
            { autoAlpha: 0.9, duration: Math.min(0.4, dur * 0.3) },
            titleInAt,
          );
        }

        // Caption after incoming ≥ ~0.7 opacity
        const capStart = crossAt + crossDur * 0.7;
        const prev = captionWindows.at(-1);
        if (prev) prev.end = capStart;
        captionWindows.push({
          index: captionIndex,
          start: capStart,
          end: Infinity,
        });
      };

      let t = 0;

      // Hero hold — subtle type drift + micro image settle
      if (heroType) {
        tl.to(heroType, { xPercent: -3.5, duration: heroHold }, t);
      }
      if (heroFrog) {
        tl.to(heroFrog, { scale: 1.01, duration: heroHold }, t);
      }
      t += heroHold;

      // Hero → Act 1
      handoff(
        hero,
        heroType,
        acts[0],
        actTitles[0] ?? null,
        t,
        transition,
        0,
      );
      t += transition;

      for (let i = 0; i < acts.length; i++) {
        const hold = i === acts.length - 1 ? act5Hold : actHold;
        const frame = acts[i].querySelector<HTMLElement>("[data-plate-frame]");
        if (frame) {
          tl.to(frame, { scale: 1.012, duration: hold }, t);
        } else {
          tl.to(acts[i], { scale: 1.01, duration: hold }, t);
        }
        t += hold;

        if (i < acts.length - 1) {
          handoff(
            acts[i],
            actTitles[i] ?? null,
            acts[i + 1],
            actTitles[i + 1] ?? null,
            t,
            transition,
            i + 1,
          );
          t += transition;
        }
      }

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  const caption =
    active < 0
      ? HERO_CAPTION
      : {
          chapter: STORY_ACTS[active].chapter,
          label: STORY_ACTS[active].pillLabel,
          copy: STORY_ACTS[active].lines[0] ?? "",
          bg: STORY_ACTS[active].pillBg,
          fg: STORY_ACTS[active].pillFg,
        };

  if (reduced) {
    return (
      <section className="candy-film candy-film--reduced" id="top" ref={rootRef}>
        <FilmHero />
        <div className="candy-caption-anchor candy-caption--static">
          <CaptionPill
            chapter={HERO_CAPTION.chapter}
            label={HERO_CAPTION.label}
            copy={HERO_CAPTION.copy}
            bg={HERO_CAPTION.bg}
            fg={HERO_CAPTION.fg}
            visible
          />
        </div>
        <div id="story">
          {STORY_ACTS.map((a) => (
            <article key={a.id} className="candy-reduced" id={`act-${a.chapter}`}>
              <div className="candy-reduced__backdrop" aria-hidden="true">
                <span className="candy-reduced__num">{a.chapter}</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.image}
                alt={a.aria}
                className="candy-reduced__img"
                style={{ objectPosition: a.objectPosition }}
              />
              <div
                className="candy-reduced__caption"
                style={{ backgroundColor: a.pillBg, color: a.pillFg }}
              >
                <strong>
                  {a.chapter} {a.pillLabel}
                </strong>
                <p>{a.lines[0]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="candy-film" id="top" ref={rootRef} data-scroll-film>
      <div className="candy-film__pin" ref={pinRef}>
        <FilmHero />

        <div className="candy-film__stage" id="story">
          {STORY_ACTS.map((a, i) => {
            const tone = i % 2 === 0 ? "acid" : "pink";
            const title = a.enterType ?? a.pillLabel;
            return (
              <div
                key={a.id}
                className={`candy-plate candy-plate--${tone}`}
                data-act-plate
                data-act={a.id}
                id={`act-${a.chapter}`}
                aria-label={a.aria}
                style={
                  {
                    "--cover-scale": a.coverScale,
                    "--cover-scale-m": a.coverScaleMobile,
                    "--obj-pos": a.objectPosition,
                    "--obj-pos-m": a.objectPositionMobile,
                  } as CSSProperties
                }
              >
                {/* One chapter title wall — no double-exposure echo */}
                <div
                  className="candy-plate__title"
                  data-act-title
                  aria-hidden="true"
                >
                  <span className="candy-plate__title-text">{title}</span>
                </div>

                <div className="candy-plate__frame" data-plate-frame>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.image}
                    alt={a.aria}
                    className="candy-plate__img"
                    width={1024}
                    height={576}
                    decoding="async"
                    loading="eager"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div ref={captionRef} className="candy-caption-anchor">
          <CaptionPill
            chapter={caption.chapter}
            label={caption.label}
            copy={caption.copy}
            bg={caption.bg}
            fg={caption.fg}
            visible={captionVisible}
          />
        </div>
      </div>
    </section>
  );
}
