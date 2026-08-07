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
 * Lil-Frogeth-style bottom capsule.
 * Content crossfades when the next act hits ~35% viewport —
 * never late, never blank.
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

  // Adjust state during render when props change (React-approved pattern)
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
            <PillBody snap={back} />
          </div>
        ) : null}
        <div
          className={`candy-caption__layer candy-caption__layer--in${
            back ? " is-fading-in" : ""
          }`}
        >
          <PillBody snap={front} />
        </div>
      </div>
    </div>
  );
}

function PillBody({ snap }: { snap: CaptionSnapshot }) {
  return (
    <div
      className="candy-caption__pill"
      style={{ backgroundColor: snap.bg, color: snap.fg }}
    >
      <div className="candy-caption__meta">
        <span className="candy-caption__chapter">{snap.chapter}</span>
        <span className="candy-caption__label">{snap.label}</span>
      </div>
      <span className="candy-caption__rule" aria-hidden="true" />
      <p className="candy-caption__copy">{snap.copy}</p>
    </div>
  );
}
