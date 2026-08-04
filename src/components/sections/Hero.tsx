"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Hero — immersive editorial poster
 *
 * Asset: single flattened JPEG/WebP (no transparent layers / sequence).
 * Depth = typography + texture + masks + controlled transforms.
 * Motion language inspired by lilfrogeth.com (composition only).
 */

const HERO_SRC = "/assets/hero/hero-main.webp";
const HERO_FALLBACK = "/assets/hero/hero-main.jpg";

const TYPE_LINES = ["嗨嗨計畫", "青蛙誰在怕", "嗨嗨計畫", "青蛙誰在怕"] as const;

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const canMotion = reducedMotion === false;
  const [finePointer, setFinePointer] = useState(false);
  const [imgSrc, setImgSrc] = useState(HERO_SRC);
  const [entered, setEntered] = useState(false);
  const [scrollLive, setScrollLive] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 48, damping: 18, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 48, damping: 18, mass: 0.4 });

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const typeOpacity = useTransform(scrollYProgress, [0, 0.55, 0.85], [1, 0.5, 0]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 0.35, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.55], [0, 48]);
  const maskY = useTransform(scrollYProgress, [0.35, 0.95], ["100%", "0%"]);
  const stageOpacity = useTransform(scrollYProgress, [0.72, 1], [1, 0.2]);

  const bgShiftX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const typeShiftX = useTransform(springX, [-0.5, 0.5], [24, -24]);
  const typeShiftY = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const artShiftX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const artShiftY = useTransform(springY, [-0.5, 0.5], [-7, 7]);
  const fgShiftX = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    /* Entrance via class — never leave critical art at opacity 0 via FM initial */
    const enterId = requestAnimationFrame(() => setEntered(true));
    const liveId = window.setTimeout(
      () => setScrollLive(true),
      canMotion ? 1100 : 0,
    );
    return () => {
      cancelAnimationFrame(enterId);
      window.clearTimeout(liveId);
    };
  }, [canMotion]);

  useEffect(() => {
    if (!canMotion || !finePointer) {
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
  }, [finePointer, canMotion, mouseX, mouseY]);

  const motionOn = scrollLive && canMotion;

  return (
    <section
      id="top"
      ref={rootRef}
      className={`hero-stage relative h-[175svh]${canMotion ? " can-motion" : ""}${entered ? " is-entered" : ""}`}
      aria-label="嗨嗨計畫主視覺"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* 1. Atmospheric field from artwork palette */}
        <motion.div
          className="hero-enter-bg absolute inset-0"
          style={
            motionOn
              ? { y: bgY, scale: bgScale, x: bgShiftX, opacity: stageOpacity }
              : undefined
          }
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
            motionOn
              ? { x: typeShiftX, y: typeShiftY, opacity: typeOpacity }
              : { opacity: typeOpacity }
          }
          aria-hidden="true"
        >
          <motion.div
            style={motionOn ? { y: typeY } : undefined}
            className="flex w-[140%] rotate-[-8deg] flex-col gap-[0.12em]"
          >
            {TYPE_LINES.map((line, i) => (
              <div key={`${line}-${i}`} className="overflow-hidden">
                <p
                  className={`hero-enter-type hero-type-line whitespace-nowrap text-center font-black leading-[0.86] tracking-tight text-[#f5e14a]/[0.88] ${
                    i % 2 === 1 ? "hero-marquee-rev" : "hero-marquee"
                  }`}
                  style={{
                    fontSize: "clamp(3.4rem, 14vw, 9.5rem)",
                    textShadow: "0 2px 0 rgba(0,0,0,0.3)",
                    animationDuration: `${18 + (i % 3) * 4}s`,
                    animationDelay: `${i * -2.5}s`,
                    ["--enter-delay" as string]: `${0.12 + i * 0.07}s`,
                  }}
                >
                  {`${line}　${line}　${line}　${line}　${line}　`}
                </p>
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

        {/* 3. Dominant artwork — intact flattened image (always visible by default) */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center px-0 pt-16 md:pt-12"
          style={motionOn ? { opacity: stageOpacity } : undefined}
        >
          <motion.div
            className="hero-enter-art hero-art relative h-[min(72svh,680px)] w-full md:h-[min(78svh,760px)]"
            style={
              motionOn
                ? { x: artShiftX, y: artY, scale: artScale }
                : undefined
            }
          >
            <motion.div
              className="relative h-full w-full will-change-transform"
              style={motionOn ? { x: 0, y: artShiftY } : undefined}
            >
              <div
                className={`relative h-full w-full ${motionOn ? "hero-float" : ""}`}
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

        {/* 4. Foreground brand + copy + CTA */}
        <motion.div
          className="hero-enter-fg absolute inset-x-0 bottom-0 z-20 px-4 pb-[4.75rem] md:px-10 md:pb-24"
          style={
            motionOn
              ? { opacity: copyOpacity, y: copyY, x: fgShiftX }
              : { opacity: copyOpacity }
          }
        >
          <div className="flex items-end justify-between gap-4">
            <div className="max-w-[14rem] md:max-w-xs">
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
            </div>

            <div className="text-right">
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
            </div>
          </div>
        </motion.div>

        {/* 5. Scroll mask introducing next section */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[42%] bg-ink"
          style={{ y: maskY }}
          aria-hidden="true"
        />

        <div className="hero-torn-edge z-30" aria-hidden="true" />
      </div>
    </section>
  );
}
