"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { formatPrice } from "@/lib/utils";
import { getProductPrimaryImage } from "@/lib/images";
import { isComingSoonCollection } from "@/lib/data/collections";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";

interface ProductShowcaseProps {
  products: Product[];
  label?: string;
  title?: string;
  description?: string;
}

export function ProductShowcase({
  products,
  label = "Masterpieces",
  title = "Interactive Showcase",
  description = "Explore our signature pieces. Hover to appreciate the depth. Click to discover every detail.",
}: ProductShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="section-padding overflow-hidden" aria-label="Product Showcase">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
        <SectionHeading
          label={label}
          title={title}
          description={description}
        />
      </div>

      <div
        ref={containerRef}
        className="flex gap-8 overflow-x-auto hide-scrollbar px-6 lg:px-8 pb-8 snap-x snap-mandatory"
        data-lenis-prevent
      >
        {products.map((product, index) => (
          <ShowcaseCard
            key={product.id}
            product={product}
            index={index}
            isHovered={hoveredId === product.id}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </section>
  );
}

function ShowcaseCard({
  product,
  index,
  isHovered,
  onHover,
}: {
  product: Product;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const mouseX = useMotionValue(0);
  const rotateY = useTransform(mouseX, [-150, 150], [-8, 8]);
  const comingSoon = isComingSoonCollection(product.collection);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="snap-center shrink-0 w-[320px] md:w-[400px] lg:w-[450px]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
      }}
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={() => {
        onHover(null);
        mouseX.set(0);
      }}
      style={{ rotateY, transformPerspective: 1000 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block rounded-[20px] border border-border gold-glow-hover overflow-hidden shadow-luxury"
      >
        <div className="relative aspect-[3/4] image-zoom-container">
          <Image
            src={getProductPrimaryImage(product.images)}
            alt={product.name}
            fill
            className="object-cover"
            sizes="450px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          {/* Edition counter */}
          <div className="absolute top-4 right-4">
            <Badge variant="gold">
              {product.edition.current}/{product.edition.total}
            </Badge>
          </div>

          {/* Floating shadow effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              boxShadow: isHovered
                ? "inset 0 -80px 80px rgba(201,164,91,0.08)"
                : "inset 0 0 0 rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.6 }}
          />
        </div>

        <div className="p-6 md:p-8 bg-card">
          <p className="font-button text-[9px] uppercase tracking-[0.2em] text-gold mb-2">
            {product.series}
          </p>
          <h3 className="font-heading text-xl md:text-2xl font-light text-foreground group-hover:text-gold transition-colors duration-500">
            {product.name}
          </h3>
          <p className="text-sm text-grey mt-2">{product.tagline}</p>
          {comingSoon ? (
            <p className="font-button text-[9px] uppercase tracking-[0.2em] text-gold/70 mt-4">
              Coming Soon
            </p>
          ) : (
            <p className="text-gold font-light mt-4 text-lg">
              {formatPrice(product.basePrice)}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
