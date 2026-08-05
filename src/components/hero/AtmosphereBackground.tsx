"use client";

/**
 * Bright lavender / bubblegum cloud atmosphere — candy daylight, not night.
 */
export function AtmosphereBackground() {
  return (
    <div className="hero-atmosphere absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hero-atm-base absolute inset-0" />
      <div className="hero-atm-plane hero-atm-a absolute inset-[-12%]" />
      <div className="hero-atm-plane hero-atm-b absolute inset-[-16%]" />
      <div className="hero-atm-plane hero-atm-c absolute inset-[-10%]" />
      {/* Soft risograph grain — light, not dirty film */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="heroTurb">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          >
            <animate
              attributeName="baseFrequency"
              dur="32s"
              values="0.9;0.95;0.9"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroTurb)" />
      </svg>
    </div>
  );
}
