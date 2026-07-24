/**
 * CMS data layer — Sanity for images & content, local catalog as structure/pricing fallback.
 */

import { SanityCMSAdapter } from "@/lib/cms/sanity-adapter";
import { LocalCMSAdapter } from "@/lib/cms/types";
import type { CMSAdapter } from "@/lib/cms/types";
import {
  mergeProductCatalog,
  mergeCollectionCatalog,
  mergeSingleCollection,
  mergeProduct,
  getSanitySlugsForLocal,
} from "@/lib/cms/merge";
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

export async function fetchProducts(): Promise<Product[]> {
  try {
    const [sanityProducts, localProducts] = await Promise.all([
      sanity.getProducts(),
      local.getProducts(),
    ]);
    if (sanityProducts.length > 0) {
      return mergeProductCatalog(sanityProducts, localProducts);
    }
  } catch (error) {
    console.warn("[CMS] Sanity fetch failed, using local data:", error);
  }
  return local.getProducts();
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  const localProduct = await local.getProduct(slug);

  try {
    let sanityProduct: Product | null = null;
    for (const sanitySlug of getSanitySlugsForLocal(slug)) {
      sanityProduct = await sanity.getProduct(sanitySlug);
      if (sanityProduct) break;
    }

    if (localProduct && sanityProduct) {
      return mergeProduct(localProduct, { ...sanityProduct, slug });
    }
    if (sanityProduct) return sanityProduct;
  } catch (error) {
    console.warn("[CMS] Sanity fetch failed, using local data:", error);
  }
  return localProduct ?? null;
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
    return mergeProductCatalog(sanityProducts, localProducts).filter(
      (p) => p.collection === collection
    );
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
      return mergeCollectionCatalog(sanityCollections, localCollections);
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
    return mergeSingleCollection(localCollection, sanityCollection);
  } catch (error) {
    console.warn("[CMS] Sanity fetch failed, using local data:", error);
  }
  return local.getCollection(slug) ?? null;
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
    return await sanity.getSiteSettings();
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
