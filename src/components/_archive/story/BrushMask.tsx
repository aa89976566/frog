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
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: flip ? "scaleY(-1)" : undefined }}
      >
        <path
          fill="#0a0612"
          d="M0 18
            C40 62 95 4 150 38
            C210 78 255 98 320 44
            C380 6 450 82 530 50
            C600 22 670 -4 760 36
            C850 78 920 104 1000 58
            C1080 16 1150 8 1230 42
            C1290 66 1360 92 1440 28
            L1440 110 L0 110 Z"
        />
        <path
          fill="#0a0612"
          opacity="0.95"
          d="M0 42
            C70 22 130 78 210 52
            C290 24 360 2 450 40
            C540 78 620 18 710 34
            C800 52 880 96 970 64
            C1050 36 1120 8 1205 30
            C1290 54 1365 88 1440 48
            L1440 110 L0 110 Z"
        />
        <path
          fill="#0a0612"
          opacity="0.75"
          d="M0 58
            C100 40 180 90 280 66
            C380 40 480 14 600 48
            C720 84 820 30 940 50
            C1060 72 1180 100 1300 70
            C1380 52 1420 60 1440 68
            L1440 110 L0 110 Z"
        />
      </svg>
    </div>
  );
}
