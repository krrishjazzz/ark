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
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] bg-[#090909] overflow-hidden md:h-[100svh] md:min-h-[640px]"
      aria-label="Hero"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center md:block"
        style={{ scale: imageScale }}
        initial={{ scale: 1.03 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: [0.16, 1, 0.3, 1] }}
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
    </section>
  );
}
