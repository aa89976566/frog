"use client";

type ExcitedDogProps = {
  className?: string;
  size?: number;
};

/** Original excited dog silhouette — wagging, shining eyes. */
export function ExcitedDog({ className = "", size = 280 }: ExcitedDogProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 240 220"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="120" cy="208" rx="48" ry="7" fill="#000" opacity="0.3" />

        {/* Tail wag */}
        <g style={{ transformOrigin: "175px 120px", animation: "wag 0.28s ease-in-out infinite" }}>
          <path
            d="M168 118 Q200 90 210 70"
            stroke="#c4a06a"
            strokeWidth="14"
            strokeLinecap="round"
          />
        </g>

        {/* Body */}
        <ellipse cx="118" cy="140" rx="58" ry="42" fill="#d4b07a" />
        <ellipse cx="118" cy="150" rx="36" ry="26" fill="#e8d0a8" />

        {/* Legs */}
        <rect x="78" y="165" width="14" height="36" rx="7" fill="#c4a06a" />
        <rect x="102" y="168" width="14" height="34" rx="7" fill="#b8925c" />
        <rect x="126" y="168" width="14" height="34" rx="7" fill="#b8925c" />
        <rect x="148" y="165" width="14" height="36" rx="7" fill="#c4a06a" />

        {/* Head */}
        <ellipse cx="110" cy="88" rx="42" ry="38" fill="#d4b07a" />
        {/* Ears */}
        <ellipse cx="78" cy="68" rx="14" ry="22" fill="#b8925c" transform="rotate(-20 78 68)" />
        <ellipse cx="140" cy="66" rx="13" ry="20" fill="#b8925c" transform="rotate(18 140 66)" />

        {/* Snout */}
        <ellipse cx="118" cy="100" rx="18" ry="14" fill="#e8d0a8" />
        <ellipse cx="118" cy="96" rx="7" ry="5" fill="#2a2218" />

        {/* Shining excited eyes */}
        <circle cx="96" cy="82" r="9" fill="#1a1a16" />
        <circle cx="124" cy="82" r="9" fill="#1a1a16" />
        <circle cx="99" cy="79" r="3.2" fill="#fff" />
        <circle cx="127" cy="79" r="3.2" fill="#fff" />
        <circle cx="93" cy="85" r="1.4" fill="#fff" opacity="0.7" />
        <circle cx="121" cy="85" r="1.4" fill="#fff" opacity="0.7" />

        {/* Happy open mouth */}
        <path d="M108 108 Q118 118 128 108" fill="#2a2218" />
        <ellipse cx="118" cy="112" rx="5" ry="3" fill="#d06a5a" />
      </svg>
    </div>
  );
}
