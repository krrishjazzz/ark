import { FALLBACK_IMAGE } from "@/lib/constants";

export function resolveImageSrc(src?: string | null): string {
  return src?.trim() ? src : FALLBACK_IMAGE;
}

export function getProductPrimaryImage(images?: string[]): string {
  const first = images?.find((img) => img?.trim());
  return first ?? FALLBACK_IMAGE;
}

export function ensureProductImages(images?: string[]): string[] {
  const valid = images?.filter((img) => img?.trim()) ?? [];
  return valid.length > 0 ? valid : [FALLBACK_IMAGE];
}
