/**
 * Hero — movie-poster compositing
 *
 * Layers (back → front):
 * 1. Text-free atmospheric background PNG
 * 2. HTML flowing typography (never rasterized into images)
 * 3. Independent transparent frog PNG
 * 4. HTML brand lockup
 *
 * Source flattened JPEG kept only as archive: public/assets/hero/hero-main.jpg
 */

const LINE_A = "青蛙誰在怕　嗷嗚計畫　青蛙誰在怕　嗷嗚計畫　";
const LINE_B = "嗷嗚計畫　青蛙誰在怕　嗷嗚計畫　青蛙誰在怕　";
const ROWS = 10;

export function Hero() {
  return (
    <section
      id="top"
      className="hero-scene relative h-[100svh] w-full overflow-hidden bg-[#16061f]"
      aria-label="嗷嗚計畫主視覺"
    >
      <h1 className="sr-only">嗷嗚計畫｜匠寵｜青蛙誰在怕</h1>

      {/* 1. Background artwork — no typography */}
      <img
        src="/assets/hero/hero-bg.png"
        srcSet="/assets/hero/hero-bg-1920.png 1920w, /assets/hero/hero-bg.png 2560w"
        sizes="100vw"
        alt=""
        width={2560}
        height={1440}
        fetchPriority="high"
        decoding="async"
        aria-hidden="true"
        className="hero-bg absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* 2. HTML typography wall — animates independently */}
      <div
        className="pointer-events-none absolute inset-[-12%] z-[1] flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="flex w-[150%] rotate-[-8deg] flex-col gap-[0.08em]">
          {Array.from({ length: ROWS }).map((_, i) => {
            const reverse = i % 2 === 1;
            const text = reverse ? LINE_B : LINE_A;
            return (
              <div
                key={i}
                className="overflow-hidden whitespace-nowrap leading-[0.84]"
              >
                <div
                  className={`hero-marquee-track inline-block font-black tracking-tight text-[#f5e14a] ${
                    reverse ? "hero-marquee-rev" : "hero-marquee"
                  }`}
                  style={{
                    fontSize: "clamp(2.8rem, 12vw, 8.75rem)",
                    textShadow: "0 2px 0 rgba(0,0,0,0.25)",
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

      {/* Soft depth so frog stays readable over type */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 55%, transparent 0%, rgba(10,4,20,0.28) 100%)",
        }}
      />

      {/* 3. Frog — independent transparent PNG */}
      <div className="absolute inset-0 z-10 flex items-end justify-center px-2 pb-0 pt-16 md:items-center md:pt-10">
        <img
          src="/assets/hero/hero-frog.png"
          alt="嗷嗚計畫青蛙角色"
          width={877}
          height={1215}
          fetchPriority="high"
          decoding="async"
          className="hero-frog h-[min(88svh,820px)] w-auto max-w-[min(92vw,560px)] object-contain object-bottom drop-shadow-[0_24px_50px_rgba(0,0,0,0.45)] md:max-w-[min(70vw,640px)]"
        />
      </div>

      {/* 4. Brand lockup — HTML only */}
      <div className="absolute bottom-8 right-4 z-20 text-right md:bottom-12 md:right-10">
        <p
          className="font-black text-4xl leading-none tracking-wide md:text-6xl"
          style={{
            color: "#ffd24a",
            textShadow:
              "0 0 16px rgba(255,80,180,0.45), 3px 3px 0 #1a0a2e, -1px -1px 0 #ff4db8",
          }}
        >
          匠寵
        </p>
        <span className="mt-2 inline-block rounded-full bg-black/85 px-4 py-1.5 text-xs tracking-[0.2em] text-white md:text-sm">
          嗷嗚計畫
        </span>
      </div>
    </section>
  );
}
