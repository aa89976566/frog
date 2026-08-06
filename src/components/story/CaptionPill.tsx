"use client";

type CaptionPillProps = {
  chapter: string;
  label: string;
  copy: string;
  bg: string;
  fg: string;
  visible: boolean;
};

/** Bottom-center caption — desktop centered; mobile inset 12px */
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
      <div
        className="candy-caption__pill"
        style={{ backgroundColor: bg, color: fg }}
      >
        <div className="candy-caption__meta">
          <span className="candy-caption__chapter">{chapter}</span>
          <span className="candy-caption__label">{label}</span>
        </div>
        <span className="candy-caption__rule" aria-hidden="true" />
        <p className="candy-caption__copy">{copy}</p>
      </div>
    </div>
  );
}
