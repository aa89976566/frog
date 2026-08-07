"use client";

import { motion, useReducedMotion } from "framer-motion";

const links = [
  { href: "#story", label: "故事", short: "故事" },
  { href: "#act-03", label: "狗", short: "狗" },
  { href: "#close", label: "嗷嗚", short: "嗷" },
];

/** Centered dark capsule — Lil Frogeth interaction language, Furmosa brand */
export function SiteNav() {
  const reduced = useReducedMotion();

  return (
    <motion.header
      initial={reduced ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: reduced ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: reduced ? 0 : 0.1,
      }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[50]"
    >
      <div className="pointer-events-auto mx-auto mt-2 flex justify-center px-3 md:mt-4">
        <nav aria-label="主要導覽" className="candy-nav">
          <a href="#top" className="candy-nav__brand">
            <span className="candy-nav__mark" aria-hidden="true">
              蛙
            </span>
            <span className="candy-nav__name">嗷嗚計畫</span>
          </a>

          {links.map((l) => (
            <a key={l.href} href={l.href} className="candy-nav__link">
              <span className="candy-nav__link-full">{l.label}</span>
              <span className="candy-nav__link-short">{l.short}</span>
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
