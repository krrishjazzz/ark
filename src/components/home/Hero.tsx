"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
        <div className="hero-ken-burns absolute inset-0">
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
        </div>
      </motion.div>

      <div className="hero-reveal-shadow pointer-events-none absolute inset-0 z-[1]" aria-hidden />

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 50%, transparent 35%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Micro CTA strip — art stays dominant */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-8 pt-16 bg-gradient-to-t from-background via-background/70 to-transparent"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
          <Link
            href="/collections/cars"
            className="font-button text-[9px] sm:text-[10px] uppercase tracking-[0.18em] px-7 py-3 rounded-sm bg-gold text-background hover:bg-gold-light transition-all duration-500 text-center min-w-[180px]"
          >
            Explore Collection
          </Link>
          <Link
            href="/custom-orders"
            className="font-button text-[9px] sm:text-[10px] uppercase tracking-[0.18em] px-7 py-3 rounded-sm border border-gold/50 text-gold hover:border-gold hover:bg-gold/5 transition-all duration-500 text-center min-w-[180px]"
          >
            Custom Order
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
