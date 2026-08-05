"use client";

import { motion, useReducedMotion } from "framer-motion";

const links = [
  { href: "#story", label: "故事" },
  { href: "#act-03", label: "狗" },
  { href: "#close", label: "嗷嗚" },
];

function RollLink({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group relative inline-flex overflow-hidden text-[11px] font-medium tracking-[0.16em] text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5e14a] ${className}`}
    >
      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
        {label}
      </span>
      <span
        className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
        aria-hidden="true"
      >
        {label}
      </span>
    </a>
  );
}

/** Capsule floating navigation — lilfrogeth density, original branding */
export function SiteNav() {
  const reduced = useReducedMotion();

  return (
    <motion.header
      initial={reduced ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: reduced ? 0 : 0.75,
        ease: [0.22, 1, 0.36, 1],
        delay: reduced ? 0 : 0.55,
      }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <div className="pointer-events-auto mx-auto mt-3 flex max-w-[min(100%,42rem)] items-center justify-between gap-3 px-3 md:mt-5 md:px-4">
        <nav
          aria-label="主要導覽"
          className="flex w-full items-center justify-between gap-3 rounded-full border border-white/15 bg-black/45 px-3 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-md md:px-5 md:py-2.5"
        >
          <a
            href="#top"
            className="flex min-w-0 items-center gap-2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5e14a]"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#b6ff3c] text-[10px] font-black text-[#1a0a2e] transition-transform duration-300 hover:scale-105 md:h-8 md:w-8 md:text-[11px]">
              蛙
            </span>
            <span className="truncate text-xs font-bold tracking-[0.14em] text-white md:text-sm">
              嗷嗚計畫
            </span>
          </a>

          <ul className="hidden items-center gap-5 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <RollLink href={l.href} label={l.label} />
              </li>
            ))}
          </ul>

          <a
            href="#story"
            className="group relative shrink-0 overflow-hidden rounded-full bg-[#ff4db8] px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5e14a] active:scale-[0.97] md:text-[11px]"
          >
            <span className="relative z-10">開始</span>
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
