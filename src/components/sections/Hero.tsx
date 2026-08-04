/**
 * Hero — movie-poster compositing (lilfrogeth motion language, original assets)
 *
 * Layers (back → front):
 * 1. Text-free atmospheric background PNG
 * 2. HTML flowing typography
 * 3. Independent transparent frog PNG (floating poster subject)
 * 4. HTML brand lockup
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
        <div className="flex w-[155%] rotate-[-8deg] flex-col gap-[0.08em]">
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

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 48% 58% at 50% 52%, transparent 0%, rgba(10,4,20,0.22) 100%)",
        }}
      />

      {/* 3. Frog — dominant floating subject (reference: lilfrogeth character presence) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-2 pt-10 md:pt-6">
        <div className="hero-frog-stage relative flex h-[min(92svh,900px)] w-full max-w-[720px] items-end justify-center md:max-w-[780px]">
          <div className="hero-frog-glow" aria-hidden="true" />
          <div className="hero-frog-shadow" aria-hidden="true" />
          <img
            src="/assets/hero/hero-frog.png"
            alt="嗷嗚計畫青蛙角色"
            width={1376}
            height={1900}
            fetchPriority="high"
            decoding="async"
            className="hero-frog relative z-[1] h-[min(86svh,860px)] w-auto max-w-[min(96vw,640px)] object-contain object-bottom md:max-w-[min(72vw,700px)]"
          />
        </div>
      </div>

      {/* 4. Brand lockup — HTML only */}
      <div className="absolute bottom-7 right-4 z-20 text-right md:bottom-11 md:right-10">
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
