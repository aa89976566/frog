"use client";

import { motion } from "framer-motion";

const links = [
  { href: "#afraid", label: "誰在怕" },
  { href: "#test", label: "心理測驗" },
  { href: "#exhibit", label: "展品" },
  { href: "#campaign", label: "嗷嗚計畫" },
];

export function SiteNav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/50 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        <a href="#top" className="min-w-0">
          <span className="block font-display text-sm font-bold tracking-[0.2em] text-fog md:text-base">
            FURMOSA <span className="font-body font-bold tracking-normal">匠寵</span>
          </span>
          <span className="block truncate text-[11px] tracking-[0.16em] text-fog-dim">
            嗷嗚計畫｜青蛙誰在怕
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs tracking-[0.18em] text-fog-dim transition-colors hover:text-fog"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#campaign"
          className="shrink-0 text-xs tracking-[0.16em] text-dog-gold transition-opacity hover:opacity-80 md:text-sm"
        >
          加入計畫
        </a>
      </nav>
    </motion.header>
  );
}
