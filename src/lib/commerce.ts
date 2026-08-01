import { LEGO_FRAME_OPTIONS, LEGO_SIZES } from "@/lib/constants";
import type { Product } from "@/types";
import type { FrameOption, SizeOption } from "@/types/site-settings";

function isLegoSeries(
  product: Pick<Product, "seriesSlug" | "series">
): boolean {
  const seriesKey = (product.seriesSlug || product.series || "")
    .toLowerCase()
    .trim();
  return seriesKey === "lego" || seriesKey.includes("lego");
}

/** Per-product sizes when set in Sanity; Lego defaults to 20×31; else Site Settings */
export function resolveProductSizes(
  product: Pick<Product, "sizes" | "seriesSlug" | "series">,
  fallback: readonly SizeOption[]
): SizeOption[] {
  if (product.sizes && product.sizes.length > 0) {
    return product.sizes;
  }

  if (isLegoSeries(product)) {
    return [...LEGO_SIZES];
  }

  return [...fallback];
}

/**
 * Per-product frames when set in Sanity.
 * Lego defaults to Acrylic + Aluminum (1.1×); others use Site Settings (Acrylic).
 */
export function resolveProductFrames(
  product: Pick<Product, "frames" | "seriesSlug" | "series">,
  fallback: readonly FrameOption[]
): FrameOption[] {
  if (product.frames && product.frames.length > 0) {
    return product.frames;
  }

  if (isLegoSeries(product)) {
    return [...LEGO_FRAME_OPTIONS];
  }

  return [...fallback];
}
