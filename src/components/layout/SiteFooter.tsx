"use client";

import { motion } from "framer-motion";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-soil px-6 py-28 text-center md:py-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #3f7a52 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <p className="font-display text-5xl leading-none text-cream-ink md:text-7xl lg:text-8xl">
          Good luck.
        </p>
        <p className="mt-5 font-display text-2xl text-dog-amber md:text-4xl">
          Your dog will need it.
        </p>
        <p className="mx-auto mt-10 max-w-md text-sm leading-relaxed text-mist">
          Furmosa 匠寵｜嗷嗚計畫｜青蛙誰在怕
          <br />
          別阻止牠們興奮。把本能變成遊戲。
        </p>
        <a
          href="https://www.instagram.com/furmosa_food/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block font-display text-sm tracking-[0.25em] text-fog-type underline decoration-frog-skin underline-offset-8 transition-colors hover:text-cream-ink"
        >
          @furmosa_food
        </a>
      </motion.div>
    </footer>
  );
}
