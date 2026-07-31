import { DEFAULT_FRAME_OPTIONS, DEFAULT_SIZES } from "@/lib/constants";
import type { CartItem } from "@/types";
import type { FrameOption, SizeOption } from "@/types/site-settings";

export const SHIPPING_FEE = 2500;
export const FREE_SHIPPING_THRESHOLD = 50000;

/**
 * Final price = sale price + size extra (₹) + frame extra (₹).
 * With one size and Acrylic only, extras are 0 → price equals sale price.
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

  const sizeAdd =
    typeof sizeOpt?.priceAdd === "number"
      ? sizeOpt.priceAdd
      : typeof sizeOpt?.priceMultiplier === "number"
        ? Math.round(basePrice * sizeOpt.priceMultiplier) - basePrice
        : 0;
  const frameAdd =
    typeof frameOpt?.priceAdd === "number"
      ? frameOpt.priceAdd
      : typeof frameOpt?.priceMultiplier === "number"
        ? Math.round(basePrice * frameOpt.priceMultiplier) - basePrice
        : 0;

  return Math.max(0, Math.round(basePrice + sizeAdd + frameAdd));
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
