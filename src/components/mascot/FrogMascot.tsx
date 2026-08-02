"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

type FrogMascotProps = {
  className?: string;
  interactive?: boolean;
  size?: number;
};

export function FrogMascot({
  className = "",
  interactive = true,
  size = 320,
}: FrogMascotProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);

  const trackPointer = useCallback(
    (clientX: number, clientY: number) => {
      if (!interactive || !rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.38;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const max = 7;
      const dist = Math.hypot(dx, dy) || 1;
      setPupil({
        x: (dx / dist) * Math.min(max, dist / 40),
        y: (dy / dist) * Math.min(max * 0.75, dist / 50),
      });
    },
    [interactive],
  );

  useEffect(() => {
    if (!interactive) return;

    const onMove = (e: PointerEvent) => trackPointer(e.clientX, e.clientY);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive, trackPointer]);

  useEffect(() => {
    if (!interactive) return;
    let timeout: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const delay = 2200 + Math.random() * 3200;
      timeout = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 140);
        schedule();
      }, delay);
    };

    schedule();
    return () => clearTimeout(timeout);
  }, [interactive]);

  const onLocalPointer = (e: ReactPointerEvent<HTMLDivElement>) => {
    trackPointer(e.clientX, e.clientY);
  };

  return (
    <div
      ref={rootRef}
      className={`frog-breathe relative select-none ${className}`}
      style={{
        width: size,
        height: size,
        animation: interactive ? "breathe 3.6s ease-in-out infinite" : undefined,
      }}
      onPointerMove={onLocalPointer}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 220"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <title>嗷嗚計畫原創青蛙吉祥物</title>
        {/* Long legs behind */}
        <path
          d="M68 148 C52 175 38 198 34 210 C48 208 62 196 74 178"
          stroke="#3d7a2e"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M132 148 C148 175 162 198 166 210 C152 208 138 196 126 178"
          stroke="#3d7a2e"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="30" cy="212" rx="14" ry="5" fill="#3d7a2e" />
        <ellipse cx="170" cy="212" rx="14" ry="5" fill="#3d7a2e" />

        {/* Round body */}
        <ellipse cx="100" cy="128" rx="58" ry="52" fill="#6bae4a" />
        <ellipse cx="100" cy="138" rx="38" ry="32" fill="#c8e6a0" />

        {/* Cheek spots — Taiwanese forest markings */}
        <circle cx="62" cy="120" r="7" fill="#4f9435" opacity="0.55" />
        <circle cx="138" cy="120" r="7" fill="#4f9435" opacity="0.55" />
        <circle cx="78" cy="150" r="4" fill="#4f9435" opacity="0.4" />
        <circle cx="122" cy="150" r="4" fill="#4f9435" opacity="0.4" />

        {/* Arms */}
        <path
          d="M48 118 C28 128 22 148 28 160"
          stroke="#5a9c3d"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M152 118 C172 128 178 148 172 160"
          stroke="#5a9c3d"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <ellipse cx="28" cy="162" rx="10" ry="6" fill="#5a9c3d" />
        <ellipse cx="172" cy="162" rx="10" ry="6" fill="#5a9c3d" />

        {/* Head */}
        <ellipse cx="100" cy="78" rx="48" ry="42" fill="#6bae4a" />
        {/* Soft snout */}
        <ellipse cx="100" cy="92" rx="22" ry="16" fill="#7ec255" />

        {/* Eye mounds */}
        <ellipse cx="78" cy="62" rx="18" ry="17" fill="#5a9c3d" />
        <ellipse cx="122" cy="62" rx="18" ry="17" fill="#5a9c3d" />

        {/* Eyes — medium, not oversized */}
        <ellipse cx="78" cy="62" rx="13" ry="12" fill="#eef2e6" />
        <ellipse cx="122" cy="62" rx="13" ry="12" fill="#eef2e6" />

        {/* Pupils that follow cursor */}
        <g transform={`translate(${pupil.x} ${pupil.y})`}>
          <circle cx="78" cy="63" r="6.5" fill="#1a1208" />
          <circle cx="122" cy="63" r="6.5" fill="#1a1208" />
          <circle cx="80.5" cy="60.5" r="2" fill="#eef2e6" />
          <circle cx="124.5" cy="60.5" r="2" fill="#eef2e6" />
        </g>

        {/* Blink lids */}
        <g
          style={{
            transformOrigin: "100px 62px",
            transform: blinking ? "scaleY(1)" : "scaleY(0)",
            transition: "transform 90ms ease",
          }}
        >
          <ellipse cx="78" cy="62" rx="13" ry="12" fill="#5a9c3d" />
          <ellipse cx="122" cy="62" rx="13" ry="12" fill="#5a9c3d" />
        </g>

        {/* Playful smile + tiny tongue */}
        <path
          d="M86 98 Q100 112 114 98"
          stroke="#2a1c12"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="100" cy="106" rx="5" ry="3.5" fill="#e86a6a" />

        {/* Tiny nostrils */}
        <circle cx="94" cy="88" r="1.6" fill="#3d7a2e" />
        <circle cx="106" cy="88" r="1.6" fill="#3d7a2e" />
      </svg>
    </div>
  );
}
