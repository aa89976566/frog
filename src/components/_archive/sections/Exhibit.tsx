"use client";

import { motion } from "framer-motion";
import { VacuumPack } from "@/components/_archive/ui/VacuumPack";

export function Exhibit() {
  return (
    <section
      id="exhibit"
      className="poster relative flex items-center justify-center overflow-hidden bg-ink"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 45%, #1c1c18 0%, transparent 70%),
            linear-gradient(180deg, #0e0e0c 0%, #141410 100%)
          `,
        }}
      />

      {/* Museum spot light */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[70%] w-[70%] -translate-x-1/2 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(235,230,220,0.18) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-28 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <div className="relative">
            <VacuumPack revealed className="h-[380px] w-[280px] md:h-[460px] md:w-[340px]" />
            {/* Pedestal */}
            <div
              className="mx-auto mt-2 h-3 w-[70%] rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(235,230,220,0.25), transparent 70%)",
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="max-w-md"
        >
          <p className="font-display text-xs tracking-[0.4em] text-fog-dim">
            EXHIBIT F-001
          </p>
          <h2 className="mt-5 text-3xl font-bold leading-snug text-fog md:text-4xl">
            很多主人不敢摸。
            <br />
            很多狗等不及。
          </h2>

          <div className="mt-10 space-y-5 border-t border-fog/15 pt-8 font-serif text-base leading-relaxed text-fog-dim">
            <p>
              <span className="block text-[11px] tracking-[0.25em] text-fog/50">
                狀態
              </span>
              已完全脫水。
            </p>
            <p>
              <span className="block text-[11px] tracking-[0.25em] text-fog/50">
                危險程度
              </span>
              <span className="mt-1 block text-fog">
                主人 <span className="text-owner">★★★★★</span>
              </span>
              <span className="mt-1 block text-fog">
                狗 <span className="text-dog-gold">❤️❤️❤️❤️❤️</span>
              </span>
            </p>
          </div>

          <p className="mt-12 text-xs tracking-[0.18em] text-fog/40">
            內容物沒有意見。
            <br />
            主人比較多。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
