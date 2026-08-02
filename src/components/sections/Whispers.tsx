"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LINES = ["Some bark.", "Some run.", "Some never came back."];

function GrassBackdrop() {
  const blades = Array.from({ length: 42 }, (_, i) => i);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(19,43,30,0.55) 35%, #132b1e 100%)",
        }}
      />
      <svg
        className="absolute bottom-0 h-full w-[140%] -translate-x-[12%]"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
      >
        {blades.map((i) => {
          const x = 10 + i * 28;
          const h = 140 + ((i * 37) % 160);
          const delay = (i % 7) * 0.35;
          const green = i % 3 === 0 ? "#2d5a3d" : i % 3 === 1 ? "#3f7a52" : "#244a33";
          return (
            <path
              key={i}
              className="grass-blade"
              d={`M${x} 400 Q${x + 8} ${400 - h / 2} ${x + (i % 2 === 0 ? 14 : -8)} ${400 - h}`}
              stroke={green}
              strokeWidth={10 + (i % 4)}
              strokeLinecap="round"
              fill="none"
              style={{ animationDelay: `${delay}s` }}
            />
          );
        })}
      </svg>
    </div>
  );
}

export function Whispers() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useGSAP(
    () => {
      const lines = lineRefs.current.filter(Boolean);
      if (!sectionRef.current || lines.length === 0) return;

      gsap.set(lines, { opacity: 0, y: 48 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
        },
      });

      lines.forEach((line, i) => {
        tl.to(
          line,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          i * 0.85,
        );
      });

      tl.to({}, { duration: 0.6 });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="whispers"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-forest-night"
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #1e4a30 0%, transparent 60%)",
        }}
      />

      <GrassBackdrop />

      <div className="relative z-10 px-6 text-center">
        <p className="mb-10 font-display text-xs tracking-[0.4em] text-mist">
          有人說有青蛙。沒有人拿出證據。
        </p>
        <div className="flex flex-col gap-6 md:gap-8">
          {LINES.map((line, i) => (
            <p
              key={line}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className="font-display text-4xl text-cream-ink md:text-6xl lg:text-7xl"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
