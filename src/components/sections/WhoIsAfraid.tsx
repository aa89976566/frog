"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function WhoIsAfraid() {
  const sectionRef = useRef<HTMLElement>(null);
  const ownerRef = useRef<HTMLDivElement>(null);
  const dogRef = useRef<HTMLDivElement>(null);
  const leashRef = useRef<SVGPathElement>(null);
  const punchRef = useRef<HTMLParagraphElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(punchRef.current, { opacity: 1 });
        return;
      }

      gsap.set(punchRef.current, { opacity: 0, y: 30 });
      gsap.set([ownerRef.current, dogRef.current, panelsRef.current], { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
        },
      });

      tl.to(
        ownerRef.current,
        { xPercent: -28, y: 18, rotate: -4, duration: 2, ease: "none" },
        0,
      )
        .to(
          dogRef.current,
          { xPercent: 34, y: -8, rotate: 3, duration: 2, ease: "none" },
          0,
        )
        .to(
          leashRef.current,
          {
            attr: { d: "M120 180 C 220 120, 320 90, 480 70" },
            duration: 2,
            ease: "none",
          },
          0,
        )
        .to(
          ownerRef.current,
          { xPercent: -120, opacity: 0, duration: 1.2, ease: "power2.in" },
          2,
        )
        .to(
          dogRef.current,
          { xPercent: 130, opacity: 0, duration: 1.2, ease: "power2.in" },
          2,
        )
        .to(panelsRef.current, { opacity: 0, duration: 0.8 }, 2.2)
        .to(
          punchRef.current,
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          2.8,
        )
        .to({}, { duration: 0.8 });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="afraid"
      ref={sectionRef}
      className="poster relative overflow-hidden bg-ink"
    >
      <div className="absolute inset-0 flex flex-col justify-center">
        <p className="absolute left-0 right-0 top-24 z-20 text-center text-[11px] tracking-[0.4em] text-fog-dim md:top-28 md:text-xs">
          WHO IS ACTUALLY AFRAID?
        </p>

        <div ref={panelsRef} className="relative mx-auto grid w-full max-w-6xl grid-cols-2 gap-0 px-4 md:px-8">
          {/* Owner */}
          <div
            ref={ownerRef}
            className="relative flex flex-col items-center border-r border-fog/10 px-3 py-10 text-center md:px-10 md:py-16"
            style={{ willChange: "transform" }}
          >
            <p className="text-xs tracking-[0.35em] text-owner md:text-sm">主人</p>
            <p className="mt-6 text-sm text-fog-dim md:text-base">看到青蛙：</p>
            <p className="mt-4 text-5xl md:text-7xl" aria-hidden="true">
              😨
            </p>
            <p className="mt-6 text-xl font-bold text-owner md:text-3xl">
              不要碰！！
            </p>
            {/* Stick-figure owner */}
            <svg
              className="mt-10 h-28 w-20 text-fog/70 md:h-36 md:w-24"
              viewBox="0 0 80 120"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="40" cy="18" r="12" stroke="currentColor" strokeWidth="3" />
              <path d="M40 30 V70" stroke="currentColor" strokeWidth="3" />
              <path d="M40 42 L18 58" stroke="currentColor" strokeWidth="3" />
              <path d="M40 42 L62 50" stroke="currentColor" strokeWidth="3" />
              <path d="M40 70 L24 104" stroke="currentColor" strokeWidth="3" />
              <path d="M40 70 L56 104" stroke="currentColor" strokeWidth="3" />
              {/* Leash hand */}
              <circle cx="62" cy="50" r="3" fill="var(--dog-gold)" />
            </svg>
          </div>

          {/* Dog */}
          <div
            ref={dogRef}
            className="relative flex flex-col items-center px-3 py-10 text-center md:px-10 md:py-16"
            style={{ willChange: "transform" }}
          >
            <p className="text-xs tracking-[0.35em] text-dog-gold md:text-sm">狗</p>
            <p className="mt-6 text-sm text-fog-dim md:text-base">看到青蛙：</p>
            <p className="mt-4 text-5xl md:text-7xl" aria-hidden="true">
              👀
            </p>
            <p className="mt-6 text-xl font-bold text-dog-gold md:text-3xl">
              在哪？
            </p>
            <svg
              className="mt-10 h-28 w-28 text-fog/70 md:h-36 md:w-36"
              viewBox="0 0 120 100"
              fill="none"
              aria-hidden="true"
            >
              <ellipse cx="55" cy="58" rx="28" ry="18" stroke="currentColor" strokeWidth="3" />
              <circle cx="40" cy="38" r="14" stroke="currentColor" strokeWidth="3" />
              <path d="M30 28 L22 14" stroke="currentColor" strokeWidth="3" />
              <path d="M48 28 L54 12" stroke="currentColor" strokeWidth="3" />
              <circle cx="36" cy="36" r="2" fill="var(--dog-gold)" />
              <circle cx="44" cy="36" r="2" fill="var(--dog-gold)" />
              <path d="M82 55 Q105 40 112 28" stroke="currentColor" strokeWidth="3" />
              <path d="M40 76 V92" stroke="currentColor" strokeWidth="3" />
              <path d="M58 76 V92" stroke="currentColor" strokeWidth="3" />
              <circle cx="70" cy="52" r="3" fill="var(--dog-gold)" />
            </svg>
          </div>

          {/* Leash connecting panels */}
          <svg
            className="pointer-events-none absolute left-1/2 top-[58%] hidden h-24 w-[70%] -translate-x-1/2 md:block"
            viewBox="0 0 600 220"
            fill="none"
            aria-hidden="true"
          >
            <path
              ref={leashRef}
              d="M200 160 C 260 140, 340 120, 400 100"
              stroke="var(--dog-gold)"
              strokeWidth="2.5"
              strokeDasharray="6 5"
              opacity="0.7"
            />
          </svg>
        </div>

        <p
          ref={punchRef}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-6 text-center text-3xl font-bold leading-relaxed text-fog md:text-5xl lg:text-6xl"
        >
          真正怕青蛙的，
          <br />
          <span className="text-owner">一直都是主人。</span>
        </p>
      </div>
    </section>
  );
}
