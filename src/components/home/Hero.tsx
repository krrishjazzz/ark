"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { resolveImageSrc } from "@/lib/images";

export function Hero() {
  const { heroImage } = useSiteSettings();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] bg-[#090909] overflow-hidden md:h-[100svh] md:min-h-[640px]"
      aria-label="Hero"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center md:block will-change-transform"
        style={{ scale: scrollScale }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 18,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Image
            src={resolveImageSrc(heroImage)}
            alt="ARK resin art"
            fill
            className="object-contain object-center md:object-cover md:object-center"
            priority
            quality={100}
            unoptimized
            sizes="100vw"
          />
        </motion.div>
      </motion.div>

      {/* Moving black shadow / light reveal */}
      <div className="hero-reveal-shadow pointer-events-none absolute inset-0 z-[1]" aria-hidden />

      {/* Soft edge vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 50%, transparent 35%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </section>
  );
}
