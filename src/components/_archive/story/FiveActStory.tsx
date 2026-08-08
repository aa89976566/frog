"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_ACTS } from "@/lib/story";

gsap.registerPlugin(ScrollTrigger);

const GHOST_COUNT = 5;

type GhostKind = "none" | "scatter" | "breathe" | "chase";

const GHOST_KIND: GhostKind[] = ["none", "scatter", "none", "breathe", "chase"];

/**
 * Five-act full-bleed scroll story.
 * Locked JPEGs + onion-skin ghosts + psychedelic bloom (not horror).
 */
export function FiveActStory() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
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
    if (!root || !pin || reduced) return;

    const panels = gsap.utils.toArray<HTMLElement>(
      pin.querySelectorAll("[data-act-panel]"),
    );
    const shakeTarget = pin.querySelector<HTMLElement>("[data-shake-stage]");
    const caption = captionRef.current;
    const bloom = bloomRef.current;
    const n = panels.length;

    gsap.set(panels[0], { opacity: 1, scale: 1.12, yPercent: 4 });
    panels.slice(1).forEach((p) => gsap.set(p, { opacity: 0, scale: 1.05 }));

    panels.forEach((panel) => {
      const ghosts = panel.querySelectorAll<HTMLElement>("[data-ghost]");
      ghosts.forEach((g, i) => {
        gsap.set(g, {
          opacity: i === 0 ? 1 : 0.28,
          x: 0,
          y: 0,
          filter: "blur(0px) hue-rotate(0deg)",
        });
      });
    });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: () => `+=${window.innerHeight * (n * 1.45)}`,
        pin: pin,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setActive(Math.min(n - 1, Math.floor(self.progress * n + 0.001)));
        },
      },
    });

    const seg = 1;

    const flashBloom = (at: number) => {
      if (!bloom) return;
      tl.fromTo(
        bloom,
        { opacity: 0 },
        { opacity: 0.55, duration: 0.18, yoyo: true, repeat: 1 },
        at,
      );
    };

    const peelGhosts = (
      panel: HTMLElement,
      kind: GhostKind,
      at: number,
      dur = 0.9,
    ) => {
      if (kind === "none") return;
      const ghosts = panel.querySelectorAll<HTMLElement>("[data-ghost]");
      ghosts.forEach((g, i) => {
        if (i === 0) {
          tl.to(
            g,
            {
              x: kind === "chase" ? -22 : kind === "breathe" ? 0 : 6,
              y: kind === "breathe" ? -8 : 0,
              duration: dur,
            },
            at,
          );
          return;
        }
        const t = i / (GHOST_COUNT - 1);
        let x = 0;
        let y = 0;
        let hue = 0;
        if (kind === "scatter") {
          x = (i % 2 === 0 ? -1 : 1) * (36 + t * 110);
          y = (i % 3) * 10 - 10;
          hue = (i % 2 === 0 ? -1 : 1) * (18 + t * 40);
        } else if (kind === "breathe") {
          x = (i - GHOST_COUNT / 2) * 8;
          y = -t * 18;
          hue = t * 25;
        } else {
          x = -28 - t * 130;
          y = (i % 2) * 12 - 6;
          hue = -12 - t * 30;
        }
        tl.to(
          g,
          {
            x,
            y,
            opacity: 0.38 * (1 - t),
            filter: `blur(${t * 8}px) hue-rotate(${hue}deg)`,
            duration: dur,
          },
          at,
        );
        tl.to(g, { opacity: 0, duration: 0.3 }, at + dur * 0.75);
      });
    };

    // Act 01 settle
    tl.to(panels[0], { scale: 1, yPercent: 0, duration: seg * 0.5 }, 0);

    // 01 → 02 scatter
    flashBloom(seg * 0.52);
    tl.to(panels[0], { opacity: 0, scale: 1.06, duration: seg * 0.4 }, seg * 0.55);
    tl.fromTo(
      panels[1],
      { opacity: 0, scale: 1.16 },
      { opacity: 1, scale: 1, duration: seg * 0.5 },
      seg * 0.55,
    );
    peelGhosts(panels[1], "scatter", seg * 0.65, seg * 0.85);

    // 02 → 03 quiet dog
    flashBloom(seg * 1.55);
    tl.to(panels[1], { opacity: 0, scale: 0.97, duration: seg * 0.35 }, seg * 1.6);
    tl.fromTo(
      panels[2],
      { opacity: 0, scale: 1.08 },
      { opacity: 1, scale: 1, duration: seg * 0.5 },
      seg * 1.6,
    );

    // 03 → 04 breathe
    flashBloom(seg * 2.55);
    tl.to(panels[2], { opacity: 0, duration: seg * 0.35 }, seg * 2.6);
    tl.fromTo(
      panels[3],
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: seg * 0.5 },
      seg * 2.6,
    );
    peelGhosts(panels[3], "breathe", seg * 2.75, seg * 0.8);
    tl.to(
      panels[3],
      {
        scale: 1.028,
        duration: seg * 0.35,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
      },
      seg * 3.15,
    );

    // 04 → 05 chase
    flashBloom(seg * 3.6);
    tl.to(panels[3], { opacity: 0, xPercent: -5, duration: seg * 0.35 }, seg * 3.65);
    tl.fromTo(
      panels[4],
      { opacity: 0, scale: 1.12, xPercent: 8 },
      { opacity: 1, scale: 1, xPercent: 0, duration: seg * 0.45 },
      seg * 3.65,
    );
    peelGhosts(panels[4], "chase", seg * 3.8, seg * 0.9);
    if (shakeTarget) {
      tl.to(
        shakeTarget,
        {
          x: 5,
          y: -3,
          duration: 0.05,
          yoyo: true,
          repeat: 16,
          ease: "power1.inOut",
        },
        seg * 3.95,
      );
      tl.to(shakeTarget, { x: 0, y: 0, duration: 0.08 }, seg * 4.55);
    }

    if (caption) {
      [0.55, 1.6, 2.6, 3.65].forEach((t) => {
        tl.to(caption, { opacity: 0.45, duration: 0.1, yoyo: true, repeat: 1 }, t);
      });
    }

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section id="story" className="bg-[#12081c]" aria-label="五幕故事">
        {STORY_ACTS.map((act) => (
          <article
            key={act.id}
            id={act.id}
            className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
            aria-label={act.aria}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={act.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="relative z-10 bg-gradient-to-t from-[#12081c]/90 to-transparent px-5 pb-10 pt-24">
              <p className="story-caption-chapter">{act.chapter}</p>
              {act.lines.map((line) => (
                <p key={line} className="story-caption-line mt-2">
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
      className="relative bg-[#12081c]"
      aria-label="五幕故事"
    >
      <div
        ref={pinRef}
        className="relative h-[100svh] w-full overflow-hidden"
        data-shake-stage
      >
        {STORY_ACTS.map((act, i) => {
          const kind = GHOST_KIND[i];
          const layerCount = kind === "none" ? 1 : GHOST_COUNT;
          return (
            <div
              key={act.id}
              data-act-panel
              id={act.id}
              className="absolute inset-0 will-change-transform"
              style={{ zIndex: 2 + i }}
              aria-hidden={active !== i}
            >
              {Array.from({ length: layerCount }).map((_, gi) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={gi}
                  data-ghost
                  src={act.image}
                  alt=""
                  draggable={false}
                  decoding="async"
                  className="story-act-img absolute inset-0 h-full w-full object-cover object-center will-change-transform"
                  style={{
                    zIndex: layerCount - gi,
                    mixBlendMode: gi === 0 ? "normal" : "screen",
                  }}
                />
              ))}
            </div>
          );
        })}

        <div
          ref={bloomRef}
          className="story-bloom pointer-events-none absolute inset-0 z-[18] opacity-0"
          aria-hidden="true"
        />

        <div
          className="story-drybrush pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[18%]"
          aria-hidden="true"
        />

        <p className="sr-only" aria-live="polite">
          {current.aria}. {current.lines.join(" ")}
        </p>

        <div
          ref={captionRef}
          className="story-caption absolute inset-x-0 bottom-0 z-30 px-4 pb-5 pt-3 md:px-8 md:pb-7"
        >
          <div className="mx-auto max-w-5xl">
            <p className="story-caption-chapter">{current.chapter}</p>
            <div className="mt-1.5 min-w-0">
              {current.lines.map((line) => (
                <p key={line} className="story-caption-line">
                  {line}
                </p>
              ))}
            </div>
          </div>
          <ol className="mx-auto mt-3 flex max-w-5xl gap-1.5" aria-hidden="true">
            {STORY_ACTS.map((act, i) => (
              <li
                key={act.id}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i === active ? "bg-[#F3F597]" : "bg-white/20"
                }`}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
