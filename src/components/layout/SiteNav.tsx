"use client";

import { motion } from "framer-motion";

const links = [
  { href: "#afraid", label: "計畫介紹" },
  { href: "#test", label: "參與方式" },
  { href: "#campaign", label: "探索更多" },
];

/** Compact floating navigation — lilfrogeth-like density, original branding */
export function SiteNav() {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <div className="pointer-events-auto mx-auto mt-3 flex max-w-6xl items-center justify-between gap-3 px-3 md:mt-4 md:px-6">
        <nav className="flex w-full items-center justify-between gap-3 rounded-full border border-white/10 bg-black/35 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md md:px-5 md:py-2.5">
          <a href="#top" className="flex min-w-0 items-center gap-2">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#6f8f57] text-[10px] font-bold text-white md:h-8 md:w-8 md:text-[11px]">
              蛙
            </span>
            <span className="truncate text-xs font-bold tracking-[0.14em] text-white md:text-sm">
              嗨嗨計畫
            </span>
          </a>

          <ul className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[11px] font-medium tracking-[0.16em] text-white/75 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#campaign"
            className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-[10px] tracking-[0.16em] text-white transition-colors hover:bg-white/20 md:text-[11px]"
          >
            匠寵
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
