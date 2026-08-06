"use client";

/**
 * Psychedelic purple / pink / lime atmosphere — Lil Frogeth energy, not horror void.
 */
export function AtmosphereBackground() {
  return (
    <div className="hero-atmosphere absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hero-atm-base absolute inset-0" />
      <div className="hero-atm-plane hero-atm-a absolute inset-[-14%]" />
      <div className="hero-atm-plane hero-atm-b absolute inset-[-18%]" />
      <div className="hero-atm-plane hero-atm-c absolute inset-[-12%]" />
      <div className="hero-atm-bloom absolute inset-0" />
      <div className="hero-atm-chroma absolute inset-0" />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18] mix-blend-soft-light"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="heroTurb">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="2"
            stitchTiles="stitch"
          >
            <animate
              attributeName="baseFrequency"
              dur="28s"
              values="0.75;0.86;0.75"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feColorMatrix type="saturate" values="0.35" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroTurb)" />
      </svg>
    </div>
  );
}
