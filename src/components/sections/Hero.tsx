"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const MARQUEE_A = "嗨嗨計畫　青蛙誰在怕　嗨嗨計畫　青蛙誰在怕　";
const MARQUEE_B = "青蛙誰在怕　嗨嗨計畫　青蛙誰在怕　嗨嗨計畫　";
const ROWS = 7;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const charY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleOut = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Character tilt from mouse
  const tiltX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const shiftX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const shiftY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  // Typography parallax opposite to mouse
  const typeShiftX = useTransform(springX, [-0.5, 0.5], [28, -28]);
  const typeShiftY = useTransform(springY, [-0.5, 0.5], [16, -16]);

  useEffect(() => {
    setReady(true);
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
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
      {/* Psychedelic cloud field */}
      <motion.div
        style={{ y: bgY, scale: scaleOut, opacity: fade }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 30%, #c43b9a 0%, transparent 55%),
              radial-gradient(ellipse 70% 50% at 80% 20%, #6b2db5 0%, transparent 50%),
              radial-gradient(ellipse 90% 70% at 50% 90%, #2a1050 0%, transparent 55%),
              linear-gradient(160deg, #4a1578 0%, #1a0a2e 45%, #3d0f4f 100%)
            `,
          }}
        />
        <div
          className="hero-cloud absolute inset-0 opacity-60 mix-blend-screen"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 40%, rgba(255,120,200,0.35), transparent 28%),
              radial-gradient(circle at 70% 55%, rgba(160,80,255,0.3), transparent 32%),
              radial-gradient(circle at 50% 20%, rgba(255,180,80,0.12), transparent 25%)
            `,
          }}
        />
      </motion.div>

      {/* Continuous marquee typography wall — lilfrogeth experience pattern */}
      <motion.div
        style={{ x: typeShiftX, y: typeShiftY, opacity: fade }}
        className="pointer-events-none absolute inset-0 z-[1] flex flex-col justify-center gap-[0.2vh] overflow-hidden rotate-[-8deg] scale-125"
        aria-hidden="true"
      >
        {Array.from({ length: ROWS }).map((_, i) => {
          const reverse = i % 2 === 1;
          const text = reverse ? MARQUEE_B : MARQUEE_A;
          return (
            <div key={i} className="overflow-hidden whitespace-nowrap">
              <div
                className={`inline-block font-black leading-none text-[clamp(2.8rem,9vw,7.5rem)] tracking-tight text-[#f5e14a]/[0.88] ${
                  reverse ? "hero-marquee-rev" : "hero-marquee"
                }`}
                style={{
                  textShadow: "0 2px 0 rgba(0,0,0,0.25)",
                  animationDuration: `${18 + (i % 3) * 4}s`,
                }}
              >
                {text.repeat(4)}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Soft vignette so character pops */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 55% 65% at 50% 55%, transparent 20%, rgba(10,4,20,0.45) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Hero character — float + mouse tilt */}
      <motion.div
        style={{
          y: charY,
          opacity: fade,
        }}
        className="relative z-10 flex h-full w-full max-w-5xl items-end justify-center px-2 pt-16 [perspective:1200px] md:items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.86, y: 40 }}
          animate={ready ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{ x: shiftX, y: shiftY, rotateX: tiltX, rotateY: tiltY }}
          className="relative"
        >
          <div className="hero-float relative aspect-[2/3] w-[min(92vw,520px)]">
            <Image
              src="/images/hero-frog-suit.png"
              alt="嗨嗨計畫｜匠寵 — 青蛙誰在怕"
              fill
              priority
              sizes="(max-width: 768px) 92vw, 520px"
              className="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Brand badge — bottom right like mock */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="absolute bottom-16 right-5 z-20 text-right md:bottom-20 md:right-10"
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

      {/* Scroll cue */}
      <motion.a
        href="#afraid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-20 left-5 z-20 text-[11px] tracking-[0.35em] text-white/70 transition-colors hover:text-white md:bottom-24 md:left-10"
      >
        繼續往下 ↓
      </motion.a>

      {/* Torn brush edge */}
      <div className="hero-torn-edge z-30" aria-hidden="true" />
    </section>
  );
}
