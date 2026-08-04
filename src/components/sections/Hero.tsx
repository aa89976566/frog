"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Hero — immersive editorial poster
 *
 * Asset: single flattened JPEG (no transparent layers / sequence).
 * Depth is built with typography, texture, masks, and controlled transforms —
 * never fake cutouts of objects inside the artwork.
 *
 * Motion language inspired by lilfrogeth.com (composition only; no copied assets).
 */

const HERO_SRC = "/assets/hero/hero-main.webp";
const HERO_FALLBACK = "/assets/hero/hero-main.jpg";

const TYPE_LINES = ["嗨嗨計畫", "青蛙誰在怕", "嗨嗨計畫", "青蛙誰在怕"] as const;

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const [imgSrc, setImgSrc] = useState(HERO_SRC);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 48, damping: 18, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 48, damping: 18, mass: 0.4 });

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });

  /* Scroll-driven layer speeds — native scroll, mapped transforms only */
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", "-32%"]);
  const typeOpacity = useTransform(scrollYProgress, [0, 0.55, 0.85], [1, 0.55, 0]);
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 0.4, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.55], ["0%", "40%"]);
  const maskRise = useTransform(scrollYProgress, [0.35, 0.95], ["100%", "0%"]);
  const stageFade = useTransform(scrollYProgress, [0.7, 1], [1, 0.15]);

  /* Pointer depth — different intensities per layer */
  const bgShiftX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const typeShiftX = useTransform(springX, [-0.5, 0.5], [28, -28]);
  const typeShiftY = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const artShiftX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const artShiftY = useTransform(springY, [-0.5, 0.5], [-8, 8]);
  const fgShiftX = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const fgShiftY = useTransform(springY, [-0.5, 0.5], [-4, 4]);

  const artTransform = useMotionTemplate`translate3d(${artShiftX}px, calc(${artY} + ${artShiftY}px), 0) scale(${artScale})`;

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || !finePointer) {
      mouseX.set(0);
      mouseY.set(0);
      return;
    }

    let raf = 0;
    let latestX = 0;
    let latestY = 0;
    let dirty = false;

    const flush = () => {
      raf = 0;
      if (!dirty) return;
      dirty = false;
      mouseX.set(latestX);
      mouseY.set(latestY);
    };

    const onMove = (e: PointerEvent) => {
      latestX = e.clientX / window.innerWidth - 0.5;
      latestY = e.clientY / window.innerHeight - 0.5;
      dirty = true;
      if (!raf) raf = requestAnimationFrame(flush);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [finePointer, reduced, mouseX, mouseY]);

  const instant = reduced
    ? { duration: 0 }
    : { duration: 1.05, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      id="top"
      ref={rootRef}
      className="hero-stage relative h-[175svh]"
      aria-label="嗨嗨計畫主視覺"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* 1. Atmospheric field derived from artwork palette */}
        <motion.div
          className="absolute inset-0"
          style={
            reduced
              ? undefined
              : { y: bgY, scale: bgScale, x: bgShiftX, opacity: stageFade }
          }
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.55 }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 85% 55% at 16% 24%, #d14aa8 0%, transparent 58%),
                radial-gradient(ellipse 70% 48% at 86% 14%, #6e2fc0 0%, transparent 52%),
                radial-gradient(ellipse 95% 70% at 48% 96%, #1f0a3d 0%, transparent 58%),
                linear-gradient(158deg, #4c1680 0%, #160820 42%, #3a0f52 100%)
              `,
            }}
          />
          <div
            className="hero-cloud absolute inset-0 opacity-50 mix-blend-screen"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 40%, rgba(255,120,200,0.4), transparent 30%),
                radial-gradient(circle at 70% 60%, rgba(150,70,255,0.34), transparent 34%),
                radial-gradient(circle at 50% 16%, rgba(255,190,90,0.14), transparent 26%)
              `,
            }}
          />
          <div className="hero-halftone absolute inset-0 opacity-[0.18] mix-blend-soft-light" />
        </motion.div>

        {/* 2. Oversized display typography behind artwork */}
        <motion.div
          className="pointer-events-none absolute inset-[-8%] z-[1] flex items-center justify-center overflow-hidden"
          style={
            reduced
              ? { opacity: typeOpacity }
              : {
                  x: typeShiftX,
                  y: typeShiftY,
                  opacity: typeOpacity,
                }
          }
          aria-hidden="true"
        >
          <motion.div
            style={reduced ? undefined : { y: typeY }}
            className="flex w-[140%] rotate-[-8deg] flex-col gap-[0.12em]"
          >
            {TYPE_LINES.map((line, i) => (
              <div key={`${line}-${i}`} className="overflow-hidden">
                <motion.p
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    ...instant,
                    delay: reduced ? 0 : 0.18 + i * 0.08,
                  }}
                  className={`hero-type-line whitespace-nowrap text-center font-black leading-[0.86] tracking-tight text-[#f5e14a]/[0.88] ${
                    i % 2 === 1 ? "hero-marquee-rev" : "hero-marquee"
                  }`}
                  style={{
                    fontSize: "clamp(3.4rem, 14vw, 9.5rem)",
                    textShadow: "0 2px 0 rgba(0,0,0,0.3)",
                    animationDuration: `${18 + (i % 3) * 4}s`,
                    animationDelay: `${i * -2.5}s`,
                  }}
                >
                  {`${line}　${line}　${line}　${line}　${line}　`}
                </motion.p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse 56% 64% at 50% 48%, transparent 8%, rgba(8,2,18,0.55) 100%)",
          }}
          aria-hidden="true"
        />

        {/* 3. Dominant artwork — intact flattened image */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center px-0 pt-16 md:pt-12"
          style={{ opacity: stageFade }}
        >
          <motion.div
            className="hero-art relative h-[min(72svh,680px)] w-full max-w-none md:h-[min(78svh,760px)]"
            initial={reduced ? false : { opacity: 0, scale: 0.94, y: 36 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              ...instant,
              delay: reduced ? 0 : 0.32,
            }}
          >
            <motion.div
              className="relative h-full w-full will-change-transform"
              style={reduced ? undefined : { transform: artTransform }}
            >
              <div
                className={`relative h-full w-full ${reduced ? "" : "hero-float"}`}
              >
                <Image
                  src={imgSrc}
                  alt="嗨嗨計畫主視覺：穿蛙裝的狗狗站在迷幻雲霧場景中，匠寵品牌標誌清晰可見"
                  fill
                  priority
                  sizes="100vw"
                  onError={() => setImgSrc(HERO_FALLBACK)}
                  className="hero-art-img object-contain drop-shadow-[0_36px_64px_rgba(0,0,0,0.55)]"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 4. Foreground brand + supporting copy + CTA */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-20 px-4 pb-[4.75rem] md:px-10 md:pb-24"
          style={
            reduced
              ? { opacity: copyOpacity }
              : { opacity: copyOpacity, y: copyY, x: fgShiftX }
          }
        >
          <div className="flex items-end justify-between gap-4">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...instant, delay: reduced ? 0 : 0.72 }}
              className="max-w-[14rem] md:max-w-xs"
              style={reduced ? undefined : { y: fgShiftY }}
            >
              <p className="text-[11px] leading-relaxed tracking-[0.18em] text-white/70 md:text-xs">
                真正怕青蛙的，一直都是主人。
              </p>
              <a
                href="#afraid"
                className="hero-cta group mt-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] tracking-[0.22em] text-white transition-[background-color,border-color,transform] duration-300 hover:border-white/50 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5e14a] active:scale-[0.98] md:text-xs"
              >
                <span className="relative overflow-hidden">
                  <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                    繼續探索
                  </span>
                  <span
                    className="absolute inset-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                    aria-hidden="true"
                  >
                    繼續探索
                  </span>
                </span>
                <span aria-hidden="true">↓</span>
              </a>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...instant, delay: reduced ? 0 : 0.58 }}
              className="text-right"
              style={reduced ? undefined : { y: fgShiftY }}
            >
              <h1 className="sr-only">嗨嗨計畫｜匠寵｜青蛙誰在怕</h1>
              <p
                className="font-black text-4xl leading-none tracking-wide md:text-6xl"
                style={{
                  color: "#ffd24a",
                  textShadow:
                    "0 0 18px rgba(255,80,180,0.55), 3px 3px 0 #1a0a2e, -1px -1px 0 #ff4db8",
                }}
                aria-hidden="true"
              >
                匠寵
              </p>
              <span className="mt-2 inline-block rounded-full bg-black/85 px-4 py-1.5 text-xs tracking-[0.2em] text-white md:text-sm">
                嗨嗨計畫
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* 5. Scroll mask — introduces next section without scroll lock */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[42%] bg-ink"
          style={{ y: maskRise }}
          aria-hidden="true"
        />

        <div className="hero-torn-edge z-30" aria-hidden="true" />
      </div>
    </section>
  );
}
