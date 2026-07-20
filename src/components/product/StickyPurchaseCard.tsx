"use client";

import { useState } from "react";
import { Heart, ShoppingBag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { getProductPrimaryImage } from "@/lib/images";
import { SIZES, FRAME_OPTIONS } from "@/lib/constants";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface StickyPurchaseCardProps {
  product: Product;
}

export function StickyPurchaseCard({ product }: StickyPurchaseCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>(SIZES[1].value);
  const [selectedFrame, setSelectedFrame] = useState<string>(FRAME_OPTIONS[0].value);
  const { addToCart, calculatePrice, toggleWishlist, isInWishlist } = useStore();

  const price = calculatePrice(product.basePrice, selectedSize);
  const wished = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: getProductPrimaryImage(product.images),
      size: selectedSize,
      frame: selectedFrame,
      price,
    });
  };

  return (
    <div className="sticky top-28 rounded-[20px] border border-border bg-card p-8 shadow-luxury">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-button text-[9px] uppercase tracking-[0.2em] text-gold mb-2">
            {product.series}
          </p>
          <h1 className="font-heading text-2xl md:text-3xl font-light text-foreground">
            {product.name}
          </h1>
        </div>
        <Badge variant="gold">
          {product.edition.current}/{product.edition.total}
        </Badge>
      </div>

      <p className="text-grey text-sm leading-relaxed mb-6">{product.description}</p>

      <p className="font-heading text-3xl text-gold mb-8">{formatPrice(price)}</p>

      {/* Size selector */}
      <div className="mb-6">
        <p className="font-button text-[10px] uppercase tracking-[0.2em] text-grey mb-3">
          Size
        </p>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size.value}
              onClick={() => setSelectedSize(size.value)}
              className={cn(
                "font-button text-[9px] uppercase tracking-wider px-4 py-2.5 rounded-full border transition-all duration-300",
                selectedSize === size.value
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border text-grey hover:border-gold/30"
              )}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Frame selector */}
      <div className="mb-8">
        <p className="font-button text-[10px] uppercase tracking-[0.2em] text-grey mb-3">
          Frame
        </p>
        <div className="flex gap-3">
          {FRAME_OPTIONS.map((frame) => (
            <button
              key={frame.value}
              onClick={() => setSelectedFrame(frame.value)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300",
                selectedFrame === frame.value
                  ? "border-gold bg-gold/10"
                  : "border-border hover:border-gold/30"
              )}
            >
              <span
                className="h-4 w-4 rounded-full border border-border"
                style={{ backgroundColor: frame.hex }}
              />
              <span className="font-button text-[9px] uppercase tracking-wider text-grey">
                {frame.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <Button variant="gold" className="flex-1" onClick={handleAddToCart}>
          <ShoppingBag size={16} />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} className={wished ? "fill-gold text-gold" : ""} />
        </Button>
        <Button variant="outline" size="icon" aria-label="Share">
          <Share2 size={16} />
        </Button>
      </div>

      <p className="text-xs text-grey text-center">
        Edition {product.edition.current} of {product.edition.total} — Secure checkout with insured shipping
      </p>
    </div>
  );
}
