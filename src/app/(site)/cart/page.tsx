"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { calculateCartTotals } from "@/lib/checkout";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, cartCount, hydrated } = useStore();

  const { subtotal, shipping, total } = calculateCartTotals(cart);

  if (!hydrated) {
    return (
      <div className="pt-32 pb-20">
        <div className="mx-auto max-w-2xl px-6 text-center text-grey">Loading cart...</div>
      </div>
    );
  }

  if (cartCount === 0) {
    return (
      <div className="pt-32 pb-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <SectionHeading title="Your Cart is Empty" description="Discover our handcrafted masterpieces." />
          <Button asChild variant="gold" className="mt-8">
            <Link href="/collections">Explore Collection</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading label="Cart" title="Your Selection" align="left" />

        <div className="space-y-6 mb-12">
          {cart.map((item) => (
            <FadeIn key={`${item.productId}-${item.size}`}>
              <div className="flex gap-6 p-6 rounded-[20px] border border-border">
                <div className="relative w-24 h-32 rounded-xl overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-heading text-lg text-foreground hover:text-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-grey mt-1">
                    {item.size} · {item.frame} frame
                  </p>
                  <p className="text-gold mt-2">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 border border-border rounded-full">
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                        className="h-8 w-8 flex items-center justify-center text-grey hover:text-gold"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                        className="h-8 w-8 flex items-center justify-center text-grey hover:text-gold"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.size)}
                      className="text-grey hover:text-red-400 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="font-heading text-lg text-foreground hidden sm:block">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Summary */}
        <div className="p-8 rounded-[20px] border border-border glass">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-grey">Subtotal</span>
              <span className="text-foreground">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-grey">Shipping</span>
              <span className="text-foreground">
                {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-lg pt-3 border-t border-border">
              <span className="font-heading text-foreground">Total</span>
              <span className="text-gold">{formatPrice(total)}</span>
            </div>
          </div>
          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={() => router.push("/checkout")}
          >
            <ShoppingBag size={16} />
            Secure Checkout
          </Button>
          <p className="text-xs text-grey text-center mt-4">
            Insured shipping · Certificate included · 7-14 day delivery
          </p>
        </div>
      </div>
    </div>
  );
}
