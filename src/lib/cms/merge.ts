import type { Product, Collection } from "@/types";

function hasText(value?: string | null): value is string {
  return Boolean(value?.trim());
}

function pickString(sanity: string, local: string): string {
  return hasText(sanity) ? sanity : local;
}

function pickArray<T>(sanity: T[], local: T[]): T[] {
  return sanity.length > 0 ? sanity : local;
}

function pickPrice(sanity: number, local: number): number {
  return sanity > 0 ? sanity : local;
}

/** Merge Sanity + local — images from Sanity when present, text/pricing filled from whichever source has data */
export function mergeProduct(local: Product, sanity: Product): Product {
  return {
    id: sanity.id || local.id,
    slug: local.slug,
    name: pickString(sanity.name, local.name),
    series: pickString(sanity.series, local.series),
    manufacturer: hasText(sanity.manufacturer)
      ? sanity.manufacturer
      : local.manufacturer,
    tagline: pickString(sanity.tagline, local.tagline),
    description: pickString(sanity.description, local.description),
    basePrice: local.basePrice > 0 ? local.basePrice : pickPrice(sanity.basePrice, local.basePrice),
    compareAtPrice: local.compareAtPrice ?? sanity.compareAtPrice,
    images: sanity.images.length > 0 ? sanity.images : local.images,
    edition: {
      current:
        sanity.edition.current > 0
          ? sanity.edition.current
          : local.edition.current,
      total:
        sanity.edition.total > 0 ? sanity.edition.total : local.edition.total,
    },
    featured: sanity.featured ?? local.featured,
    collection: pickString(sanity.collection, local.collection),
    craftsmanship: pickArray(sanity.craftsmanship, local.craftsmanship),
    packaging: pickArray(sanity.packaging, local.packaging),
    shipping: pickString(sanity.shipping, local.shipping),
    reviews: pickArray(sanity.reviews, local.reviews),
  };
}

export function mergeProductCatalog(
  sanityProducts: Product[],
  localProducts: Product[]
): Product[] {
  const localBySlug = new Map(localProducts.map((p) => [p.slug, p]));
  const merged = new Map<string, Product>();

  for (const local of localProducts) {
    merged.set(local.slug, local);
  }

  for (const sanity of sanityProducts) {
    const local = localBySlug.get(sanity.slug);
    if (local) {
      merged.set(sanity.slug, mergeProduct(local, sanity));
    } else if (hasText(sanity.name) && sanity.images.length > 0) {
      merged.set(sanity.slug, sanity);
    }
  }

  return Array.from(merged.values());
}

export function mergeCollection(local: Collection, sanity: Collection): Collection {
  return {
    id: sanity.id || local.id,
    slug: local.slug,
    name: pickString(sanity.name, local.name),
    tagline: pickString(sanity.tagline, local.tagline),
    description: pickString(sanity.description, local.description),
    image: sanity.image || local.image,
    productCount: Math.max(sanity.productCount ?? 0, local.productCount ?? 0),
    comingSoon: local.comingSoon ?? sanity.comingSoon ?? false,
  };
}

export function mergeCollectionCatalog(
  sanityCollections: Collection[],
  localCollections: Collection[]
): Collection[] {
  const localBySlug = new Map(localCollections.map((c) => [c.slug, c]));
  const sanitySlugs = new Set(sanityCollections.map((c) => c.slug));
  const merged: Collection[] = [];

  for (const sanity of sanityCollections) {
    const local = localBySlug.get(sanity.slug);
    merged.push(local ? mergeCollection(local, sanity) : sanity);
  }

  for (const local of localCollections) {
    if (!sanitySlugs.has(local.slug)) {
      merged.push(local);
    }
  }

  return merged;
}

export function mergeSingleCollection(
  local: Collection | null,
  sanity: Collection | null
): Collection | null {
  if (!local && !sanity) return null;
  if (!local) return sanity;
  if (!sanity) return local;
  return mergeCollection(local, sanity);
}
