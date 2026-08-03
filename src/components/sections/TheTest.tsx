"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VacuumPack } from "@/components/ui/VacuumPack";
import { ExcitedDog } from "@/components/ui/ExcitedDog";

type Phase =
  | "idle"
  | "holding"
  | "package"
  | "reveal"
  | "dog"
  | "done";

export function TheTest() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [holdProgress, setHoldProgress] = useState(0);
  const [rotateY, setRotateY] = useState(-18);
  const holdStart = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const locked = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const cancelHold = () => {
    if (locked.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    holdStart.current = null;
    setPhase("idle");
    setHoldProgress(0);
  };

  const startSequence = useCallback(() => {
    locked.current = true;
    clearTimers();
    setPhase("package");
    setRotateY(-24);

    const t1 = setTimeout(() => setRotateY(12), 400);
    const t2 = setTimeout(() => setRotateY(-8), 1400);
    const t3 = setTimeout(() => {
      setRotateY(0);
      setPhase("reveal");
    }, 2400);
    const t4 = setTimeout(() => setPhase("dog"), 3400);
    const t5 = setTimeout(() => setPhase("done"), 4200);
    timers.current.push(t1, t2, t3, t4, t5);
  }, []);

  const onHoldStart = () => {
    if (phase !== "idle" || locked.current) return;
    setPhase("holding");
    holdStart.current = performance.now();

    const tick = (now: number) => {
      if (!holdStart.current) return;
      const elapsed = now - holdStart.current;
      const p = Math.min(1, elapsed / 2000);
      setHoldProgress(p);
      if (p >= 1) {
        startSequence();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const reset = () => {
    clearTimers();
    locked.current = false;
    setPhase("idle");
    setHoldProgress(0);
    setRotateY(-18);
  };

  useEffect(
    () => () => {
      clearTimers();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const showPack =
    phase === "package" ||
    phase === "reveal" ||
    phase === "dog" ||
    phase === "done";
  const revealed = phase === "reveal" || phase === "dog" || phase === "done";
  const showDog = phase === "dog" || phase === "done";

  return (
    <section
      id="test"
      className="poster relative flex items-center justify-center overflow-hidden bg-ink-soft"
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(111,143,87,0.12) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 py-28 text-center">
        <AnimatePresence mode="wait">
          {phase !== "done" ? (
            <motion.h2
              key="prep"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="text-3xl font-bold text-fog md:text-5xl"
            >
              心理準備好了嗎？
            </motion.h2>
          ) : (
            <motion.h2
              key="decided"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-3xl font-bold leading-snug text-fog md:text-5xl"
            >
              你還在猶豫。
              <br />
              <span className="text-dog-gold">牠已經決定好了。</span>
            </motion.h2>
          )}
        </AnimatePresence>

        <div className="relative mt-12 flex min-h-[380px] w-full items-center justify-center overflow-visible md:min-h-[440px]">
          {(phase === "idle" || phase === "holding") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <p className="mb-8 text-sm tracking-[0.25em] text-fog-dim">
                {phase === "holding" ? "請不要放開。" : "按住按鈕，開始測驗"}
              </p>
              <button
                type="button"
                onPointerDown={onHoldStart}
                onPointerUp={cancelHold}
                onPointerLeave={cancelHold}
                onPointerCancel={cancelHold}
                className="relative h-36 w-36 touch-none rounded-full border border-fog/30 bg-panel text-sm tracking-[0.2em] text-fog transition-transform active:scale-95 md:h-40 md:w-40"
                aria-label="按住兩秒開始心理測驗"
              >
                <span
                  className="absolute inset-2 rounded-full"
                  style={{
                    background: `conic-gradient(var(--moss) ${holdProgress * 360}deg, transparent 0)`,
                    opacity: 0.35,
                  }}
                />
                <span className="relative z-10 font-bold">
                  {phase === "holding"
                    ? `${Math.round(holdProgress * 100)}%`
                    : "按住"}
                </span>
              </button>
            </motion.div>
          )}

          <AnimatePresence>
            {showPack && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: showDog ? -20 : 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute"
              >
                <VacuumPack
                  revealed={revealed}
                  rotateY={rotateY}
                  className="h-[300px] w-[230px] md:h-[360px] md:w-[280px]"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showDog && (
              <motion.div
                initial={{ opacity: 0, y: 220, scale: 0.65, rotate: -10 }}
                animate={{ opacity: 1, y: 40, scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 14,
                  mass: 0.85,
                }}
                className="absolute -bottom-4 right-[4%] z-20 md:right-[12%]"
              >
                <ExcitedDog size={220} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {phase === "done" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm tracking-[0.2em] text-fog-dim"
          >
            主人需要心理準備。狗不用。
          </motion.p>
        )}

        {phase === "done" && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={reset}
            className="mt-8 text-xs tracking-[0.25em] text-moss underline underline-offset-8"
          >
            再測一次
          </motion.button>
        )}
      </div>
    </section>
  );
}
