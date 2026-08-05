"use client";

import { motion } from "framer-motion";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#050706] px-6 py-20 text-center md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9 }}
        className="relative"
      >
        <p className="text-sm tracking-[0.35em] text-[#9ccc8a]">FURMOSA 匠寵</p>
        <p className="mt-5 text-2xl font-bold leading-tight text-[#e8ffe0] md:text-4xl">
          青蛙從來沒嚇到狗。
          <br />
          <span className="text-[#FF38C7]">牠嚇到的，是你。</span>
        </p>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-[#9ccc8a]">
          嗷嗚計畫｜青蛙誰在怕
        </p>
        <a
          href="https://www.instagram.com/furmosa_food/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block text-sm tracking-[0.25em] text-[#B8FF32] underline decoration-[#B8FF32]/40 underline-offset-8"
        >
          @furmosa_food
        </a>
      </motion.div>
    </footer>
  );
}
