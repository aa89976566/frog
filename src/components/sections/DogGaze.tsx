"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function DogGaze() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-10%"]);

  return (
    <section
      id="gaze"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-canopy"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src="/images/dog-gaze.jpg"
          alt="一隻好奇的狗望向遠方草叢，畫面中沒有青蛙"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-[50%_35%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, rgba(10,26,18,0.55) 0%, transparent 28%, transparent 55%, rgba(10,26,18,0.85) 100%),
              linear-gradient(90deg, rgba(10,26,18,0.45) 0%, transparent 40%)
            `,
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-20 md:px-12 md:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="max-w-xl font-display text-4xl leading-[1.05] text-cream-ink md:text-6xl lg:text-7xl"
        >
          Every dog keeps
          <br />
          chasing them.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="mt-6 max-w-md text-lg text-fog-type md:text-xl"
        >
          沒人抓到過。畫面裡也沒有青蛙——
          <br />
          只有一雙望向遠方的眼睛。
        </motion.p>
      </motion.div>
    </section>
  );
}
