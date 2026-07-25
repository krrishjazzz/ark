"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { cn } from "@/lib/utils";
import { resolveImageSrc } from "@/lib/images";

interface GalleryImage {
  id: string;
  image: string;
  category: string;
  alt: string;
}

interface CustomerGalleryProps {
  images: GalleryImage[];
  variant?: "strip" | "grid";
}

function getCategories(images: GalleryImage[]) {
  return ["All", ...Array.from(new Set(images.map((item) => item.category)))];
}

function GalleryStrip({ images }: { images: GalleryImage[] }) {
  const loop = [...images, ...images];
  const duration = `${Math.max(images.length * 4.5, 24)}s`;

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 z-10 bg-gradient-to-r from-card to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 z-10 bg-gradient-to-l from-card to-transparent" />

      <div
        className="gallery-marquee-track flex gap-3 sm:gap-4 w-max"
        style={{ ["--gallery-duration" as string]: duration }}
      >
        {loop.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="group relative w-[200px] sm:w-[240px] h-[150px] sm:h-[180px] shrink-0 rounded-[12px] overflow-hidden border border-border shadow-lift"
          >
            <Image
              src={resolveImageSrc(item.image)}
              alt={item.alt}
              fill
              className="gallery-zoom-image object-cover transition-transform duration-700"
              sizes="240px"
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
            <div className="absolute bottom-2.5 left-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="font-button text-[8px] uppercase tracking-[0.2em] text-gold">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((item) => item.category === activeCategory);
  const categoryList = getCategories(images);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categoryList.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "font-button text-[10px] uppercase tracking-[0.15em] px-5 py-2.5 rounded-full border transition-all duration-500",
              activeCategory === cat
                ? "border-gold/50 text-gold bg-gold/5"
                : "border-border text-grey hover:border-gold/30 hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="columns-2 sm:columns-2 lg:columns-3 gap-3 sm:gap-6 space-y-3 sm:space-y-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="break-inside-avoid"
            >
              <div className="group relative rounded-[20px] overflow-hidden border border-border gold-glow-hover shadow-lift image-zoom-container">
                <Image
                  src={resolveImageSrc(item.image)}
                  alt={item.alt}
                  width={600}
                  height={index % 2 === 0 ? 800 : 500}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-button text-[9px] uppercase tracking-[0.2em] text-gold">
                    {item.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export function CustomerGallery({
  images,
  variant = "strip",
}: CustomerGalleryProps) {
  if (images.length === 0) return null;

  return (
    <section
      className={cn(
        "px-6 lg:px-8 bg-card/30",
        variant === "strip" ? "py-12 md:py-16" : "section-padding"
      )}
      aria-label="Customer Gallery"
    >
      <div className="mx-auto max-w-7xl">
        {variant === "strip" ? (
          <>
            <div className="text-center mb-6 md:mb-8">
              <p className="font-button text-[9px] uppercase tracking-[0.28em] text-gold mb-2">
                In Situ
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-light text-foreground">
                Customer Gallery
              </h2>
            </div>
            <GalleryStrip images={images} />
          </>
        ) : (
          <>
            <SectionHeading
              label="In Situ"
              title="Customer Gallery"
              description="See how collectors around the world display their ARK masterpieces."
            />
            <GalleryGrid images={images} />
          </>
        )}
      </div>
    </section>
  );
}
