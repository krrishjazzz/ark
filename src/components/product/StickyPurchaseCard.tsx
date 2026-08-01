"use client";

import { useState } from "react";
import { Heart, ShoppingBag, Share2, ShieldCheck, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { getProductPrimaryImage } from "@/lib/images";
import { ProductPrice } from "@/components/product/ProductPrice";
import { ProductMobileBuyBar } from "@/components/product/ProductMobileBuyBar";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { resolveProductFrames, resolveProductSizes } from "@/lib/commerce";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buildProductEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

interface StickyPurchaseCardProps {
  product: Product;
  comingSoon?: boolean;
}

export function StickyPurchaseCard({ product, comingSoon = false }: StickyPurchaseCardProps) {
  const siteSettings = useSiteSettings();
  const sizes = resolveProductSizes(product, siteSettings.sizes);
  const frames = resolveProductFrames(product, siteSettings.frames);
  const defaultSize = sizes[1]?.value ?? sizes[0]?.value ?? "";
  const defaultFrame = frames[0]?.value ?? "";
  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);
  const [selectedFrame, setSelectedFrame] = useState<string>(defaultFrame);
  const { addToCart, calculatePrice, toggleWishlist, isInWishlist } = useStore();

  const price = calculatePrice(
    product.basePrice,
    selectedSize,
    sizes,
    selectedFrame,
    frames
  );
  const compareAtPrice = product.compareAtPrice
    ? calculatePrice(
        product.compareAtPrice,
        selectedSize,
        sizes,
        selectedFrame,
        frames
      )
    : undefined;
  const wished = isInWishlist(product.id);
  const whatsappHref = buildWhatsAppUrl(
    buildProductEnquiryMessage(product.name, comingSoon)
  );

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

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
      } catch {
        /* user cancelled */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <div className="sticky top-28 rounded-[20px] border border-border bg-card p-8 shadow-luxury mb-24 lg:mb-0">
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

        {comingSoon ? (
          <>
            <p className="font-button text-[10px] uppercase tracking-[0.25em] text-gold/80 mb-4">
              Coming Soon — Preview Only
            </p>
            <p className="text-sm text-grey mb-6">
              Not for purchase yet. Register interest and we&apos;ll notify you at launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Button asChild variant="gold" className="flex-1 btn-shimmer">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp — Notify Me
                </a>
              </Button>
              <Button asChild variant="outline" className="flex-1 sm:flex-none sm:px-6">
                <Link href="/contact">Contact</Link>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={() => toggleWishlist(product.id)}
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={16} className={wished ? "fill-gold text-gold" : ""} />
              </Button>
            </div>
            <p className="text-xs text-grey text-center">
              Edition {product.edition.current} of {product.edition.total} — launching soon
            </p>
          </>
        ) : (
          <>
            <ProductPrice
              price={price}
              compareAtPrice={compareAtPrice}
              size="lg"
              className="mb-6"
            />

            {sizes.length > 0 && (
              <div className="mb-6">
                <p className="font-button text-[10px] uppercase tracking-[0.2em] text-grey mb-3">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size.value}
                      type="button"
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
            )}

            {frames.length > 0 && (
              <div className="mb-8">
                <p className="font-button text-[10px] uppercase tracking-[0.2em] text-grey mb-3">
                  Frame Material
                </p>
                <div className="flex flex-wrap gap-3">
                  {frames.map((frame) => (
                    <button
                      key={frame.value}
                      type="button"
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
            )}

            <div className="flex flex-col gap-3 mb-4">
              <Button asChild variant="gold" className="w-full btn-shimmer">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp Enquire
                </a>
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={handleAddToCart}>
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
                <Button variant="outline" size="icon" aria-label="Share" onClick={handleShare}>
                  <Share2 size={16} />
                </Button>
              </div>
            </div>

            <ul className="space-y-2 pt-2 border-t border-border/60">
              <li className="flex items-center gap-2 text-xs text-grey">
                <Award size={12} className="text-gold shrink-0" />
                Edition {product.edition.current}/{product.edition.total} · Certificate included
              </li>
              <li className="flex items-center gap-2 text-xs text-grey">
                <Truck size={12} className="text-gold shrink-0" />
                Ships in 7–14 business days · Insured
              </li>
              <li className="flex items-center gap-2 text-xs text-grey">
                <ShieldCheck size={12} className="text-gold shrink-0" />
                Authenticity guaranteed · Secure checkout
              </li>
            </ul>
          </>
        )}
      </div>

      <ProductMobileBuyBar
        productName={product.name}
        price={price}
        compareAtPrice={compareAtPrice}
        comingSoon={comingSoon}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}
