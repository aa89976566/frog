"use client";

/**
 * Giant condensed type on black negative-space — pale acid yellow,
 * cropped past viewport edges. Passes behind/over plates via z-layers.
 */
export function TypeInterlude({
  text,
  layer = "behind",
}: {
  text: string;
  layer?: "behind" | "over";
}) {
  return (
    <div
      className={`type-interlude type-interlude--${layer}`}
      aria-hidden="true"
      data-type-interlude
    >
      <span className="type-interlude__text">{text}</span>
    </div>
  );
}
