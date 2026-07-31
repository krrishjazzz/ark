import type { Product } from "@/types";
import type { FrameOption, SizeOption } from "@/types/site-settings";

/** Per-product sizes when set in Sanity; otherwise Site Settings / defaults */
export function resolveProductSizes(
  product: Pick<Product, "sizes">,
  fallback: readonly SizeOption[]
): SizeOption[] {
  return product.sizes && product.sizes.length > 0
    ? product.sizes
    : [...fallback];
}

/** Per-product frames when set in Sanity; otherwise Site Settings / defaults */
export function resolveProductFrames(
  product: Pick<Product, "frames">,
  fallback: readonly FrameOption[]
): FrameOption[] {
  return product.frames && product.frames.length > 0
    ? product.frames
    : [...fallback];
}
