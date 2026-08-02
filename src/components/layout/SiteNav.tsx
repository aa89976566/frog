"use client";

import { motion } from "framer-motion";

const links = [
  { href: "#whispers", label: "傳聞" },
  { href: "#gaze", label: "遠望" },
  { href: "#hunt", label: "草叢" },
  { href: "#mission", label: "任務" },
];

export function SiteNav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-forest-night/55 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-4">
        <a href="#top" className="group flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-frog-skin text-[11px] font-bold text-forest-night">
            蛙
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-sm tracking-[0.18em] text-cream-ink md:text-base">
              FURMOSA{" "}
              <span className="font-body tracking-normal">匠寵</span>
            </span>
            <span className="block truncate text-[11px] tracking-[0.12em] text-fog-type md:text-xs md:tracking-[0.18em]">
              嗷嗚計畫｜青蛙誰在怕
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-display text-xs tracking-[0.22em] text-fog-type transition-colors hover:text-dog-amber"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#mission"
          className="font-display text-xs tracking-[0.18em] text-dog-amber transition-opacity hover:opacity-80 md:text-sm"
        >
          開始找蛙
        </a>
      </nav>
    </motion.header>
  );
}
