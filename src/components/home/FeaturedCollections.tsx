"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeIn, staggerContainer, staggerItem } from "@/components/animations/FadeIn";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/ProductCard";
import { resolveImageSrc } from "@/lib/images";
import { isComingSoonCollection } from "@/lib/data/collections";
import type { Collection, Product } from "@/types";
import { cn } from "@/lib/utils";

interface FeaturedCollectionsProps {
  collections: Collection[];
  products: Product[];
}

function CollectionCard({ collection }: { collection: Collection }) {
  const hasPreview = collection.productCount > 0;

  return (
    <Link href={`/collections/${collection.slug}`} className="block">
      <div className="group relative overflow-hidden rounded-[20px] border border-border gold-glow-hover shadow-lift cursor-pointer opacity-90 hover:opacity-100 transition-opacity">
        <div className="relative aspect-[4/5] sm:aspect-[3/4] image-zoom-container">
          <Image
            src={resolveImageSrc(collection.image)}
            alt={collection.name}
            fill
            className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />

          <div className="absolute top-4 right-4 max-sm:top-2 max-sm:right-2">
            <Badge variant="outline" className="gap-1 max-sm:gap-0.5 bg-background/80 max-sm:text-[8px] max-sm:px-1.5 max-sm:py-0.5">
              <Clock size={10} className="max-sm:w-2 max-sm:h-2" />
              <span className="max-sm:hidden">Coming Soon</span>
              <span className="sm:hidden">Soon</span>
            </Badge>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 md:p-8">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <p className="font-button text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-gold mb-1 sm:mb-2 line-clamp-1">
                {collection.tagline}
              </p>
              <h3 className="font-heading text-base sm:text-2xl md:text-3xl font-light text-foreground line-clamp-2 leading-snug">
                {collection.name}
              </h3>
              <p className="text-[10px] sm:text-xs text-grey mt-1 sm:mt-2 line-clamp-1">
                {hasPreview
                  ? `${collection.productCount} pieces to preview`
                  : "Launching soon"}
              </p>
            </div>
            <div className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 flex items-center justify-center rounded-full border border-gold/30 text-gold opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 max-sm:opacity-100">
              <ArrowUpRight size={14} className="sm:hidden" />
              <ArrowUpRight size={16} className="hidden sm:block" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedCollections({ collections, products }: FeaturedCollectionsProps) {
  const upcoming = collections.filter((c) => c.comingSoon);
  const liveProducts = products.filter((p) => !isComingSoonCollection(p.collection));
  const liveCollections = collections.filter((c) => !c.comingSoon);

  return (
    <section className="section-padding px-6 lg:px-8" aria-label="Featured Collections">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Collections"
          title="Featured Collections"
          description="Shop our live pieces today. Explore upcoming collections and preview what's launching next."
        />

        {liveProducts.length > 0 && (
          <div className="mb-20">
            <FadeIn>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                <div>
                  <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
                    Available Now
                  </p>
                  <h3 className="font-heading text-3xl md:text-4xl font-light text-foreground">
                    {liveCollections[0]?.name ?? "Shop Now"}
                  </h3>
                  <p className="text-sm text-grey mt-2 max-w-xl">
                    {liveCollections[0]?.description ??
                      "Handcrafted resin masterpieces — ready to order."}
                  </p>
                </div>
                {liveCollections[0] && (
                  <Link
                    href={`/collections/${liveCollections[0].slug}`}
                    className="font-button text-[10px] uppercase tracking-[0.2em] text-gold hover:text-gold-light transition-colors shrink-0"
                  >
                    View collection →
                  </Link>
                )}
              </div>
            </FadeIn>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
            >
              {liveProducts.map((product) => (
                <motion.div key={product.id} variants={staggerItem}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {upcoming.length > 0 && (
          <>
            <FadeIn>
              <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-8 text-center">
                Coming Soon
              </p>
            </FadeIn>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className={cn(
                "grid grid-cols-2 gap-3 sm:gap-6",
                upcoming.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
              )}
            >
              {upcoming.map((collection) => (
                <motion.div key={collection.id} variants={staggerItem}>
                  <CollectionCard collection={collection} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
