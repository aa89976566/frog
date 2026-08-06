/**
 * Irregular black brush / torn-edge seam — 60–120px only.
 * Never a clean horizontal divider or tall black void.
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
      className={`candy-brush candy-brush--${edge} ${className}`}
      aria-hidden="true"
    >
      <svg
        className="candy-brush__svg"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: flip ? "scaleY(-1)" : undefined }}
      >
        <path
          fill="#0a0612"
          d="M0 28
            C60 55 110 8 170 32
            C240 62 290 88 360 48
            C430 12 500 70 580 52
            C660 34 720 6 800 30
            C880 58 940 90 1020 60
            C1100 28 1160 10 1240 38
            C1300 56 1360 78 1440 42
            L1440 100 L0 100 Z"
        />
        <path
          fill="#0a0612"
          opacity="0.9"
          d="M0 48
            C90 32 150 72 230 56
            C310 38 380 14 470 42
            C560 72 640 28 730 40
            C820 54 900 86 980 66
            C1060 44 1120 16 1200 36
            C1280 58 1360 80 1440 52
            L1440 100 L0 100 Z"
        />
      </svg>
    </div>
  );
}
