import { DEFAULT_FRAME_OPTIONS, DEFAULT_SIZES } from "@/lib/constants";
import type { CartItem } from "@/types";
import type { FrameOption, SizeOption } from "@/types/site-settings";

export const SHIPPING_FEE = 2500;
export const FREE_SHIPPING_THRESHOLD = 50000;

/** Final price = base × sizeMultiplier × frameMultiplier */
export function calculatePrice(
  basePrice: number,
  size: string,
  sizes: readonly SizeOption[] = DEFAULT_SIZES,
  frame?: string,
  frames: readonly FrameOption[] = DEFAULT_FRAME_OPTIONS
): number {
  const sizeMultiplier =
    sizes.find((s) => s.value === size)?.priceMultiplier ?? 1;
  const frameMultiplier = frame
    ? (frames.find((f) => f.value === frame)?.priceMultiplier ?? 1)
    : 1;
  return Math.round(basePrice * sizeMultiplier * frameMultiplier);
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
