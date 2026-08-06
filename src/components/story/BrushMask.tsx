/**
 * Irregular black brush / torn-edge masks for scene seams.
 * Heights ~60–140px — not straight dividers.
 */
export function BrushMask({
  edge,
  className = "",
}: {
  edge: "top" | "bottom";
  className?: string;
}) {
  const flip = edge === "top";
  return (
    <div
      className={`film-brush pointer-events-none absolute inset-x-0 z-30 ${
        edge === "top" ? "top-0" : "bottom-0"
      } ${className}`}
      aria-hidden="true"
      style={{ height: "clamp(60px, 12vh, 140px)" }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: flip ? "scaleY(-1)" : undefined }}
      >
        <path
          fill="#050706"
          d="M0 48
            C48 72 96 18 150 42
            C210 70 250 100 320 64
            C390 28 450 90 530 70
            C610 48 670 12 760 40
            C850 72 920 110 1000 78
            C1080 44 1140 16 1220 50
            C1280 72 1340 96 1440 58
            L1440 140 L0 140 Z"
        />
        <path
          fill="#050706"
          opacity="0.85"
          d="M0 70
            C80 50 140 95 220 78
            C300 58 360 30 450 62
            C540 96 620 40 720 55
            C820 72 900 110 980 88
            C1060 64 1120 28 1200 52
            C1280 78 1360 100 1440 74
            L1440 140 L0 140 Z"
        />
      </svg>
    </div>
  );
}
