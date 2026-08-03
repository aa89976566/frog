"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FrogMascot } from "@/components/mascot/FrogMascot";

const WALL = Array.from({ length: 8 }, () => "青蛙誰在怕");

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const frogY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="poster relative flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 100%, #1a2416 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 20% 20%, #1c1c18 0%, transparent 50%),
            linear-gradient(180deg, #121210 0%, #0e0e0c 100%)
          `,
        }}
      />

      <motion.div
        style={{ y: typeY, opacity: fade }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="flex w-[130%] flex-col leading-[0.86]">
          {WALL.map((line, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-center text-[13vw] font-black text-fog/[0.06] md:text-[9.5vw]"
              style={{
                transform: i % 2 === 0 ? "translateX(-4%)" : "translateX(4%)",
              }}
            >
              {line}　{line}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        style={{ y: frogY, opacity: fade }}
        className="relative z-10 flex max-w-3xl flex-col items-center px-6 pt-20 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-[11px] tracking-[0.4em] text-fog-dim md:text-xs"
        >
          FURMOSA 匠寵 · 嗷嗚計畫
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <FrogMascot size={300} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="mt-2 space-y-1 text-2xl font-bold leading-snug text-fog md:text-4xl"
        >
          <p>看到青蛙，</p>
          <p>
            你往後退。<span className="text-owner"> </span>
          </p>
          <p className="text-dog-gold">牠往前衝。</p>
        </motion.div>

        <motion.a
          href="#afraid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.8 }}
          className="mt-10 inline-flex items-center gap-3 border border-fog/25 px-8 py-3.5 text-xs tracking-[0.3em] text-fog transition-colors hover:border-fog/60 hover:bg-fog/5"
        >
          繼續往下
        </motion.a>
      </motion.div>
    </section>
  );
}
