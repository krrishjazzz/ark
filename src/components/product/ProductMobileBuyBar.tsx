"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductPrice } from "@/components/product/ProductPrice";
import { buildProductEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

interface ProductMobileBuyBarProps {
  productName: string;
  price: number;
  compareAtPrice?: number;
  comingSoon?: boolean;
  onAddToCart: () => void;
}

export function ProductMobileBuyBar({
  productName,
  price,
  compareAtPrice,
  comingSoon = false,
  onAddToCart,
}: ProductMobileBuyBarProps) {
  const whatsappHref = buildWhatsAppUrl(
    buildProductEnquiryMessage(productName, comingSoon)
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center gap-3">
        {!comingSoon && (
          <div className="min-w-0 shrink">
            <ProductPrice
              price={price}
              compareAtPrice={compareAtPrice}
              size="sm"
              className="[&_span]:text-sm"
            />
          </div>
        )}
        <Button asChild variant="gold" className="flex-1 btn-shimmer min-w-0">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </Button>
        {!comingSoon && (
          <Button
            variant="outline"
            className="shrink-0 px-3"
            onClick={onAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
