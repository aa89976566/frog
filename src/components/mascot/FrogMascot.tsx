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

/** Mysterious Taiwanese forest frog — calm, not cute, not scary. */
export function FrogMascot({
  className = "",
  interactive = true,
  size = 340,
}: FrogMascotProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });

  const track = useCallback(
    (clientX: number, clientY: number) => {
      if (!interactive || !rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.36;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const max = 5.5;
      setPupil({
        x: (dx / dist) * Math.min(max, dist / 55),
        y: (dy / dist) * Math.min(max * 0.7, dist / 70),
      });
    },
    [interactive],
  );

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: PointerEvent) => track(e.clientX, e.clientY);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive, track]);

  return (
    <div
      ref={rootRef}
      className={`relative select-none ${className}`}
      style={{
        width: size,
        height: size * 1.05,
        animation: interactive ? "breathe 4.2s ease-in-out infinite" : undefined,
      }}
      onPointerMove={(e: ReactPointerEvent) => track(e.clientX, e.clientY)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 220 230"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft ground shadow */}
        <ellipse cx="110" cy="214" rx="52" ry="8" fill="#000" opacity="0.35" />

        {/* Long quiet legs */}
        <path
          d="M78 155 C60 178 48 198 44 212"
          stroke="#4a6b3a"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M142 155 C160 178 172 198 176 212"
          stroke="#4a6b3a"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <ellipse cx="42" cy="214" rx="12" ry="4.5" fill="#3f5a32" />
        <ellipse cx="178" cy="214" rx="12" ry="4.5" fill="#3f5a32" />

        {/* Body — round, still */}
        <ellipse cx="110" cy="140" rx="54" ry="48" fill="#5f8450" />
        <ellipse cx="110" cy="148" rx="34" ry="28" fill="#9cb882" opacity="0.85" />

        {/* Subtle dorsal markings */}
        <path
          d="M110 105 C104 125 104 145 110 165 C116 145 116 125 110 105"
          fill="#4a6b3a"
          opacity="0.35"
        />

        {/* Arms resting */}
        <path
          d="M60 128 C42 136 36 152 40 164"
          stroke="#547545"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M160 128 C178 136 184 152 180 164"
          stroke="#547545"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Head */}
        <ellipse cx="110" cy="88" rx="46" ry="40" fill="#5f8450" />

        {/* Eye mounds — medium */}
        <ellipse cx="90" cy="72" rx="16" ry="15" fill="#4a6b3a" />
        <ellipse cx="130" cy="72" rx="16" ry="15" fill="#4a6b3a" />
        <ellipse cx="90" cy="72" rx="11.5" ry="11" fill="#ebe6dc" />
        <ellipse cx="130" cy="72" rx="11.5" ry="11" fill="#ebe6dc" />

        <g transform={`translate(${pupil.x} ${pupil.y})`}>
          <circle cx="90" cy="73" r="5.2" fill="#1a1a16" />
          <circle cx="130" cy="73" r="5.2" fill="#1a1a16" />
          <circle cx="92" cy="71" r="1.4" fill="#ebe6dc" opacity="0.7" />
          <circle cx="132" cy="71" r="1.4" fill="#ebe6dc" opacity="0.7" />
        </g>

        {/* Calm mouth — almost neutral */}
        <path
          d="M98 98 Q110 104 122 98"
          stroke="#2a3224"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Tiny nostrils */}
        <circle cx="104" cy="90" r="1.3" fill="#3f5a32" />
        <circle cx="116" cy="90" r="1.3" fill="#3f5a32" />
      </svg>
    </div>
  );
}
