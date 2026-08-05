"use client";

/** Blacklight void atmosphere — violet/magenta haze over #050706 */
export function AtmosphereBackground() {
  return (
    <div className="hero-atmosphere absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hero-atm-base absolute inset-0" />
      <div className="hero-atm-plane hero-atm-a absolute inset-[-12%]" />
      <div className="hero-atm-plane hero-atm-b absolute inset-[-16%]" />
      <div className="hero-atm-plane hero-atm-c absolute inset-[-10%]" />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22] mix-blend-soft-light"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="heroTurb">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            stitchTiles="stitch"
          >
            <animate
              attributeName="baseFrequency"
              dur="30s"
              values="0.8;0.88;0.8"
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
