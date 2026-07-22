"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { IMAGES } from "@/lib/constants";

/** Native resolution of gallery-wall-hd.jpg — avoids upscaling blur on large screens */
const GALLERY_WALL_WIDTH = 1024;
const GALLERY_WALL_HEIGHT = 682;

export function GalleryWallSection() {
  return (
    <section className="section-padding px-6 lg:px-8 bg-[#090909]" aria-label="Gallery display">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 md:mb-10"
        >
          <p className="font-button text-[10px] uppercase tracking-[0.35em] text-gold mb-3">
            Gallery Display
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight max-w-2xl">
            Museum-grade pieces.
            <br />
            <span className="text-gold-gradient">Gallery-ready presence.</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-foreground/60 leading-relaxed max-w-xl">
            Four signature creations — Mustang, Audi, Rolls Royce, and Ferrari F1 — lit and
            presented the way they deserve to be seen.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[20px] overflow-hidden border border-border shadow-luxury bg-black"
        >
          <Image
            src={IMAGES.galleryWallHd}
            alt="ARK resin art collection displayed in a luxury gallery — Mustang, Audi, Rolls Royce, and Ferrari F1 pieces"
            width={GALLERY_WALL_WIDTH}
            height={GALLERY_WALL_HEIGHT}
            className="w-full h-auto max-h-none"
            sizes="(max-width: 1280px) 100vw, 1280px"
            quality={100}
            unoptimized
          />
        </motion.div>

        <div className="mt-8 text-center">
          <Link
            href="/collections/cars"
            className="inline-flex items-center gap-2 font-button text-[10px] uppercase tracking-[0.18em] text-gold hover:text-gold-light transition-colors group"
          >
            View the Cars Collection
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
