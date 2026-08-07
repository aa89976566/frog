"use client";

import { useState } from "react";

type CaptionPillProps = {
  chapter: string;
  label: string;
  copy: string;
  bg: string;
  fg: string;
  visible: boolean;
};

type CaptionSnapshot = {
  chapter: string;
  label: string;
  copy: string;
  bg: string;
  fg: string;
};

/**
 * Bottom dual-capsule strip (Lil Frogeth interaction language):
 * left meta pill + right quote pill. HTML only — never baked into art.
 */
export function CaptionPill({
  chapter,
  label,
  copy,
  bg,
  fg,
  visible,
}: CaptionPillProps) {
  const next: CaptionSnapshot = { chapter, label, copy, bg, fg };
  const [front, setFront] = useState(next);
  const [back, setBack] = useState<CaptionSnapshot | null>(null);

  if (
    next.chapter !== front.chapter ||
    next.copy !== front.copy ||
    next.bg !== front.bg ||
    next.label !== front.label
  ) {
    if (visible) {
      setBack(front);
      setFront(next);
    } else {
      setFront(next);
      setBack(null);
    }
  }

  return (
    <div
      className={`candy-caption ${visible ? "is-visible" : ""}`}
      aria-live="polite"
    >
      <div className="candy-caption__stack">
        {back ? (
          <div
            className="candy-caption__layer candy-caption__layer--out"
            aria-hidden="true"
            onAnimationEnd={() => setBack(null)}
          >
            <DualPills snap={back} />
          </div>
        ) : null}
        <div
          className={`candy-caption__layer candy-caption__layer--in${
            back ? " is-fading-in" : ""
          }`}
        >
          <DualPills snap={front} />
        </div>
      </div>
    </div>
  );
}

function DualPills({ snap }: { snap: CaptionSnapshot }) {
  return (
    <div className="candy-caption__dual">
      <div
        className="candy-caption__meta-pill"
        style={{ backgroundColor: snap.bg, color: snap.fg }}
      >
        <span className="candy-caption__chapter">{snap.chapter}</span>
        <span className="candy-caption__label">{snap.label}</span>
      </div>
      <div
        className="candy-caption__quote-pill"
        style={{ backgroundColor: snap.bg, color: snap.fg }}
      >
        <p className="candy-caption__copy">{snap.copy}</p>
      </div>
    </div>
  );
}
