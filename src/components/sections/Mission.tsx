"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Find a frog.",
    tw: "找到一隻青蛙。",
  },
  {
    n: "02",
    title: "Take a photo.",
    tw: "拍下你的狗與牠的距離。",
  },
  {
    n: "03",
    title: "Post it.",
    tw: "發佈到社群。",
  },
  {
    n: "04",
    title: "Tag @furmosa_food.",
    tw: "標記我們，讓興奮被看見。",
  },
];

export function Mission() {
  return (
    <section
      id="mission"
      className="relative overflow-hidden px-6 py-28 md:px-10 md:py-36"
      style={{
        background: `
          radial-gradient(ellipse at 80% 10%, rgba(240,180,41,0.12) 0%, transparent 40%),
          radial-gradient(ellipse at 10% 90%, rgba(107,174,74,0.15) 0%, transparent 45%),
          #0a1a12
        `,
      }}
    >
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-xs tracking-[0.45em] text-dog-amber"
        >
          Mission 01
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-cream-ink md:text-6xl lg:text-7xl"
        >
          Turn instinct
          <br />
          into a game.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-mist"
        >
          狗看見青蛙會興奮，是本能。別阻止——把這股衝勁變成社區遊戲。
        </motion.p>

        <ol className="mt-16 grid gap-0 md:grid-cols-2">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="border-t border-moss/50 py-8 md:px-6"
            >
              <span className="font-display text-sm tracking-[0.3em] text-frog-skin">
                {step.n}
              </span>
              <h3 className="mt-3 font-display text-3xl text-cream-ink md:text-4xl">
                {step.title}
              </h3>
              <p className="mt-2 text-mist">{step.tw}</p>
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-2xl border-l-2 border-dog-amber pl-6"
        >
          <p className="text-xl leading-relaxed text-cream-ink md:text-2xl">
            If your dog gets closer than ours,
            <br />
            we&apos;ll send you a surprise.
          </p>
          <p className="mt-3 text-mist">
            如果你的狗比我們更靠近青蛙——驚喜送到家。
          </p>
          <a
            href="https://www.instagram.com/furmosa_food/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 bg-dog-amber px-7 py-4 font-display text-sm tracking-[0.2em] text-forest-night transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            去 Instagram 挑戰
          </a>
        </motion.div>
      </div>
    </section>
  );
}
