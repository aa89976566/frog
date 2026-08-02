"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FrogMascot } from "@/components/mascot/FrogMascot";

const WALL = [
  "WHO'S AFRAID",
  "OF THE FROG?",
  "WHO'S AFRAID",
  "OF THE FROG?",
  "WHO'S AFRAID",
  "OF THE FROG?",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const frogY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 110%, #1e4a30 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 12% 18%, #244a33 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 88% 28%, #1a3d28 0%, transparent 45%),
            linear-gradient(180deg, #0f2418 0%, #0a1a12 42%, #132b1e 100%)
          `,
        }}
      />

      {/* Oversized typography = the headline plane */}
      <motion.div
        style={{ y: typeY, opacity: fade }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="flex w-[150%] flex-col items-center leading-[0.84]">
          {WALL.map((line, i) => (
            <span
              key={`${line}-${i}`}
              className="font-display w-full whitespace-nowrap text-center text-[14vw] font-black text-fog-type/[0.16] md:text-[11vw]"
              style={{
                transform: i % 2 === 0 ? "translateX(-3%)" : "translateX(3%)",
              }}
            >
              {line}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        style={{ y: frogY, opacity: fade }}
        className="relative z-10 flex w-full max-w-5xl flex-col items-center px-4 pt-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-2"
        >
          <p className="font-display text-[clamp(2.8rem,10vw,6.5rem)] leading-none tracking-[0.04em] text-cream-ink">
            嗷嗚計畫
          </p>
          <p className="mt-2 font-display text-sm tracking-[0.35em] text-dog-amber md:text-base">
            青蛙誰在怕 · FURMOSA 匠寵
          </p>
        </motion.div>

        <h1 className="sr-only">Who&apos;s Afraid of the Frog?</h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-4"
        >
          <FrogMascot
            className="relative z-10 mx-auto drop-shadow-[0_28px_48px_rgba(0,0,0,0.5)]"
            size={280}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.75 }}
          className="mt-4 max-w-md text-base leading-relaxed text-mist md:text-lg"
        >
          有人說有青蛙。沒有證據。每隻狗都在追。
        </motion.p>

        <motion.a
          href="#whispers"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-8 font-display text-xs tracking-[0.35em] text-fog-type transition-colors hover:text-dog-amber md:text-sm"
        >
          往下聽傳聞 ↓
        </motion.a>
      </motion.div>

      <div className="torn-edge z-20" aria-hidden="true" />
    </section>
  );
}
