"use client";

type CaptionPillProps = {
  chapter: string;
  label: string;
  copy: string;
  bg: string;
  fg: string;
  visible: boolean;
};

/**
 * Bottom-anchored caption pill — cross-fades via CSS when props change.
 * Desktop: two-column label/copy · Mobile: stacked.
 */
export function CaptionPill({
  chapter,
  label,
  copy,
  bg,
  fg,
  visible,
}: CaptionPillProps) {
  return (
    <div
      className={`film-caption-pill pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] flex justify-center px-3 transition-opacity duration-300 md:bottom-6 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-live="polite"
    >
      <div
        className="pointer-events-auto flex w-full max-w-[720px] flex-col gap-2 rounded-full border border-white/10 px-5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md md:flex-row md:items-center md:gap-5 md:px-6 md:py-3.5"
        style={{ backgroundColor: bg, color: fg }}
      >
        <div className="flex shrink-0 items-baseline gap-2 md:w-[7.5rem] md:flex-col md:gap-0.5">
          <span className="font-display text-[10px] font-extrabold tracking-[0.35em] opacity-70">
            {chapter}
          </span>
          <span className="text-[11px] font-bold tracking-[0.2em] md:text-xs">
            {label}
          </span>
        </div>
        <p className="min-w-0 text-[0.95rem] font-bold leading-snug tracking-[0.02em] md:flex-1 md:text-[1.05rem]">
          {copy}
        </p>
      </div>
    </div>
  );
}
