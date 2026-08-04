/**
 * Hero — campaign artwork over flowing background typography.
 * Motion language inspired by lilfrogeth.com (no copied assets).
 * Copy: 青蛙誰在怕 / 嗷嗚計畫
 */

const LINE_A = "青蛙誰在怕　嗷嗚計畫　青蛙誰在怕　嗷嗚計畫　";
const LINE_B = "嗷嗚計畫　青蛙誰在怕　嗷嗚計畫　青蛙誰在怕　";
const ROWS = 10;

export function Hero() {
  return (
    <section
      id="top"
      className="hero-scene relative h-[100svh] w-full overflow-hidden"
      aria-label="嗷嗚計畫主視覺"
    >
      <h1 className="sr-only">嗷嗚計畫｜匠寵｜青蛙誰在怕</h1>

      {/* Atmospheric field sampled from artwork */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 80% 55% at 18% 22%, #c43b9a 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 84% 16%, #5e28b0 0%, transparent 50%),
            radial-gradient(ellipse 90% 65% at 50% 95%, #1a0838 0%, transparent 55%),
            linear-gradient(158deg, #4a1578 0%, #14061f 42%, #3a0f52 100%)
          `,
        }}
      />

      {/* Flowing oversized typography wall — reference-style marquee */}
      <div
        className="pointer-events-none absolute inset-[-14%] z-[1] flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="hero-type-wall flex w-[150%] rotate-[-8deg] flex-col gap-[0.08em]">
          {Array.from({ length: ROWS }).map((_, i) => {
            const reverse = i % 2 === 1;
            const text = reverse ? LINE_B : LINE_A;
            return (
              <div
                key={i}
                className="overflow-hidden whitespace-nowrap leading-[0.84]"
              >
                <div
                  className={`hero-marquee-track inline-block font-black tracking-tight text-[#f5e14a]/[0.92] ${
                    reverse ? "hero-marquee-rev" : "hero-marquee"
                  }`}
                  style={{
                    fontSize: "clamp(2.8rem, 12vw, 8.75rem)",
                    textShadow: "0 2px 0 rgba(0,0,0,0.28)",
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

      {/* Soft vignette so artwork stays readable */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 58% 62% at 50% 48%, transparent 10%, rgba(8,2,18,0.42) 100%)",
        }}
      />

      {/* Dominant artwork — high-res display assets */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-0 pt-4 md:pt-2">
        <div className="relative h-[min(88svh,920px)] w-full max-w-[1400px]">
          <picture>
            <source
              type="image/avif"
              srcSet="/assets/hero/hero-display-2048.avif 2048w, /assets/hero/hero-display.avif 4096w"
              sizes="(max-width: 768px) 100vw, min(100vw, 1400px)"
            />
            <source
              type="image/webp"
              srcSet="/assets/hero/hero-display-2048.webp 2048w, /assets/hero/hero-display.webp 4096w"
              sizes="(max-width: 768px) 100vw, min(100vw, 1400px)"
            />
            <img
              src="/assets/hero/hero-display.jpg"
              alt="嗷嗚計畫｜匠寵｜青蛙誰在怕"
              width={4096}
              height={2304}
              fetchPriority="high"
              decoding="async"
              className="hero-photo h-full w-full object-contain object-center drop-shadow-[0_28px_60px_rgba(0,0,0,0.45)]"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
