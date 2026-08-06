"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_ACTS, TYPE_BEATS, FILM_SEGMENTS } from "@/lib/story";
import { FilmHero } from "@/components/film/FilmHero";
import { CaptionPill } from "@/components/story/CaptionPill";
import { BrushMask } from "@/components/story/BrushMask";

gsap.registerPlugin(ScrollTrigger);

/**
 * Master pinned candy film — one GSAP timeline, overlapping plates.
 * Previous stays in upper viewport while next rises from below.
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
    const types = gsap.utils.toArray<HTMLElement>(
      pin.querySelectorAll("[data-type-plate]"),
    );
    const seam = pin.querySelector<HTMLElement>("[data-seam-brush]");

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(hero, { yPercent: 0, autoAlpha: 1, zIndex: 20 });
      acts.forEach((el, i) => {
        gsap.set(el, {
          yPercent: 55,
          scale: 1.12,
          clipPath: "inset(18% 0 0 0)",
          autoAlpha: 0,
          zIndex: 30 + i,
        });
        const ghosts = el.querySelectorAll<HTMLElement>("[data-ghost]");
        gsap.set(ghosts, { autoAlpha: 0 });
      });
      types.forEach((el, i) => {
        gsap.set(el, {
          yPercent: 55,
          scale: 1.08,
          clipPath: "inset(18% 0 0 0)",
          autoAlpha: 0,
          zIndex: 50 + i,
        });
      });
      if (seam) gsap.set(seam, { autoAlpha: 0, zIndex: 60 });

      const {
        heroHold,
        heroToAct1,
        actHold,
        transition,
        typeBeat,
        act5Hold,
      } = FILM_SEGMENTS;

      // Total scroll distance ~ multi-viewport pin
      const totalUnits =
        heroHold +
        heroToAct1 +
        actHold + // act1
        transition + // 1→type or 1→2
        typeBeat + // type after act1
        transition + // type→act2
        actHold + // act2
        transition + // 2→3
        actHold + // act3
        transition + // 3→type
        typeBeat + // type after act3
        transition + // type→act4
        actHold + // act4
        transition + // 4→5
        act5Hold;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${window.innerHeight * totalUnits * 0.92}`,
          pin: pin,
          scrub: 1.25,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      let stackZ = 30;

      const setCaption = (index: number, visible: boolean) => {
        setActive(index);
        setCaptionVisible(visible);
      };

      const showGhosts = (plate: HTMLElement, at: number, dur: number) => {
        const ghosts = plate.querySelectorAll<HTMLElement>("[data-ghost]");
        ghosts.forEach((g, i) => {
          const ox = (i % 2 === 0 ? 1 : -1) * (12 + i * 6);
          const oy = (i - 1) * 8;
          tl.fromTo(
            g,
            { autoAlpha: 0, x: 0, y: 0 },
            {
              autoAlpha: 0.08 + i * 0.04,
              x: ox,
              y: oy,
              duration: dur * 0.45,
            },
            at,
          );
          tl.to(
            g,
            { autoAlpha: 0, duration: dur * 0.35 },
            at + dur * 0.55,
          );
        });
      };

      const enterPlate = (
        plate: HTMLElement,
        at: number,
        dur: number,
        opts?: { captionIndex?: number },
      ) => {
        stackZ += 1;
        tl.set(plate, { autoAlpha: 1, zIndex: stackZ }, at);
        tl.fromTo(
          plate,
          {
            yPercent: 55,
            scale: 1.12,
            clipPath: "inset(18% 0 0 0)",
          },
          {
            yPercent: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: dur,
          },
          at,
        );
        // Caption switches when incoming reaches ~35%
        if (opts?.captionIndex !== undefined) {
          tl.call(
            () => setCaption(opts.captionIndex!, true),
            undefined,
            at + dur * 0.35,
          );
        }
        showGhosts(plate, at, dur);
      };

      const exitPlate = (
        plate: HTMLElement,
        at: number,
        /** keep visible until next has entered 55% of its dur */
        nextEnterDur: number,
      ) => {
        // Hold visibility through 55% of next entrance, then finish exit
        const hold = nextEnterDur * 0.55;
        tl.to(
          plate,
          {
            yPercent: -12,
            scale: 1.04,
            filter: "brightness(0.78)",
            duration: hold,
          },
          at,
        );
        tl.to(
          plate,
          {
            yPercent: -20,
            scale: 1.08,
            filter: "brightness(0.55)",
            duration: nextEnterDur * 0.45,
          },
          at + hold,
        );
      };

      let t = 0;

      // —— Hero hold + parallax drift ——
      if (heroClouds) {
        tl.to(heroClouds, { yPercent: -6, duration: heroHold }, t);
      }
      if (heroType) {
        tl.to(heroType, { yPercent: -12, duration: heroHold }, t);
      }
      if (heroFrog) {
        tl.to(heroFrog, { yPercent: -4, duration: heroHold }, t);
      }
      t += heroHold;

      // —— Hero → Act 1 ——
      const h2a = heroToAct1;
      if (seam) {
        tl.fromTo(
          seam,
          { autoAlpha: 0, yPercent: 20 },
          { autoAlpha: 1, yPercent: 0, duration: h2a * 0.35 },
          t,
        );
        tl.to(seam, { autoAlpha: 0, duration: h2a * 0.25 }, t + h2a * 0.7);
      }
      tl.to(
        hero!,
        {
          yPercent: -28,
          scale: 1.06,
          filter: "brightness(0.55)",
          duration: h2a,
        },
        t,
      );
      if (heroClouds) {
        tl.to(heroClouds, { yPercent: -18, duration: h2a }, t);
      }
      if (heroType) {
        tl.to(heroType, { yPercent: -28, duration: h2a }, t);
      }
      if (heroFrog) {
        tl.to(heroFrog, { yPercent: -10, duration: h2a }, t);
      }
      enterPlate(acts[0], t, h2a, { captionIndex: 0 });
      t += h2a;

      // Act 1 hold
      tl.to(acts[0], { scale: 1.02, duration: actHold }, t);
      t += actHold;

      // Act1 → Type "合群？"
      exitPlate(acts[0], t, transition);
      enterPlate(types[0], t, transition);
      tl.call(() => setCaptionVisible(false), undefined, t + transition * 0.2);
      t += transition;

      // Type beat hold
      tl.fromTo(
        types[0].querySelector("[data-type-text]"),
        { xPercent: -8, scale: 1.05 },
        { xPercent: 4, scale: 1, duration: typeBeat },
        t,
      );
      t += typeBeat;

      // Type → Act 2
      exitPlate(types[0], t, transition);
      enterPlate(acts[1], t, transition, { captionIndex: 1 });
      t += transition;

      // Act 2 hold
      tl.to(acts[1], { scale: 1.02, duration: actHold }, t);
      t += actHold;

      // Act2 → Act3 (eyes up, dog rises)
      exitPlate(acts[1], t, transition);
      enterPlate(acts[2], t, transition, { captionIndex: 2 });
      t += transition;

      // Act 3 hold
      tl.to(acts[2], { scale: 1.02, duration: actHold }, t);
      t += actHold;

      // Act3 → Type "嗷嗚！"
      exitPlate(acts[2], t, transition);
      enterPlate(types[1], t, transition);
      tl.call(() => setCaptionVisible(false), undefined, t + transition * 0.2);
      t += transition;

      tl.fromTo(
        types[1].querySelector("[data-type-text]"),
        { xPercent: -10, scale: 1.08 },
        { xPercent: 6, scale: 1, duration: typeBeat },
        t,
      );
      t += typeBeat;

      // Type → Act 4
      exitPlate(types[1], t, transition);
      enterPlate(acts[3], t, transition, { captionIndex: 3 });
      t += transition;

      // Act 4 hold
      tl.to(acts[3], { scale: 1.02, duration: actHold }, t);
      t += actHold;

      // Act4 → Act5
      exitPlate(acts[3], t, transition);
      enterPlate(acts[4], t, transition, { captionIndex: 4 });
      t += transition;

      // Act 5 hold
      tl.to(acts[4], { scale: 1.04, duration: act5Hold }, t);

      ScrollTrigger.refresh();
    }, root);

    return () => {
      ctx.revert();
    };
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
          {TYPE_BEATS.map((b) => (
            <div key={b.id} className="candy-type candy-type--static" aria-hidden="true">
              <span>{b.text}</span>
            </div>
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
                  zIndex: 30 + i,
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
              <div className="candy-plate__ghosts" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt="" data-ghost className="candy-ghost candy-ghost--a" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt="" data-ghost className="candy-ghost candy-ghost--b" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt="" data-ghost className="candy-ghost candy-ghost--c" />
              </div>
            </div>
          ))}

          {TYPE_BEATS.map((b, i) => (
            <div
              key={b.id}
              className="candy-type"
              data-type-plate
              aria-hidden="true"
              style={{ zIndex: 40 + i }}
            >
              <span className="candy-type__text" data-type-text>
                {b.text}
              </span>
            </div>
          ))}
        </div>

        <div className="candy-film__seam" data-seam-brush aria-hidden="true">
          <BrushMask edge="bottom" />
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
