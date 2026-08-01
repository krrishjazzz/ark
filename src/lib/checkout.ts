import { DEFAULT_FRAME_OPTIONS, DEFAULT_SIZES } from "@/lib/constants";
import type { CartItem } from "@/types";
import type { FrameOption, SizeOption } from "@/types/site-settings";

export const SHIPPING_FEE = 2500;
export const FREE_SHIPPING_THRESHOLD = 50000;

function optionExtra(
  basePrice: number,
  option?: Pick<SizeOption, "priceAdd" | "priceMultiplier">
): number {
  if (!option) return 0;
  // Multiplier wins when set (e.g. Aluminum 1.1× Acrylic)
  if (typeof option.priceMultiplier === "number") {
    return Math.round(basePrice * option.priceMultiplier) - basePrice;
  }
  if (typeof option.priceAdd === "number") return option.priceAdd;
  return 0;
}

/**
 * Final price = sale price + size extra + frame extra.
 * Frame multiplier example: Aluminum 1.1 → sale × 1.1
 */
export function calculatePrice(
  basePrice: number,
  size: string,
  sizes: readonly SizeOption[] = DEFAULT_SIZES,
  frame?: string,
  frames: readonly FrameOption[] = DEFAULT_FRAME_OPTIONS
): number {
  const sizeOpt = sizes.find((s) => s.value === size);
  const frameOpt = frame ? frames.find((f) => f.value === frame) : undefined;

  return Math.max(
    0,
    Math.round(
      basePrice +
        optionExtra(basePrice, sizeOpt) +
        optionExtra(basePrice, frameOpt)
    )
  );
}

export function calculateCartTotals(items: Pick<CartItem, "price" | "quantity">[]) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  return { subtotal, shipping, total: subtotal + shipping };
}

export interface CheckoutCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CheckoutTotals {
  subtotal: number;
  shipping: number;
  total: number;
}
