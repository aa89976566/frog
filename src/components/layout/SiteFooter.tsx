"use client";

import { motion } from "framer-motion";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink-soft px-6 py-24 text-center md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(111,143,87,0.18) 0%, transparent 50%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <p className="text-sm tracking-[0.35em] text-fog-dim">FURMOSA 匠寵</p>
        <p className="mt-6 text-3xl font-bold leading-tight text-fog md:text-5xl">
          青蛙從來沒嚇到狗。
          <br />
          <span className="text-owner">牠嚇到的，是你。</span>
        </p>
        <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-fog-dim">
          嗷嗚計畫｜青蛙誰在怕
          <br />
          寫給每一位曾經被牽繩拖著走的台灣飼主。
        </p>
        <a
          href="https://www.instagram.com/furmosa_food/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block text-sm tracking-[0.25em] text-moss underline decoration-moss/40 underline-offset-8"
        >
          @furmosa_food
        </a>
      </motion.div>
    </footer>
  );
}
