"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeIn, staggerContainer, staggerItem } from "@/components/animations/FadeIn";
import { Badge } from "@/components/ui/badge";
import { resolveImageSrc } from "@/lib/images";
import type { Collection } from "@/types";
import { cn } from "@/lib/utils";

interface FeaturedCollectionsProps {
  collections: Collection[];
}

function CollectionCard({ collection }: { collection: Collection }) {
  const isComingSoon = collection.comingSoon;
  const hasPreview = isComingSoon && collection.productCount > 0;

  const card = (
    <div
      className={cn(
        "group block relative overflow-hidden rounded-[20px] border border-border gold-glow-hover shadow-lift cursor-pointer",
        isComingSoon && "opacity-90"
      )}
    >
      <div className="relative aspect-[3/4] image-zoom-container">
        <Image
          src={resolveImageSrc(collection.image)}
          alt={collection.name}
          fill
          className={cn("object-cover", isComingSoon && "grayscale-[30%]")}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />

        {isComingSoon && (
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="gap-1.5 bg-background/80">
              <Clock size={10} />
              Coming Soon
            </Badge>
          </div>
        )}
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
              {isComingSoon
                ? hasPreview
                  ? `${collection.productCount} pieces to preview`
                  : "Launching soon"
                : `${collection.productCount} pieces available`}
            </p>
          </div>
          <div className="h-10 w-10 flex items-center justify-center rounded-full border border-gold/30 text-gold opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Link href={`/collections/${collection.slug}`} className="block">
      {card}
    </Link>
  );
}

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  const active = collections.filter((c) => !c.comingSoon);
  const upcoming = collections.filter((c) => c.comingSoon);

  return (
    <section className="section-padding px-6 lg:px-8" aria-label="Featured Collections">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Collections"
          title="Featured Collections"
          description="All cars possible — plus wine & spirits, motorcycles, and Marvel heroes arriving soon."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {active.map((collection) => (
            <motion.div key={collection.id} variants={staggerItem}>
              <CollectionCard collection={collection} />
            </motion.div>
          ))}
        </motion.div>

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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
