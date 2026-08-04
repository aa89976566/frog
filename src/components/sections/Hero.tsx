/**
 * Hero — Drive campaign artwork only.
 * Original JPEG kept at public/assets/hero/hero-main.jpg (1024×576).
 * Display uses Real-ESRGAN 4× assets for crisp full-viewport delivery.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative h-[100svh] w-full overflow-hidden bg-black"
      aria-label="嗨嗨計畫主視覺"
    >
      <h1 className="sr-only">嗨嗨計畫｜匠寵｜青蛙誰在怕</h1>
      <picture>
        <source
          type="image/avif"
          srcSet="/assets/hero/hero-display-2048.avif 2048w, /assets/hero/hero-display.avif 4096w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/assets/hero/hero-display-2048.webp 2048w, /assets/hero/hero-display.webp 4096w"
          sizes="100vw"
        />
        <img
          src="/assets/hero/hero-display.jpg"
          alt="嗨嗨計畫｜匠寵｜青蛙誰在怕"
          width={4096}
          height={2304}
          fetchPriority="high"
          decoding="async"
          className="hero-photo absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>
    </section>
  );
}
