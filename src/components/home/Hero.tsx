"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { IMAGES, BRAND } from "@/lib/constants";

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, -40]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[640px] bg-[#090909] overflow-hidden"
      aria-label="Hero"
    >
      {/* High-res cinematic background */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: imageScale }}
        initial={{ scale: 1.03 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={IMAGES.heroBg}
          alt=""
          fill
          className="object-cover object-center"
          priority
          unoptimized
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
      </motion.div>

      {/* Content — rendered in code for sharp text at any resolution */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5"
        >
          <Image
            src={IMAGES.logo}
            alt={BRAND.name}
            width={88}
            height={88}
            className="object-contain drop-shadow-[0_4px_30px_rgba(201,164,91,0.35)]"
            priority
            unoptimized
          />
        </motion.div>

        <motion.p
          className="font-button text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-gold mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.35, duration: 0.7 }}
        >
          {BRAND.fullName}
        </motion.p>

        <motion.p
          className="font-button text-[8px] sm:text-[9px] uppercase tracking-[0.45em] text-foreground/45 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.45, duration: 0.7 }}
        >
          Luxury · Craftsmanship · Passion
        </motion.p>

        <motion.h1
          className="font-heading text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-light uppercase leading-[1.08] tracking-wide"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-gold-gradient">Beyond Cars.</span>
          <br />
          <span className="text-gold-gradient">Beyond Limits.</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-md text-sm sm:text-base text-foreground/55 font-light leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.65, duration: 0.7 }}
        >
          {BRAND.description}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.7 }}
        >
          <Link
            href="/collections"
            className="font-button text-[10px] uppercase tracking-[0.18em] px-9 py-3.5 rounded-sm bg-gold text-background hover:bg-gold-light transition-all duration-500 hover:scale-[1.03] min-w-[200px] text-center"
          >
            Explore Collection
          </Link>
          <Link
            href="/about"
            className="font-button text-[10px] uppercase tracking-[0.18em] px-9 py-3.5 rounded-sm border border-gold/50 text-gold hover:border-gold hover:bg-gold/5 transition-all duration-500 hover:scale-[1.03] flex items-center justify-center gap-2.5 min-w-[200px]"
          >
            <Play size={11} className="fill-gold shrink-0" />
            Watch Story
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.8 }}
      >
        <span className="font-button text-[8px] uppercase tracking-[0.35em] text-foreground/35">
          Scroll to Discover
        </span>
        <div className="w-5 h-8 rounded-full border border-foreground/15 flex items-start justify-center pt-1.5">
          <motion.div
            className="w-[3px] h-[5px] rounded-full bg-gold/60"
            animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
