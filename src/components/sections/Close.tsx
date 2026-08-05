"use client";

import { motion } from "framer-motion";

/** Soft closing — bright candy, no ecommerce */
export function Close() {
  return (
    <section
      id="close"
      className="relative flex min-h-[70svh] items-center justify-center overflow-hidden bg-[#f7e9ff]"
    >
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(255,180,220,0.55) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(200,170,255,0.45) 0%, transparent 40%),
            linear-gradient(180deg, #ffe8f6 0%, #f7e9ff 100%)
          `,
        }}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] font-bold tracking-[0.4em] text-[#ff4db8]"
        >
          嗷嗚計畫
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-5 text-4xl font-black tracking-[0.06em] text-[#2a1840] md:text-6xl"
        >
          青蛙誰在怕
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-[#6b4f8a] md:text-lg"
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
          className="mt-12 inline-flex rounded-full bg-[#F3F597] px-10 py-4 text-sm font-bold tracking-[0.22em] text-[#2a1840] transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          跟著匠寵
        </motion.a>
      </div>
    </section>
  );
}
