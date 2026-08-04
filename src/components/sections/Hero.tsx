/**
 * Hero — single visual plane: full-bleed PNG + blended flowing type.
 * No floating card / separate layer framing.
 * Copy: 青蛙誰在怕 / 嗷嗚計畫
 */

const LINE_A = "青蛙誰在怕　嗷嗚計畫　青蛙誰在怕　嗷嗚計畫　";
const LINE_B = "嗷嗚計畫　青蛙誰在怕　嗷嗚計畫　青蛙誰在怕　";
const ROWS = 9;

export function Hero() {
  return (
    <section
      id="top"
      className="hero-scene relative h-[100svh] w-full overflow-hidden bg-[#1a0838]"
      aria-label="嗷嗚計畫主視覺"
    >
      <h1 className="sr-only">嗷嗚計畫｜匠寵｜青蛙誰在怕</h1>

      {/* Base artwork — full-bleed PNG, edge to edge */}
      <img
        src="/assets/hero/hero-display.png"
        srcSet="/assets/hero/hero-display-1920.png 1920w, /assets/hero/hero-display.png 2880w"
        sizes="100vw"
        alt="嗷嗚計畫｜匠寵｜青蛙誰在怕"
        width={2880}
        height={1620}
        fetchPriority="high"
        decoding="async"
        className="hero-photo absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Flowing type fused into the image plane (not a separate card layer) */}
      <div
        className="hero-type-fuse pointer-events-none absolute inset-[-12%] flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="flex w-[150%] rotate-[-8deg] flex-col gap-[0.06em]">
          {Array.from({ length: ROWS }).map((_, i) => {
            const reverse = i % 2 === 1;
            const text = reverse ? LINE_B : LINE_A;
            return (
              <div
                key={i}
                className="overflow-hidden whitespace-nowrap leading-[0.84]"
              >
                <div
                  className={`hero-marquee-track inline-block font-black tracking-tight text-[#ffe14a] ${
                    reverse ? "hero-marquee-rev" : "hero-marquee"
                  }`}
                  style={{
                    fontSize: "clamp(2.6rem, 11.5vw, 8.25rem)",
                    animationDuration: `${18 + (i % 4) * 3.5}s`,
                    animationDelay: `${(i % 5) * -1.6}s`,
                  }}
                >
                  <span>{text.repeat(4)}</span>
                  <span aria-hidden="true">{text.repeat(4)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
