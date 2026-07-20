import { SIZES } from "@/lib/constants";
import type { CartItem } from "@/types";

export const SHIPPING_FEE = 2500;
export const FREE_SHIPPING_THRESHOLD = 50000;

export function calculatePrice(basePrice: number, size: string): number {
  const sizeOption = SIZES.find((s) => s.value === size);
  return Math.round(basePrice * (sizeOption?.priceMultiplier ?? 1));
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
