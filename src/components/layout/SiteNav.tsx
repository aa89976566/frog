"use client";

import { motion } from "framer-motion";

const links = [
  { href: "#afraid", label: "計畫介紹" },
  { href: "#test", label: "參與方式" },
  { href: "#campaign", label: "探索更多" },
];

export function SiteNav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#6f8f57] text-[11px] font-bold text-white">
            蛙
          </span>
          <span className="truncate text-sm font-bold tracking-[0.12em] text-white md:text-base">
            嗨嗨計畫
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs font-medium tracking-[0.14em] text-white/80 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#campaign"
          className="shrink-0 rounded-full bg-black/70 px-4 py-2 text-[11px] tracking-[0.16em] text-white transition-opacity hover:opacity-80 md:text-xs"
        >
          匠寵
        </a>
      </nav>
    </motion.header>
  );
}
