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
        "group relative rounded-[20px] border border-border gold-glow-hover shadow-lift overflow-hidden",
        className
      )}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] sm:aspect-[3/4] image-zoom-container">
          <Image
            src={getProductPrimaryImage(product.images)}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />

          <div className="absolute top-4 left-4 max-sm:top-2 max-sm:left-2">
            <Badge variant="gold" className="max-sm:text-[8px] max-sm:px-2 max-sm:py-0.5">
              {product.edition.current}/{product.edition.total}
            </Badge>
          </div>

          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="h-10 w-10 flex items-center justify-center rounded-full border border-gold/30 bg-background/80 text-gold">
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-6 bg-card gold-line">
          <p className="font-button text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-gold mb-1 sm:mb-2 line-clamp-1">
            {product.series}
          </p>
          <h3 className="font-heading text-sm sm:text-xl font-light text-foreground group-hover:text-gold transition-colors duration-500 line-clamp-2 leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-grey mt-1 hidden sm:block">{product.tagline}</p>
          {comingSoon ? (
            <p className="font-button text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-gold/70 mt-2 sm:mt-3">
              Coming Soon
            </p>
          ) : (
            <ProductPrice
              price={product.basePrice}
              compareAtPrice={product.compareAtPrice}
              size="sm"
              className="mt-2 sm:mt-3 max-sm:[&_span]:text-xs"
            />
          )}
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className={cn(
          "absolute top-4 right-14 z-10 h-10 w-10 flex items-center justify-center rounded-full border transition-all duration-300",
          wished
            ? "border-gold bg-gold/10 text-gold"
            : "border-border bg-background/60 text-grey opacity-0 group-hover:opacity-100 hover:text-gold hover:border-gold/30"
        )}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart size={16} className={wished ? "fill-gold" : ""} />
      </button>
    </div>
  );
}
