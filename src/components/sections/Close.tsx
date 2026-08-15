"use client";

import { motion } from "framer-motion";

/** Closing beat — black void + acid type echo, Furmosa brand */
export function Close() {
  return (
    <section
      id="close"
      className="relative flex min-h-[70svh] items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #050505 0%, #0a0a0a 48%, #111111 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse at 50% 20%, rgba(239,244,118,0.12) 0%, transparent 42%),
            radial-gradient(ellipse at 80% 70%, rgba(255,59,191,0.14) 0%, transparent 42%),
            radial-gradient(ellipse at 18% 75%, rgba(82,255,32,0.1) 0%, transparent 40%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(#eff476 0.7px, transparent 0.8px)",
          backgroundSize: "3px 3px",
          mixBlendMode: "soft-light",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-[18%] select-none overflow-hidden text-center font-black leading-none text-[#EFF476]/[0.16]"
        aria-hidden="true"
        style={{
          fontSize: "clamp(18vw, 22vw, 28vw)",
          fontFamily: "var(--font-display), Impact, sans-serif",
          letterSpacing: "-0.07em",
          lineHeight: 0.72,
        }}
      >
        嗷嗚
      </div>
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] font-bold tracking-[0.4em] text-[#EFF476]"
        >
          嗷嗚計畫 · 匠寵
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-5 text-4xl font-black tracking-[0.06em] text-white md:text-6xl"
        >
          青蛙誰在怕
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-[#f0f0f0] md:text-lg"
        >
          真正怕青蛙的，一直都是主人。
          <br />
          狗，只是想一起玩。
        </motion.p>
        <motion.a
          href="https://www.instagram.com/furmosa_food/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 inline-flex rounded-full border-[2px] border-[#EFF476]/40 bg-[#FF3BBF] px-10 py-4 text-sm font-bold tracking-[0.22em] text-[#050505] transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          跟著匠寵
        </motion.a>
      </div>
    </section>
  );
}
