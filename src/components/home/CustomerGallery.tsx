"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { cn } from "@/lib/utils";

interface GalleryImage {
  id: string;
  image: string;
  category: string;
  alt: string;
}

interface CustomerGalleryProps {
  images: GalleryImage[];
}

function getCategories(images: GalleryImage[]) {
  return ["All", ...Array.from(new Set(images.map((item) => item.category)))];
}

export function CustomerGallery({ images }: CustomerGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((item) => item.category === activeCategory);

  const categoryList = getCategories(images);

  return (
    <section className="section-padding px-6 lg:px-8 bg-card/30" aria-label="Customer Gallery">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="In Situ"
          title="Customer Gallery"
          description="See how collectors around the world display their ARK masterpieces."
        />

        {/* Category filters */}
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

        {/* Masonry grid */}
        <motion.div layout className="columns-2 sm:columns-2 lg:columns-3 gap-3 sm:gap-6 space-y-3 sm:space-y-6">
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
                    src={item.image}
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
      </div>
    </section>
  );
}
