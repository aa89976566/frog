"use client";

import Image from "next/image";
import { useState } from "react";

const HERO_SRC = "/assets/hero/hero-main.webp";
const HERO_FALLBACK = "/assets/hero/hero-main.jpg";

/** Full-viewport hero — only the provided campaign artwork. */
export function Hero() {
  const [imgSrc, setImgSrc] = useState(HERO_SRC);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#2a0a45]"
      aria-label="嗨嗨計畫主視覺"
    >
      <h1 className="sr-only">嗨嗨計畫｜匠寵｜青蛙誰在怕</h1>
      <Image
        src={imgSrc}
        alt="嗨嗨計畫｜匠寵｜青蛙誰在怕"
        fill
        priority
        sizes="100vw"
        onError={() => setImgSrc(HERO_FALLBACK)}
        className="object-contain object-center"
      />
    </section>
  );
}
