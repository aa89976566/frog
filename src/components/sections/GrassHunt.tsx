"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FrogMascot } from "@/components/mascot/FrogMascot";

type Blade = {
  id: number;
  x: number;
  h: number;
  w: number;
  hue: string;
  delay: number;
};

function makeBlades(count: number): Blade[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (i / count) * 100 + (i % 3) * 0.4,
    h: 38 + ((i * 17) % 48),
    w: 8 + (i % 5),
    hue: i % 3 === 0 ? "#2d5a3d" : i % 3 === 1 ? "#3f7a52" : "#1e4a30",
    delay: (i % 9) * 0.2,
  }));
}

export function GrassHunt() {
  const stageRef = useRef<HTMLDivElement>(null);
  const blades = useMemo(() => makeBlades(56), []);
  const [pointer, setPointer] = useState({ x: 50, y: 70 });
  const [frog, setFrog] = useState<{ x: number; y: number; key: number } | null>(
    null,
  );
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    const clamped = {
      x: Math.min(100, Math.max(0, px)),
      y: Math.min(100, Math.max(0, py)),
    };
    setPointer(clamped);

    // Occasional peek while parting grass — always just out of reach
    if (Math.random() > 0.96 && !frog) {
      const x = Math.min(82, Math.max(18, clamped.x + (Math.random() - 0.5) * 18));
      const y = 55 + Math.random() * 20;
      setFrog({ x, y, key: Date.now() });
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setFrog(null), 780);
    }
  };

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  // Autonomous peek so idle / touch users still see the gag
  useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden) return;
      setFrog((current) => {
        if (current) return current;
        return {
          x: 22 + Math.random() * 56,
          y: 58 + Math.random() * 18,
          key: Date.now(),
        };
      });
      setTimeout(() => setFrog(null), 820);
    }, 3600);

    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hunt"
      className="relative min-h-[100svh] overflow-hidden bg-[#0d2016]"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, #1a3d28 0%, transparent 55%), linear-gradient(180deg, #0a1a12 0%, #0d2016 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center md:pt-32">
        <p className="font-display text-xs tracking-[0.4em] text-dog-amber">
          草叢互動
        </p>
        <h2 className="mt-4 font-display text-4xl text-cream-ink md:text-6xl">
          Nobody has caught one.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-mist">
          撥開草看看。牠偶爾會露臉——然後立刻消失。
          <br />
          你永遠抓不到。
        </p>
      </div>

      <div
        ref={stageRef}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setPointer({ x: 50, y: 80 })}
        className="relative mx-auto mt-10 h-[58vh] min-h-[360px] w-full max-w-6xl cursor-none touch-none md:mt-14"
        role="img"
        aria-label="可互動的草叢，移動指標會撥開草，青蛙偶爾現身又消失"
      >
        {/* Soft parting light under cursor */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 140px at ${pointer.x}% ${pointer.y}%, rgba(200,230,160,0.12) 0%, transparent 70%)`,
          }}
        />

        {/* Grass blades that lean away from pointer */}
        <div className="absolute inset-x-0 bottom-0 top-[18%] z-20 overflow-hidden">
          {blades.map((blade) => {
            const dx = blade.x - pointer.x;
            const dist = Math.abs(dx);
            const influence = Math.max(0, 1 - dist / 16);
            const lean = dx === 0 ? 0 : dx > 0 ? -18 * influence : 18 * influence;
            const pushY = 6 * influence;

            return (
              <div
                key={blade.id}
                className="absolute bottom-0 origin-bottom will-change-transform"
                style={{
                  left: `${blade.x}%`,
                  height: `${blade.h}%`,
                  width: blade.w,
                  transform: `translateX(-50%) skewX(${lean}deg) translateY(${pushY}px)`,
                  transition: "transform 160ms ease-out",
                }}
              >
                <div
                  className="grass-blade h-full w-full rounded-t-full"
                  style={{
                    background: `linear-gradient(180deg, ${blade.hue} 0%, #0a1a12 100%)`,
                    animationDelay: `${blade.delay}s`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Frog peeks ABOVE parting grass, then vanishes */}
        <AnimatePresence>
          {frog && (
            <motion.div
              key={frog.key}
              initial={{ opacity: 0, scale: 0.7, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 28 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute z-30"
              style={{
                left: `${frog.x}%`,
                top: `${frog.y}%`,
                transform: "translate(-50%, -40%)",
              }}
            >
              <FrogMascot interactive={false} size={110} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom cursor hint */}
        <div
          className="pointer-events-none absolute z-40 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dog-amber/70 md:block"
          style={{ left: `${pointer.x}%`, top: `${pointer.y}%` }}
          aria-hidden="true"
        />
      </div>

      <p className="relative z-10 pb-16 pt-6 text-center font-display text-sm tracking-[0.3em] text-fog-type md:text-base">
        Will yours?
      </p>
    </section>
  );
}
