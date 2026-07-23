/**
 * CMS data layer — fetches from Sanity when content exists,
 * falls back to local data so the site always works.
 */

import { SanityCMSAdapter } from "@/lib/cms/sanity-adapter";
import { LocalCMSAdapter } from "@/lib/cms/types";
import type { CMSAdapter } from "@/lib/cms/types";
import type { Product, Collection, Testimonial } from "@/types";
import type { SiteSettings } from "@/types/site-settings";
import { EMPTY_SITE_SETTINGS } from "@/types/site-settings";
import { getRelatedProducts } from "@/lib/data/products";

const sanity = new SanityCMSAdapter();
const local = new LocalCMSAdapter();

let activeAdapter: CMSAdapter = sanity;

export function setCMSAdapter(adapter: CMSAdapter) {
  activeAdapter = adapter;
}

export function getCMS(): CMSAdapter {
  return activeAdapter;
}

function mergeProducts(sanityProducts: Product[], localProducts: Product[]): Product[] {
  const bySlug = new Map<string, Product>();

  for (const product of localProducts) {
    bySlug.set(product.slug, product);
  }

  for (const product of sanityProducts) {
    const existing = bySlug.get(product.slug);
    if (!existing) continue;

    bySlug.set(product.slug, {
      ...existing,
      ...product,
      images: product.images.length > 0 ? product.images : existing.images,
      basePrice: existing.basePrice ?? product.basePrice ?? 0,
      compareAtPrice: existing.compareAtPrice ?? product.compareAtPrice,
    });
  }

  return Array.from(bySlug.values());
}

function mergeCollections(
  sanityCollections: Collection[],
  localCollections: Collection[]
): Collection[] {
  const localBySlug = new Map(localCollections.map((c) => [c.slug, c]));
  const localSlugs = new Set(localCollections.map((c) => c.slug));
  const sanitySlugs = new Set(sanityCollections.map((c) => c.slug));

  const merged = sanityCollections
    .filter((collection) => localSlugs.has(collection.slug))
    .map((collection) => {
      const local = localBySlug.get(collection.slug);
      if (!local) return collection;

      return {
        ...collection,
        productCount: Math.max(collection.productCount ?? 0, local.productCount ?? 0),
        image: collection.image || local.image,
        comingSoon: local.comingSoon ?? collection.comingSoon ?? false,
      };
    });

  for (const local of localCollections) {
    if (!sanitySlugs.has(local.slug)) {
      merged.push(local);
    }
  }

  return merged;
}

function mergeCollection(
  sanityCollection: Collection | null,
  localCollection: Collection | null
): Collection | null {
  if (!localCollection) return null;
  if (!sanityCollection) return localCollection;

  return {
    ...sanityCollection,
    productCount: Math.max(
      sanityCollection.productCount ?? 0,
      localCollection.productCount ?? 0
    ),
    image: sanityCollection.image || localCollection.image,
    comingSoon: localCollection.comingSoon ?? sanityCollection.comingSoon ?? false,
  };
}

async function withFallback<T>(
  sanityFn: () => Promise<T[]>,
  localFn: () => Promise<T[]>
): Promise<T[]> {
  try {
    const result = await sanityFn();
    if (result.length > 0) return result;
  } catch (error) {
    console.warn("[CMS] Sanity fetch failed, using local data:", error);
  }
  return localFn();
}

async function withFallbackSingle<T>(
  sanityFn: () => Promise<T | null>,
  localFn: () => Promise<T | null>
): Promise<T | null> {
  try {
    const result = await sanityFn();
    if (result) return result;
  } catch (error) {
    console.warn("[CMS] Sanity fetch failed, using local data:", error);
  }
  return localFn();
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const [sanityProducts, localProducts] = await Promise.all([
      sanity.getProducts(),
      local.getProducts(),
    ]);
    if (sanityProducts.length > 0) return mergeProducts(sanityProducts, localProducts);
  } catch (error) {
    console.warn("[CMS] Sanity fetch failed, using local data:", error);
  }
  return local.getProducts();
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  const localProduct = await local.getProduct(slug);
  if (!localProduct) return null;

  try {
    const sanityProduct = await sanity.getProduct(slug);
    if (sanityProduct) {
      return mergeProducts([sanityProduct], [localProduct])[0] ?? localProduct;
    }
  } catch (error) {
    console.warn("[CMS] Sanity fetch failed, using local data:", error);
  }
  return localProduct;
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const all = await fetchProducts();
  return all.filter((p) => p.featured);
}

export async function fetchProductsByCollection(
  collection: string
): Promise<Product[]> {
  try {
    const [sanityProducts, localProducts] = await Promise.all([
      sanity.getProductsByCollection(collection),
      local.getProductsByCollection(collection),
    ]);
    const merged = mergeProducts(sanityProducts, localProducts);
    return merged.filter((p) => p.collection === collection);
  } catch (error) {
    console.warn("[CMS] Sanity fetch failed, using local data:", error);
  }
  return local.getProductsByCollection(collection);
}

export async function fetchCollections(): Promise<Collection[]> {
  try {
    const [sanityCollections, localCollections] = await Promise.all([
      sanity.getCollections(),
      local.getCollections(),
    ]);
    if (sanityCollections.length > 0) {
      return mergeCollections(sanityCollections, localCollections);
    }
  } catch (error) {
    console.warn("[CMS] Sanity fetch failed, using local data:", error);
  }
  return local.getCollections();
}

export async function fetchCollection(slug: string): Promise<Collection | null> {
  try {
    const [sanityCollection, localCollection] = await Promise.all([
      sanity.getCollection(slug),
      local.getCollection(slug),
    ]);
    return mergeCollection(sanityCollection, localCollection);
  } catch (error) {
    console.warn("[CMS] Sanity fetch failed, using local data:", error);
  }
  return local.getCollection(slug);
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  return withFallback(
    () => sanity.getTestimonials(),
    () => local.getTestimonials()
  );
}

export async function fetchGalleryImages() {
  return withFallback(
    () => sanity.getGalleryImages(),
    () => local.getGalleryImages()
  );
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const settings = await sanity.getSiteSettings();
    if (
      settings.logo ||
      settings.heroImage ||
      settings.packaging.box ||
      settings.instagramImages.length > 0
    ) {
      return settings;
    }
  } catch (error) {
    console.warn("[CMS] Sanity site settings fetch failed:", error);
  }
  return EMPTY_SITE_SETTINGS;
}

export async function fetchRelatedProducts(slug: string, limit = 4) {
  const product = await fetchProduct(slug);
  const all = await fetchProducts();
  if (!product) return all.slice(0, limit);
  return all
    .filter((p) => p.slug !== slug && p.collection === product.collection)
    .slice(0, limit);
}

export { getRelatedProducts };
