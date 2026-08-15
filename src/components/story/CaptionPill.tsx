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
 * Bottom caption on the shared poster grid — fixed meta column,
 * full OS sentence at desktop, stacked at 390.
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
      className={`candy-caption ${visible ? "is-visible" : ""}`}
      aria-live="polite"
    >
      <div className="candy-caption__stack">
        <div
          key={`${chapter}-${label}-${copy}`}
          className="candy-caption__layer candy-caption__layer--in is-fading-in"
        >
          <div className="candy-caption__dual">
            <div
              className="candy-caption__meta-pill"
              style={{ backgroundColor: bg, color: fg }}
            >
              <span className="candy-caption__chapter">{chapter}</span>
              <span className="candy-caption__label">{label}</span>
            </div>
            <div
              className="candy-caption__quote-pill"
              style={{ backgroundColor: bg, color: fg }}
            >
              <p className="candy-caption__copy">{copy}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
