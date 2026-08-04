"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/** Brand copy preserved from the user's Hero artwork */
const MARQUEE_A = "嗨嗨計畫　青蛙誰在怕　嗨嗨計畫　青蛙誰在怕　";
const MARQUEE_B = "青蛙誰在怕　嗨嗨計畫　青蛙誰在怕　嗨嗨計畫　";
const ROWS = 9;

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 55, damping: 16 });
  const springY = useSpring(mouseY, { stiffness: 55, damping: 16 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const charY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const fade = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const scaleOut = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const tiltX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const shiftX = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const shiftY = useTransform(springY, [-0.5, 0.5], [-12, 12]);
  const typeShiftX = useTransform(springX, [-0.5, 0.5], [36, -36]);
  const typeShiftY = useTransform(springY, [-0.5, 0.5], [20, -20]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="top"
      ref={ref}
      className="poster relative flex items-center justify-center overflow-hidden"
    >
      {/* Psychedelic editorial field */}
      <motion.div
        style={{ y: bgY, scale: scaleOut, opacity: fade }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 18% 28%, #c43b9a 0%, transparent 55%),
              radial-gradient(ellipse 70% 50% at 82% 18%, #6b2db5 0%, transparent 50%),
              radial-gradient(ellipse 90% 70% at 50% 92%, #2a1050 0%, transparent 55%),
              linear-gradient(160deg, #4a1578 0%, #1a0a2e 45%, #3d0f4f 100%)
            `,
          }}
        />
        <div
          className="hero-cloud absolute inset-0 opacity-55 mix-blend-screen"
          style={{
            backgroundImage: `
              radial-gradient(circle at 28% 42%, rgba(255,120,200,0.38), transparent 28%),
              radial-gradient(circle at 72% 58%, rgba(160,80,255,0.32), transparent 32%),
              radial-gradient(circle at 48% 18%, rgba(255,180,80,0.12), transparent 25%)
            `,
          }}
        />
      </motion.div>

      {/* Oversized cropped typography wall */}
      <motion.div
        style={{ x: typeShiftX, y: typeShiftY, opacity: fade }}
        className="pointer-events-none absolute inset-[-12%] z-[1] flex flex-col justify-center gap-0 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div style={{ y: typeY }} className="flex rotate-[-9deg] scale-[1.35] flex-col">
          {Array.from({ length: ROWS }).map((_, i) => {
            const reverse = i % 2 === 1;
            const text = reverse ? MARQUEE_B : MARQUEE_A;
            return (
              <div key={i} className="overflow-hidden whitespace-nowrap leading-[0.82]">
                <div
                  className={`inline-block font-black text-[clamp(3.2rem,11vw,8.5rem)] tracking-tight text-[#f5e14a]/[0.9] ${
                    reverse ? "hero-marquee-rev" : "hero-marquee"
                  }`}
                  style={{
                    textShadow: "0 2px 0 rgba(0,0,0,0.28)",
                    animationDuration: `${16 + (i % 4) * 3.5}s`,
                  }}
                >
                  {text.repeat(5)}
                </div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 58% 68% at 50% 52%, transparent 12%, rgba(10,4,20,0.48) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Layered character / image — original Drive asset only */}
      <motion.div
        style={{ y: charY, opacity: fade }}
        className="relative z-10 flex h-[100svh] w-full items-center justify-center px-0 pt-14 [perspective:1200px] md:pt-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 48 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ x: shiftX, y: shiftY, rotateX: tiltX, rotateY: tiltY }}
          className="relative h-[min(78svh,720px)] w-full max-w-[1100px]"
        >
          <div className="hero-float relative h-full w-full">
            <Image
              src="/assets/hero/hero-main.jpg"
              alt="嗨嗨計畫｜匠寵｜青蛙誰在怕"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1100px"
              className="object-contain object-center drop-shadow-[0_40px_70px_rgba(0,0,0,0.55)]"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Brand lockup — preserved from user artwork */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.8 }}
        className="absolute bottom-[4.5rem] right-4 z-20 text-right md:bottom-24 md:right-10"
      >
        <p
          className="font-black text-4xl leading-none tracking-wide md:text-6xl"
          style={{
            color: "#ffd24a",
            textShadow:
              "0 0 18px rgba(255,80,180,0.65), 3px 3px 0 #1a0a2e, -1px -1px 0 #ff4db8",
          }}
        >
          匠寵
        </p>
        <span className="mt-2 inline-block rounded-full bg-black/85 px-4 py-1.5 text-xs tracking-[0.2em] text-white md:text-sm">
          嗨嗨計畫
        </span>
      </motion.div>

      <motion.a
        href="#afraid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.05 }}
        className="absolute bottom-[4.75rem] left-4 z-20 text-[11px] tracking-[0.35em] text-white/70 transition-colors hover:text-white md:bottom-24 md:left-10"
      >
        繼續往下 ↓
      </motion.a>

      <div className="hero-torn-edge z-30" aria-hidden="true" />
    </section>
  );
}
