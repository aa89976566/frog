"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_ACTS } from "@/lib/story";

gsap.registerPlugin(ScrollTrigger);

/**
 * Five-act scroll-driven story — one continuous pinned poster sequence.
 * Crossfades with opacity/scale/translate; act-specific motion overlays.
 */
export function FiveActStory() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
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
    if (!root || !pin) return;

    const panels = gsap.utils.toArray<HTMLElement>(
      pin.querySelectorAll("[data-act-panel]"),
    );
    const fxCrowd = pin.querySelectorAll<HTMLElement>("[data-fx-crowd]");
    const fxChase = pin.querySelectorAll<HTMLElement>("[data-fx-chase]");
    const shakeTarget = pin.querySelector<HTMLElement>("[data-shake-stage]");
    const caption = captionRef.current;

    if (reduced) {
      panels.forEach((p, i) => {
        gsap.set(p, {
          opacity: i === 0 ? 1 : 0,
          scale: 1,
          xPercent: 0,
          yPercent: 0,
        });
      });
      return;
    }

    // Initial: act 01 enters as zoom/crop from hero continuity
    gsap.set(panels[0], { opacity: 1, scale: 1.18, yPercent: 6 });
    panels.slice(1).forEach((p) => {
      gsap.set(p, { opacity: 0, scale: 1.06, yPercent: 4 });
    });
    gsap.set(fxCrowd, { xPercent: 0, opacity: 0.85 });
    gsap.set(fxChase, { xPercent: -8, opacity: 0 });

    const n = panels.length;
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: () => `+=${window.innerHeight * (n * 1.35)}`,
        pin: pin,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            n - 1,
            Math.floor(self.progress * n + 0.001),
          );
          setActive(idx);
        },
      },
    });

    // Segment length per act
    const seg = 1;

    // Act 01 settle from hero zoom
    tl.to(
      panels[0],
      { scale: 1, yPercent: 0, duration: seg * 0.55 },
      0,
    );

    // Act 01 → 02
    tl.to(
      panels[0],
      { opacity: 0, scale: 1.08, yPercent: -3, duration: seg * 0.45 },
      seg * 0.55,
    );
    tl.fromTo(
      panels[1],
      { opacity: 0, scale: 1.22, yPercent: 8 },
      { opacity: 1, scale: 1, yPercent: 0, duration: seg * 0.55 },
      seg * 0.55,
    );
    // Crowd scatter with scroll
    tl.fromTo(
      fxCrowd,
      { xPercent: 0, opacity: 0.9 },
      { xPercent: (i) => (i % 2 === 0 ? -28 : 32), opacity: 0.35, duration: seg },
      seg * 0.7,
    );

    // Act 02 → 03 quiet
    tl.to(
      panels[1],
      { opacity: 0, scale: 0.96, duration: seg * 0.4 },
      seg * 1.55,
    );
    tl.fromTo(
      panels[2],
      { opacity: 0, scale: 1.1, yPercent: 5 },
      { opacity: 1, scale: 1, yPercent: 0, duration: seg * 0.55 },
      seg * 1.55,
    );
    tl.to(fxCrowd, { opacity: 0, duration: 0.2 }, seg * 1.55);

    // Act 03 → 04 — clothes fall + breathe
    tl.to(
      panels[2],
      { opacity: 0, scale: 1.04, duration: seg * 0.4 },
      seg * 2.55,
    );
    tl.fromTo(
      panels[3],
      { opacity: 0, scale: 1.12 },
      { opacity: 1, scale: 1, duration: seg * 0.55 },
      seg * 2.55,
    );
    // Soft breathe on free frog panel
    tl.to(
      panels[3],
      { scale: 1.03, duration: seg * 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" },
      seg * 2.9,
    );

    // Act 04 → 05 chase
    tl.to(
      panels[3],
      { opacity: 0, xPercent: -6, duration: seg * 0.4 },
      seg * 3.55,
    );
    tl.fromTo(
      panels[4],
      { opacity: 0, scale: 1.15, xPercent: 10 },
      { opacity: 1, scale: 1, xPercent: 0, duration: seg * 0.5 },
      seg * 3.55,
    );
    tl.fromTo(
      fxChase,
      { xPercent: -18, opacity: 0 },
      { xPercent: 22, opacity: 0.55, duration: seg * 0.8 },
      seg * 3.7,
    );
    if (shakeTarget) {
      tl.to(
        shakeTarget,
        {
          x: 6,
          y: -4,
          duration: 0.06,
          yoyo: true,
          repeat: 14,
          ease: "power1.inOut",
        },
        seg * 3.85,
      );
      tl.to(shakeTarget, { x: 0, y: 0, duration: 0.1 }, seg * 4.4);
    }
    tl.to(
      panels[4],
      { xPercent: -4, scale: 1.04, duration: seg * 0.5 },
      seg * 4.2,
    );

    // Caption fade pulse on act change
    if (caption) {
      tl.to(
        caption,
        { opacity: 0.35, duration: 0.12, yoyo: true, repeat: 1 },
        seg * 0.55,
      );
      tl.to(
        caption,
        { opacity: 0.35, duration: 0.12, yoyo: true, repeat: 1 },
        seg * 1.55,
      );
      tl.to(
        caption,
        { opacity: 0.35, duration: 0.12, yoyo: true, repeat: 1 },
        seg * 2.55,
      );
      tl.to(
        caption,
        { opacity: 0.35, duration: 0.12, yoyo: true, repeat: 1 },
        seg * 3.55,
      );
    }

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reduced]);

  // Reduced-motion: simple section stack with clickable chapters
  if (reduced) {
    return (
      <section id="story" className="bg-[#12061c]" aria-label="五幕故事">
        {STORY_ACTS.map((act) => (
          <article
            key={act.id}
            id={act.id}
            className="relative flex min-h-[100svh] flex-col justify-end"
            aria-label={act.aria}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={act.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative z-10 bg-gradient-to-t from-black/80 to-transparent px-5 pb-10 pt-24">
              <p className="text-[11px] tracking-[0.35em] text-[#f5e14a]">
                {act.chapter}
              </p>
              {act.lines.map((line) => (
                <p
                  key={line}
                  className="mt-2 text-xl font-bold leading-snug text-[#f5e14a] md:text-2xl"
                >
                  {line}
                </p>
              ))}
            </div>
          </article>
        ))}
      </section>
    );
  }

  const current = STORY_ACTS[active] ?? STORY_ACTS[0];

  return (
    <section
      ref={rootRef}
      id="story"
      className="relative bg-[#12061c]"
      aria-label="五幕故事"
    >
      <div
        ref={pinRef}
        className="relative h-[100svh] w-full overflow-hidden"
        data-shake-stage
      >
        {/* Continuity veil from Hero */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#2a0f45]/40 via-transparent to-transparent"
          aria-hidden="true"
        />

        {STORY_ACTS.map((act, i) => (
          <div
            key={act.id}
            data-act-panel
            id={act.id}
            className="absolute inset-0 will-change-transform"
            style={{ zIndex: 2 + i }}
            aria-hidden={active !== i}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={act.image}
              alt=""
              className="h-full w-full object-cover object-center"
              draggable={false}
            />
            {/* Act 02 crowd push overlays */}
            {i === 1 && (
              <>
                <div
                  data-fx-crowd
                  className="pointer-events-none absolute inset-y-[12%] left-0 w-[18%] bg-gradient-to-r from-[#ff4db8]/35 to-transparent blur-md"
                  aria-hidden="true"
                />
                <div
                  data-fx-crowd
                  className="pointer-events-none absolute inset-y-[18%] right-0 w-[20%] bg-gradient-to-l from-[#c084fc]/35 to-transparent blur-md"
                  aria-hidden="true"
                />
              </>
            )}
            {/* Act 05 speed lines */}
            {i === 4 && (
              <div
                data-fx-chase
                className="pointer-events-none absolute inset-0 opacity-0"
                aria-hidden="true"
                style={{
                  background:
                    "repeating-linear-gradient(95deg, transparent 0 14px, rgba(255,225,80,0.12) 14px 16px, transparent 16px 30px)",
                  mixBlendMode: "screen",
                }}
              />
            )}
          </div>
        ))}

        {/* Dry-brush bottom mask */}
        <div className="story-drybrush pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[22%]" aria-hidden="true" />

        {/* Live region for screen readers */}
        <p className="sr-only" aria-live="polite">
          {current.aria}. {current.lines.join(" ")}
        </p>

        {/* Caption bar — HTML only */}
        <div
          ref={captionRef}
          className="story-caption absolute inset-x-0 bottom-0 z-30 px-4 pb-5 pt-3 md:px-8 md:pb-7"
        >
          <div className="mx-auto flex max-w-5xl items-end gap-4">
            <span className="shrink-0 font-display text-sm font-extrabold tracking-[0.28em] text-[#f5e14a]">
              {current.chapter}
            </span>
            <div className="min-w-0">
              {current.lines.map((line) => (
                <p
                  key={line}
                  className="text-[clamp(1.05rem,2.8vw,1.65rem)] font-bold leading-snug tracking-wide text-[#f5e14a]"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
          {/* Progress dots */}
          <ol className="mx-auto mt-3 flex max-w-5xl gap-1.5" aria-hidden="true">
            {STORY_ACTS.map((act, i) => (
              <li
                key={act.id}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i === active ? "bg-[#f5e14a]" : "bg-white/20"
                }`}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
