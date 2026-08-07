"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_ACTS, FILM_SEGMENTS } from "@/lib/story";
import { FilmHero } from "@/components/film/FilmHero";
import { CaptionPill } from "@/components/story/CaptionPill";

gsap.registerPlugin(ScrollTrigger);

/**
 * Single GSAP ScrollTrigger master timeline — sticky overlapping crossfade.
 * Outgoing still at opacity .35–.55 while next enters from scale(.94) / y(12vh).
 * Overlap ≥40%. No pure-black blank segments.
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
    const heroType = pin.querySelector<HTMLElement>("[data-hero-type]");
    const heroFrog = pin.querySelector<HTMLElement>("[data-hero-frog]");
    const acts = gsap.utils.toArray<HTMLElement>(
      pin.querySelectorAll("[data-act-plate]"),
    );
    const typeOverlays = gsap.utils.toArray<HTMLElement>(
      pin.querySelectorAll("[data-type-overlay]"),
    );
    const backdrops = gsap.utils.toArray<HTMLElement>(
      pin.querySelectorAll("[data-plate-backdrop]"),
    );

    const { heroHold, transition, actHold, act5Hold } = FILM_SEGMENTS;
    const totalUnits =
      heroHold + transition + actHold * 4 + transition * 4 + act5Hold;

    const ctx = gsap.context(() => {
      gsap.set(hero, { autoAlpha: 1, zIndex: 10, y: 0, scale: 1 });
      acts.forEach((el) => {
        gsap.set(el, {
          y: "12vh",
          scale: 0.94,
          autoAlpha: 0,
          zIndex: 30,
        });
      });
      typeOverlays.forEach((el) => {
        gsap.set(el, {
          autoAlpha: 0,
          y: "8vh",
          zIndex: 20,
          immediateRender: true,
        });
      });
      backdrops.forEach((el) => {
        gsap.set(el, { x: 0 });
      });

      /** Caption windows in timeline units — synced on scrub (forward + reverse). */
      const captionWindows: { index: number; start: number; end: number }[] = [];

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${window.innerHeight * totalUnits}`,
          pin: pin,
          scrub: 0.85,
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
            if (next < 0 && unit >= (captionWindows.at(-1)?.start ?? Infinity)) {
              next = captionWindows.at(-1)?.index ?? -1;
            }
            setActive(next);
            setCaptionVisible(next >= 0);
          },
        },
      });

      /**
       * Overlapping crossfade (≥40% dual-visible window).
       * Incoming: scale(.94) → 1, y(12vh) → 0, opacity 0 → 1
       * Outgoing: holds at opacity .35–.55 through the middle, then exits.
       * Only transform / opacity.
       */
      const transitionCrossfade = (
        outgoing: HTMLElement | null,
        incoming: HTMLElement,
        typeEl: HTMLElement | null,
        at: number,
        dur: number,
      ) => {
        if (outgoing) tl.set(outgoing, { zIndex: 10 }, at);
        if (typeEl) tl.set(typeEl, { zIndex: 25 }, at);
        tl.set(incoming, { zIndex: 30 }, at);

        // Giant chapter type / numeral rises mid-stack (z3 band)
        if (typeEl) {
          tl.fromTo(
            typeEl,
            { autoAlpha: 0, y: "10vh", scale: 0.96 },
            { autoAlpha: 1, y: 0, scale: 1, duration: dur * 0.35 },
            at,
          );
          tl.to(
            typeEl,
            { autoAlpha: 0, y: "-6vh", duration: dur * 0.28 },
            at + dur * 0.62,
          );
        }

        // Incoming starts immediately — full transition overlaps with outgoing
        tl.fromTo(
          incoming,
          { y: "12vh", scale: 0.94, autoAlpha: 0 },
          { y: 0, scale: 1, autoAlpha: 1, duration: dur * 0.62 },
          at,
        );

        // Outgoing dimmed but still readable through ≥40% of segment
        if (outgoing) {
          tl.to(
            outgoing,
            { autoAlpha: 0.5, scale: 1.02, y: "-2vh", duration: dur * 0.4 },
            at,
          );
          tl.to(
            outgoing,
            { autoAlpha: 0.38, scale: 1.03, y: "-4vh", duration: dur * 0.22 },
            at + dur * 0.4,
          );
          tl.to(
            outgoing,
            { autoAlpha: 0, scale: 1.04, y: "-6vh", duration: dur * 0.28 },
            at + dur * 0.62,
          );
        }
      };

      let t = 0;

      // Hero hold — three-rate parallax: type 6vw, image ~1.5vw, caption fixed
      if (heroType) {
        tl.to(heroType, { x: "-6vw", y: "-4vh", duration: heroHold }, t);
      }
      if (heroFrog) {
        tl.to(heroFrog, { y: "-1.5vh", scale: 1.02, duration: heroHold }, t);
      }
      t += heroHold;

      // Hero → Act1
      transitionCrossfade(hero, acts[0], typeOverlays[0] ?? null, t, transition);
      captionWindows.push({
        index: 0,
        start: t + transition * 0.32,
        end: Infinity,
      });
      t += transition;

      for (let i = 0; i < acts.length; i++) {
        const hold = i === acts.length - 1 ? act5Hold : actHold;
        const bd = backdrops[i];
        const frame = acts[i].querySelector<HTMLElement>("[data-plate-frame]");

        // Hold: backdrop drifts 4–8vw, framed image barely moves 0–2vw
        if (bd) tl.to(bd, { x: i % 2 === 0 ? "6vw" : "-5vw", duration: hold }, t);
        if (frame) tl.to(frame, { y: "-1vh", scale: 1.01, duration: hold }, t);
        else tl.to(acts[i], { scale: 1.01, duration: hold }, t);
        t += hold;

        if (i < acts.length - 1) {
          const raw = typeOverlays[i + 1] ?? null;
          const typeEl =
            raw && !raw.classList.contains("candy-type-overlay--empty")
              ? raw
              : null;
          // close previous caption window at next chapter reveal
          const prev = captionWindows.at(-1);
          if (prev) prev.end = t + transition * 0.32;
          transitionCrossfade(acts[i], acts[i + 1], typeEl, t, transition);
          captionWindows.push({
            index: i + 1,
            start: t + transition * 0.32,
            end: Infinity,
          });
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
              <div className="candy-reduced__backdrop" aria-hidden="true">
                <span className="candy-reduced__num">{a.chapter}</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.image}
                alt={a.aria}
                className="candy-reduced__img"
                style={{
                  objectPosition: a.objectPosition,
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
          {STORY_ACTS.map((a, i) => {
            const tone = i % 2 === 0 ? "acid" : "pink";
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
                {/* Behind framed image — giant chapter numeral + chinese echo */}
                <div
                  className="candy-plate__backdrop"
                  data-plate-backdrop
                  aria-hidden="true"
                >
                  <span className="candy-plate__num">{a.chapter}</span>
                  <span className="candy-plate__echo">{a.pillLabel}</span>
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

          {STORY_ACTS.map((a, i) =>
            a.enterType ? (
              <div
                key={`type-${a.id}`}
                className={`candy-type-overlay candy-type-overlay--${i % 2 === 0 ? "acid" : "pink"}`}
                data-type-overlay
                data-type-for={a.id}
                aria-hidden="true"
              >
                <div className="candy-type-overlay__stack">
                  <span className="candy-type-overlay__echo" aria-hidden="true">
                    {a.enterType}
                  </span>
                  <span className="candy-type-overlay__text">{a.enterType}</span>
                </div>
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
