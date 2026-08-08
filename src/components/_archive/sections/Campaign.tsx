"use client";

import { motion } from "framer-motion";

const MISSIONS = [
  { n: "①", title: "帶狗出去散步" },
  { n: "②", title: "嘗試牠沒吃過的新體驗" },
  { n: "③", title: "分享你們的反應" },
  { n: "④", title: "一起把每天散步變成冒險" },
];

export function Campaign() {
  return (
    <section
      id="campaign"
      className="poster relative flex items-center justify-center overflow-hidden bg-ink-soft"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 80%, rgba(226,179,74,0.08) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 20%, rgba(111,143,87,0.1) 0%, transparent 45%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-28 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] tracking-[0.4em] text-dog-gold"
        >
          INVITATION
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-4 text-5xl font-black tracking-[0.08em] text-fog md:text-7xl"
        >
          嗷嗚計畫
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-fog-dim md:text-xl"
        >
          不是每隻狗都會追青蛙。
          <br />
          但每隻狗，
          <br />
          都值得和主人一起探索新的事物。
        </motion.p>

        <ul className="mt-16 grid gap-0 sm:grid-cols-2">
          {MISSIONS.map((m, i) => (
            <motion.li
              key={m.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="border-t border-fog/10 py-7 pr-6"
            >
              <span className="text-moss">{m.n}</span>
              <p className="mt-2 text-xl font-bold text-fog md:text-2xl">
                {m.title}
              </p>
            </motion.li>
          ))}
        </ul>

        <motion.a
          href="https://www.instagram.com/furmosa_food/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-14 inline-flex bg-fog px-10 py-4 text-sm font-bold tracking-[0.22em] text-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          加入嗷嗚計畫
        </motion.a>
      </div>
    </section>
  );
}
