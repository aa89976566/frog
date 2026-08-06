"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_ACTS, FILM_SEGMENTS } from "@/lib/story";
import { FilmHero } from "@/components/film/FilmHero";
import { CaptionPill } from "@/components/story/CaptionPill";
import { BrushMask } from "@/components/story/BrushMask";

gsap.registerPlugin(ScrollTrigger);

/**
 * Continuous candy film — one pin, one scrub timeline.
 * Transitions keep outgoing + type overlay + incoming simultaneously visible.
 * No fullscreen black type pages.
 */
export function ScrollFilm() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [captionVisible, setCaptionVisible] = useState(false);
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
    const heroClouds = pin.querySelector<HTMLElement>("[data-hero-clouds]");
    const heroType = pin.querySelector<HTMLElement>("[data-hero-type]");
    const heroFrog = pin.querySelector<HTMLElement>("[data-hero-frog]");
    const acts = gsap.utils.toArray<HTMLElement>(
      pin.querySelectorAll("[data-act-plate]"),
    );
    const typeOverlays = gsap.utils.toArray<HTMLElement>(
      pin.querySelectorAll("[data-type-overlay]"),
    );

    const { heroHold, transition, actHold, act5Hold } = FILM_SEGMENTS;
    // 1 hero→1 + 4 act→act = 5 transitions
    const totalUnits =
      heroHold + transition + actHold * 4 + transition * 4 + act5Hold;

    const ctx = gsap.context(() => {
      gsap.set(hero, { yPercent: 0, autoAlpha: 1, zIndex: 10 });
      acts.forEach((el) => {
        gsap.set(el, {
          yPercent: 100,
          scale: 1.12,
          autoAlpha: 0,
          zIndex: 30,
          filter: "brightness(1)",
        });
        gsap.set(el.querySelectorAll("[data-ghost]"), { autoAlpha: 0 });
      });
      typeOverlays.forEach((el) => {
        gsap.set(el, {
          yPercent: 70,
          autoAlpha: 0,
          zIndex: 20,
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${window.innerHeight * totalUnits}`,
          pin: pin,
          scrub: 1.3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      const setCaption = (index: number, visible: boolean) => {
        setActive(index);
        setCaptionVisible(visible);
      };

      const showGhosts = (plate: HTMLElement, at: number, dur: number) => {
        const ghosts = plate.querySelectorAll<HTMLElement>("[data-ghost]");
        ghosts.forEach((g, i) => {
          const ox = (i % 2 === 0 ? 1 : -1) * (12 + i * 5);
          const oy = (i - 1) * 7;
          tl.fromTo(
            g,
            { autoAlpha: 0, x: 0, y: 0 },
            {
              autoAlpha: 0.1 + i * 0.03,
              x: ox,
              y: oy,
              duration: dur * 0.4,
            },
            at + dur * 0.2,
          );
          tl.to(g, { autoAlpha: 0, duration: dur * 0.3 }, at + dur * 0.7);
        });
      };

      /**
       * Triple-layer transition (~125vh):
       * 0–0.35  outgoing stays 65–100vh; type rises to 25–45vh
       * 0.25–0.75 incoming rises 0→55vh; outgoing ≥30vh
       * 0.55–1   incoming →100vh; outgoing exits
       * z: out 10 · type 20 · in 30
       */
      const transitionTriple = (
        outgoing: HTMLElement | null,
        incoming: HTMLElement,
        typeEl: HTMLElement | null,
        at: number,
        dur: number,
        captionIndex: number,
      ) => {
        // z-order for this beat
        if (outgoing) tl.set(outgoing, { zIndex: 10, autoAlpha: 1 }, at);
        if (typeEl) tl.set(typeEl, { zIndex: 20 }, at);
        tl.set(incoming, { zIndex: 30, autoAlpha: 1 }, at);

        // —— 0–0.35: type enters from below; outgoing holds ——
        if (typeEl) {
          tl.fromTo(
            typeEl,
            { yPercent: 70, autoAlpha: 0 },
            { yPercent: 28, autoAlpha: 1, duration: dur * 0.35 },
            at,
          );
        }
        if (outgoing) {
          tl.to(
            outgoing,
            {
              yPercent: -8,
              scale: 1.03,
              filter: "brightness(0.85)",
              duration: dur * 0.35,
            },
            at,
          );
        }

        // —— 0.25–0.75: incoming rises to ~55vh; out still ≥30vh ——
        tl.fromTo(
          incoming,
          { yPercent: 100, scale: 1.12 },
          { yPercent: 45, scale: 1.06, duration: dur * 0.5 },
          at + dur * 0.25,
        );
        if (outgoing) {
          tl.to(
            outgoing,
            {
              yPercent: -22,
              scale: 1.06,
              filter: "brightness(0.65)",
              duration: dur * 0.5,
            },
            at + dur * 0.25,
          );
        }
        if (typeEl) {
          tl.to(
            typeEl,
            { yPercent: 10, autoAlpha: 0.92, duration: dur * 0.5 },
            at + dur * 0.25,
          );
        }

        // Caption when incoming covers ~35% viewport (yPercent ~65 → visible ~35%)
        // At yPercent 65, bottom 35% shows incoming
        tl.call(() => setCaption(captionIndex, true), undefined, at + dur * 0.42);

        // —— 0.55–1: incoming expands to full; outgoing leaves ——
        tl.to(
          incoming,
          { yPercent: 0, scale: 1, duration: dur * 0.45 },
          at + dur * 0.55,
        );
        if (outgoing) {
          tl.to(
            outgoing,
            {
              yPercent: -55,
              scale: 1.1,
              filter: "brightness(0.45)",
              autoAlpha: 0,
              duration: dur * 0.45,
            },
            at + dur * 0.55,
          );
        }
        if (typeEl) {
          tl.to(
            typeEl,
            { yPercent: -15, autoAlpha: 0, duration: dur * 0.4 },
            at + dur * 0.6,
          );
        }

        showGhosts(incoming, at + dur * 0.3, dur * 0.55);
      };

      let t = 0;

      // Hero hold + parallax
      if (heroClouds) tl.to(heroClouds, { yPercent: -8, duration: heroHold }, t);
      if (heroType) tl.to(heroType, { yPercent: -14, duration: heroHold }, t);
      if (heroFrog) tl.to(heroFrog, { yPercent: -5, duration: heroHold }, t);
      t += heroHold;

      // Hero → Act1
      const type0 = typeOverlays[0] ?? null;
      transitionTriple(hero, acts[0], type0, t, transition, 0);
      t += transition;

      // Act holds + act→act transitions
      for (let i = 0; i < acts.length; i++) {
        const hold = i === acts.length - 1 ? act5Hold : actHold;
        tl.to(acts[i], { scale: 1.02, duration: hold }, t);
        t += hold;

        if (i < acts.length - 1) {
          const raw = typeOverlays[i + 1] ?? null;
          const typeEl =
            raw && !raw.classList.contains("candy-type-overlay--empty")
              ? raw
              : null;
          transitionTriple(acts[i], acts[i + 1], typeEl, t, transition, i + 1);
          t += transition;
        }
      }

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  const act = active >= 0 ? STORY_ACTS[active] : STORY_ACTS[0];

  if (reduced) {
    return (
      <section className="candy-film candy-film--reduced" id="top" ref={rootRef}>
        <FilmHero />
        <div id="story">
          {STORY_ACTS.map((a) => (
            <article key={a.id} className="candy-reduced" id={`act-${a.chapter}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.image}
                alt={a.aria}
                className="candy-reduced__img"
                style={{
                  objectPosition: a.objectPosition,
                  transform: `scale(${a.coverScale})`,
                }}
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
          {STORY_ACTS.map((a, i) => (
            <div
              key={a.id}
              className="candy-plate"
              data-act-plate
              data-act={a.id}
              id={`act-${a.chapter}`}
              aria-label={a.aria}
              style={
                {
                  "--cover-scale": a.coverScale,
                  "--obj-pos": a.objectPosition,
                } as CSSProperties
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.image}
                alt={a.aria}
                className="candy-plate__img"
                width={1024}
                height={576}
                decoding="async"
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="candy-plate__grade" aria-hidden="true" />
              <div className="candy-plate__ghosts" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt="" data-ghost className="candy-ghost candy-ghost--a" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt="" data-ghost className="candy-ghost candy-ghost--b" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt="" data-ghost className="candy-ghost candy-ghost--c" />
              </div>
              <BrushMask edge="top" className="candy-plate__seam" />
            </div>
          ))}

          {/* Type overlays — NEVER fullscreen black pages; sit between out/in */}
          {STORY_ACTS.map((a, i) =>
            a.enterType ? (
              <div
                key={`type-${a.id}`}
                className="candy-type-overlay"
                data-type-overlay
                data-type-for={a.id}
                aria-hidden="true"
              >
                <span className="candy-type-overlay__text">{a.enterType}</span>
              </div>
            ) : (
              <div
                key={`type-spacer-${i}`}
                className="candy-type-overlay candy-type-overlay--empty"
                data-type-overlay
                aria-hidden="true"
              />
            ),
          )}
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
    </section>
  );
}
