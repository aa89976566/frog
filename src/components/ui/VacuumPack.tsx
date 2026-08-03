"use client";

type VacuumPackProps = {
  className?: string;
  revealed?: boolean;
  rotateY?: number;
};

/** Premium vacuum-sealed freeze-dried frog treat pack — original packaging art. */
export function VacuumPack({
  className = "",
  revealed = false,
  rotateY = 0,
}: VacuumPackProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        perspective: 900,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          transform: `rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.05s linear",
        }}
      >
        <svg
          viewBox="0 0 280 360"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
        >
          <defs>
            <linearGradient id="packFace" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f3eee4" />
              <stop offset="45%" stopColor="#e8e0d2" />
              <stop offset="100%" stopColor="#d9d0c0" />
            </linearGradient>
            <linearGradient id="plastic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="seal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a2a26" />
              <stop offset="100%" stopColor="#121210" />
            </linearGradient>
            <filter id="softInner" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Pack body */}
          <rect
            x="36"
            y="28"
            width="208"
            height="300"
            rx="18"
            fill="url(#packFace)"
          />
          {/* Vacuum crinkle edges */}
          <path
            d="M36 70 Q28 110 36 150 Q28 190 36 230 Q28 270 36 310"
            stroke="#cfc6b6"
            strokeWidth="3"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M244 70 Q252 110 244 150 Q252 190 244 230 Q252 270 244 310"
            stroke="#cfc6b6"
            strokeWidth="3"
            fill="none"
            opacity="0.7"
          />

          {/* Top seal bar */}
          <rect x="36" y="28" width="208" height="36" rx="18" fill="url(#seal)" />
          <rect x="36" y="46" width="208" height="18" fill="url(#seal)" />
          <text
            x="140"
            y="52"
            textAnchor="middle"
            fill="#ebe6dc"
            fontSize="11"
            fontFamily="var(--font-display), sans-serif"
            letterSpacing="3"
          >
            FURMOSA
          </text>

          {/* Window */}
          <rect
            x="68"
            y="92"
            width="144"
            height="150"
            rx="10"
            fill="#1a2216"
            filter="url(#softInner)"
          />

          {/* Mystery silhouette vs revealed frog treat */}
          {!revealed ? (
            <g opacity="0.35">
              <ellipse cx="140" cy="168" rx="34" ry="28" fill="#3a4a32" />
              <circle cx="126" cy="150" r="10" fill="#3a4a32" />
              <circle cx="154" cy="150" r="10" fill="#3a4a32" />
              <text
                x="140"
                y="220"
                textAnchor="middle"
                fill="#9cb882"
                fontSize="12"
                letterSpacing="2"
              >
                ???
              </text>
            </g>
          ) : (
            <g>
              {/* Freeze-dried frog pieces — stylized */}
              <ellipse cx="118" cy="155" rx="22" ry="16" fill="#8fad6e" />
              <ellipse cx="156" cy="170" rx="18" ry="13" fill="#7a985c" />
              <ellipse cx="140" cy="195" rx="26" ry="14" fill="#6f8f57" />
              <circle cx="110" cy="148" r="4" fill="#c8d9ae" />
              <circle cx="162" cy="164" r="3.5" fill="#c8d9ae" />
              <text
                x="140"
                y="228"
                textAnchor="middle"
                fill="#ebe6dc"
                fontSize="13"
                fontFamily="var(--font-body), sans-serif"
                fontWeight="700"
              >
                青蛙凍乾
              </text>
            </g>
          )}

          {/* Plastic shine */}
          <rect
            x="68"
            y="92"
            width="144"
            height="150"
            rx="10"
            fill="url(#plastic)"
          />

          {/* Bottom label */}
          <text
            x="140"
            y="275"
            textAnchor="middle"
            fill="#2a2a26"
            fontSize="10"
            letterSpacing="4"
            fontFamily="var(--font-display), sans-serif"
          >
            FREEZE-DRIED
          </text>
          <text
            x="140"
            y="295"
            textAnchor="middle"
            fill="#6f8f57"
            fontSize="16"
            fontFamily="var(--font-body), sans-serif"
            fontWeight="700"
          >
            {revealed ? "青蛙凍乾" : "內容物待揭曉"}
          </text>
          <text
            x="140"
            y="312"
            textAnchor="middle"
            fill="#8a8478"
            fontSize="9"
            letterSpacing="1"
          >
            匠寵 · 嗷嗚計畫
          </text>
        </svg>
      </div>
    </div>
  );
}
