"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { getProductPrimaryImage } from "@/lib/images";
import { ProductPrice } from "@/components/product/ProductPrice";
import { isComingSoonCollection } from "@/lib/data/collections";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useStore();
  const wished = isInWishlist(product.id);
  const comingSoon = isComingSoonCollection(product.collection);

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-[20px] border border-border gold-glow-hover shadow-lift overflow-hidden bg-card",
        className
      )}
    >
      <Link href={`/products/${product.slug}`} className="flex h-full flex-col">
        {/* Image — shorter on phone so cards aren't full-screen tall */}
        <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full shrink-0 overflow-hidden bg-[#1a1a1a] image-zoom-container">
          <Image
            src={getProductPrimaryImage(product.images)}
            alt={product.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent pointer-events-none" />

          <div className="absolute top-4 left-4 max-sm:top-2 max-sm:left-2">
            <Badge variant="gold" className="max-sm:text-[8px] max-sm:px-2 max-sm:py-0.5">
              {product.edition.current}/{product.edition.total}
            </Badge>
          </div>

          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-sm:hidden">
            <div className="h-10 w-10 flex items-center justify-center rounded-full border border-gold/30 bg-background/80 text-gold">
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>

        {/* Compact text on phone; taller locked height on desktop for equal cards */}
        <div className="flex flex-1 flex-col p-2.5 sm:p-6 gold-line min-h-0 sm:min-h-[11rem]">
          <p className="font-button text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-gold mb-0.5 sm:mb-2 line-clamp-1">
            {product.series}
          </p>
          <h3 className="font-heading text-[13px] sm:text-xl font-light text-foreground group-hover:text-gold transition-colors duration-500 line-clamp-2 leading-snug sm:min-h-[2.75em]">
            {product.name}
          </h3>
          <p className="text-xs text-grey mt-1 line-clamp-1 min-h-[1rem] hidden sm:block">
            {product.tagline || "\u00A0"}
          </p>
          <div className="mt-auto pt-1.5 sm:pt-3">
            {comingSoon ? (
              <p className="font-button text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-gold/70">
                Coming Soon
              </p>
            ) : (
              <ProductPrice
                price={product.basePrice}
                compareAtPrice={product.compareAtPrice}
                size="sm"
                className="max-sm:[&_span]:text-xs"
              />
            )}
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className={cn(
          "absolute top-2 right-2 sm:top-4 sm:right-14 z-10 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full border transition-all duration-300",
          wished
            ? "border-gold bg-gold/10 text-gold"
            : "border-border bg-background/60 text-grey max-sm:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:text-gold hover:border-gold/30"
        )}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart size={16} className={wished ? "fill-gold" : ""} />
      </button>
    </div>
  );
}
