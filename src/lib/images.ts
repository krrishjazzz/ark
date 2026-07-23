/** Neutral SVG placeholder — no local assets */
export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect fill='%23111111' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23333333' font-family='sans-serif' font-size='24'%3EARK%3C/text%3E%3C/svg%3E";

export function resolveImageSrc(src?: string | null): string {
  return src?.trim() ? src : PLACEHOLDER_IMAGE;
}

export function getProductPrimaryImage(images?: string[]): string {
  const first = images?.find((img) => img?.trim());
  return first ?? PLACEHOLDER_IMAGE;
}

export function ensureProductImages(images?: string[]): string[] {
  const valid = images?.filter((img) => img?.trim()) ?? [];
  return valid.length > 0 ? valid : [PLACEHOLDER_IMAGE];
}

export function hasImage(src?: string | null): src is string {
  return Boolean(src?.trim());
}
