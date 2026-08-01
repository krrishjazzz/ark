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
import type { Product, ProductSeries, Collection, Testimonial } from "@/types";
import type { SiteSettings } from "@/types/site-settings";
import { EMPTY_SITE_SETTINGS } from "@/types/site-settings";
import {
  DEFAULT_CONFIGURATOR_BASE_PRICE,
  DEFAULT_FRAME_OPTIONS,
  DEFAULT_MANUFACTURERS,
  DEFAULT_RESIN_COLORS,
  DEFAULT_SIZES,
  DEFAULT_TEXTURES,
} from "@/lib/constants";
import {
  craftsmanshipFeatures as DEFAULT_CRAFTSMANSHIP,
  packagingItems as DEFAULT_PACKAGING_ITEMS,
  timeline as DEFAULT_TIMELINE,
  whyARK as DEFAULT_WHY_ARK,
} from "@/lib/data/content";
import { getRelatedProducts } from "@/lib/data/products";

function siteSettingsWithCommerceDefaults(
  settings: SiteSettings = EMPTY_SITE_SETTINGS
): SiteSettings {
  return {
    ...settings,
    sizes: settings.sizes.length > 0 ? settings.sizes : [...DEFAULT_SIZES],
    frames: settings.frames.length > 0 ? settings.frames : [...DEFAULT_FRAME_OPTIONS],
    manufacturers:
      settings.manufacturers.length > 0
        ? settings.manufacturers
        : [...DEFAULT_MANUFACTURERS],
    textures: settings.textures.length > 0 ? settings.textures : [...DEFAULT_TEXTURES],
    resinColors:
      settings.resinColors.length > 0
        ? settings.resinColors
        : [...DEFAULT_RESIN_COLORS],
    configuratorBasePrice:
      settings.configuratorBasePrice > 0
        ? settings.configuratorBasePrice
        : DEFAULT_CONFIGURATOR_BASE_PRICE,
    craftsmanshipFeatures:
      settings.craftsmanshipFeatures.length > 0
        ? settings.craftsmanshipFeatures
        : [...DEFAULT_CRAFTSMANSHIP],
    whyARK: settings.whyARK.length > 0 ? settings.whyARK : [...DEFAULT_WHY_ARK],
    packagingItems:
      settings.packagingItems.length > 0
        ? settings.packagingItems
        : [...DEFAULT_PACKAGING_ITEMS],
    timeline: settings.timeline.length > 0 ? settings.timeline : [...DEFAULT_TIMELINE],
  };
}

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
    return siteSettingsWithCommerceDefaults(await sanity.getSiteSettings());
  } catch (error) {
    console.warn("[CMS] Sanity site settings fetch failed:", error);
  }
  return siteSettingsWithCommerceDefaults();
}

const LOCAL_CAR_SERIES: ProductSeries[] = [
  {
    id: "local-environment",
    name: "Environment",
    slug: "environment",
    collection: "cars",
    sortOrder: 1,
    slotCount: 3,
    description: "Machines set in sculpted landscapes and atmospheric resin worlds.",
  },
  {
    id: "local-drift",
    name: "Drift",
    slug: "drift",
    collection: "cars",
    sortOrder: 2,
    slotCount: 3,
    description: "Motion frozen mid-slide — smoke, marble, and speed.",
  },
  {
    id: "local-lego",
    name: "Lego",
    slug: "lego",
    collection: "cars",
    sortOrder: 3,
    slotCount: 3,
    description: "Iconic builds reimagined as resin gallery pieces.",
  },
  {
    id: "local-small-car",
    name: "Small Car",
    slug: "small-car",
    collection: "cars",
    sortOrder: 4,
    slotCount: 3,
    description:
      "Compact icons with sculpted trails — big presence in a focused frame.",
    comingSoon: false,
  },
];

export async function fetchSeriesForCollection(
  collection: string
): Promise<ProductSeries[]> {
  try {
    // Prefer Site Settings → Collection Series Order when set for this collection
    const fromSettings = await sanity.getSeriesFromSiteSettings(collection);
    if (fromSettings.length > 0) return fromSettings;

    const series = await sanity.getSeriesByCollection(collection);
    if (series.length > 0) return series;
  } catch (error) {
    console.warn("[CMS] Sanity series fetch failed:", error);
  }
  if (collection === "cars") return LOCAL_CAR_SERIES;
  return [];
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
