"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeIn, staggerContainer, staggerItem } from "@/components/animations/FadeIn";
import { collections } from "@/lib/data/collections";

export function FeaturedCollections() {
  return (
    <section className="section-padding px-6 lg:px-8" aria-label="Featured Collections">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Collections"
          title="Featured Collections"
          description="Explore our curated series — each a testament to passion, precision, and permanent beauty."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {collections.map((collection) => (
            <motion.div key={collection.id} variants={staggerItem}>
              <Link
                href={`/collections/${collection.slug}`}
                className="group block relative overflow-hidden rounded-[20px] border border-border gold-glow-hover shadow-lift"
              >
                <div className="relative aspect-[3/4] image-zoom-container">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-button text-[9px] uppercase tracking-[0.2em] text-gold mb-2">
                        {collection.tagline}
                      </p>
                      <h3 className="font-heading text-2xl md:text-3xl font-light text-foreground">
                        {collection.name}
                      </h3>
                      <p className="text-xs text-grey mt-2">
                        {collection.productCount} pieces
                      </p>
                    </div>
                    <div className="h-10 w-10 flex items-center justify-center rounded-full border border-gold/30 text-gold opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
