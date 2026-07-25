"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { FadeIn, staggerContainer, staggerItem } from "@/components/animations/FadeIn";
import { ProductCard } from "@/components/product/ProductCard";
import { CustomOrderCard } from "@/components/product/CustomOrderCard";
import { resolveImageSrc } from "@/lib/images";
import { isComingSoonCollection } from "@/lib/data/collections";
import {
  buildCollectionInterestMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";
import type { Collection, Product } from "@/types";
import { cn } from "@/lib/utils";

interface FeaturedCollectionsProps {
  collections: Collection[];
  products: Product[];
}

function ComingSoonStrip({ collections }: { collections: Collection[] }) {
  const firstInterestHref = buildWhatsAppUrl(
    buildCollectionInterestMessage(collections[0]?.name ?? "upcoming collection")
  );

  return (
    <div className="pt-8 md:pt-10 mt-10 md:mt-12 border-t border-border/50">
      <FadeIn>
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
          <p className="font-button text-[9px] uppercase tracking-[0.28em] text-grey">
            Coming Soon
          </p>
          <div className="flex items-center gap-4">
            <a
              href={firstInterestHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-button text-[9px] uppercase tracking-[0.2em] text-gold hover:text-gold-light transition-colors"
            >
              Notify me →
            </a>
            <Link
              href="/collections"
              className="font-button text-[9px] uppercase tracking-[0.2em] text-grey hover:text-gold transition-colors"
            >
              All →
            </Link>
          </div>
        </div>
      </FadeIn>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className={cn(
          "grid gap-2 sm:gap-3",
          collections.length >= 3 ? "grid-cols-3" : "grid-cols-2 max-w-md"
        )}
      >
        {collections.map((collection) => (
          <motion.div key={collection.id} variants={staggerItem}>
            <Link href={`/collections/${collection.slug}`} className="group block">
              <div className="relative aspect-[5/3] overflow-hidden rounded-[10px] border border-border/40 opacity-50 group-hover:opacity-75 transition-opacity duration-500">
                <Image
                  src={resolveImageSrc(collection.image)}
                  alt={collection.name}
                  fill
                  className="object-cover grayscale-[60%] group-hover:grayscale-[30%] transition-all duration-700"
                  sizes="(max-width: 640px) 33vw, 240px"
                />
                <div className="absolute inset-0 bg-background/20" />
              </div>
              <div className="mt-2">
                <p className="font-button text-[8px] uppercase tracking-[0.2em] text-grey/60 mb-0.5 flex items-center gap-1">
                  <Clock size={9} />
                  Soon
                </p>
                <h3 className="font-heading text-xs sm:text-sm font-light text-foreground/65 group-hover:text-foreground/85 transition-colors line-clamp-1">
                  {collection.name}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function FeaturedCollections({ collections, products }: FeaturedCollectionsProps) {
  const upcoming = collections.filter((c) => c.comingSoon);
  const liveProducts = products.filter(
    (p) => !isComingSoonCollection(p.collection)
  );
  const liveCollections = collections.filter((c) => !c.comingSoon);

  return (
    <section className="section-padding px-6 lg:px-8" aria-label="Featured Collections">
      <div className="mx-auto max-w-7xl">
        {liveProducts.length > 0 && (
          <>
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
              className="flex flex-wrap justify-center gap-3 sm:gap-5"
            >
              {liveProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={staggerItem}
                  className="w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.875rem)]"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
              <motion.div
                variants={staggerItem}
                className="w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.875rem)]"
              >
                <CustomOrderCard />
              </motion.div>
            </motion.div>
          </>
        )}

        {upcoming.length > 0 && <ComingSoonStrip collections={upcoming} />}
      </div>
    </section>
  );
}
