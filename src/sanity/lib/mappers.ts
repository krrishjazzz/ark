import type { SanityImageSource } from "@sanity/image-url";
import { getImageUrl } from "@/sanity/lib/image";
import type { Product, Collection, Testimonial } from "@/types";
import {
  DEFAULT_CONFIGURATOR_BASE_PRICE,
  DEFAULT_FRAME_OPTIONS,
  DEFAULT_MANUFACTURERS,
  DEFAULT_RESIN_COLORS,
  DEFAULT_SIZES,
  DEFAULT_TEXTURES,
} from "@/lib/constants";
import {
  EMPTY_SITE_SETTINGS,
  type FrameOption,
  type LabeledOption,
  type ResinColorOption,
  type SiteSettings,
  type SizeOption,
} from "@/types/site-settings";

interface SanityProduct {
  _id: string;
  slug: string;
  name: string;
  series?: string;
  manufacturer?: string;
  tagline?: string;
  description?: string;
  basePrice?: number;
  compareAtPrice?: number;
  images?: SanityImageSource[];
  editionCurrent?: number;
  editionTotal?: number;
  featured?: boolean;
  collection?: string;
  sizes?: Array<{ label?: string; value?: string; priceMultiplier?: number }>;
  frames?: Array<{ label?: string; value?: string; hex?: string }>;
  craftsmanship?: string[];
  packaging?: string[];
  shipping?: string;
  reviews?: Array<{
    author?: string;
    rating?: number;
    comment?: string;
    date?: string;
  }>;
}

/** Map product-level options; empty means “use Site Settings defaults” at runtime */
function mapProductSizes(
  sizes?: SanityProduct["sizes"]
): SizeOption[] | undefined {
  const mapped =
    sizes
      ?.filter((s) => s?.label && s?.value)
      .map((s) => ({
        label: s.label!,
        value: s.value!,
        priceMultiplier: s.priceMultiplier ?? 1,
      })) ?? [];
  return mapped.length > 0 ? mapped : undefined;
}

function mapProductFrames(
  frames?: SanityProduct["frames"]
): FrameOption[] | undefined {
  const mapped =
    frames
      ?.filter((f) => f?.label && f?.value && f?.hex)
      .map((f) => ({
        label: f.label!,
        value: f.value!,
        hex: f.hex!,
      })) ?? [];
  return mapped.length > 0 ? mapped : undefined;
}

interface SanityCollection {
  _id: string;
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  image?: SanityImageSource;
  productCount?: number;
  comingSoon?: boolean;
}

interface SanityTestimonial {
  _id: string;
  name: string;
  location?: string;
  rating?: number;
  quote?: string;
  product?: string;
  image?: SanityImageSource;
}

interface SanityGalleryImage {
  _id: string;
  alt?: string;
  category?: string;
  image?: SanityImageSource;
}

interface SanitySiteSettings {
  logo?: SanityImageSource;
  heroImage?: SanityImageSource;
  craftsmanshipPrimary?: SanityImageSource;
  craftsmanshipSecondary?: SanityImageSource;
  brandBoardPrimary?: SanityImageSource;
  brandBoardSecondary?: SanityImageSource;
  configuratorPreview?: SanityImageSource;
  aboutHero?: SanityImageSource;
  packagingBox?: SanityImageSource;
  packagingCertificate?: SanityImageSource;
  packagingMicrofiber?: SanityImageSource;
  packagingThankYou?: SanityImageSource;
  instagramImages?: SanityImageSource[];
  sizes?: Array<{ label?: string; value?: string; priceMultiplier?: number }>;
  frames?: Array<{ label?: string; value?: string; hex?: string }>;
  manufacturers?: string[];
  textures?: Array<{ label?: string; value?: string }>;
  resinColors?: Array<{ label?: string; value?: string; hex?: string }>;
  configuratorBasePrice?: number;
}

function mapSizes(
  sizes?: SanitySiteSettings["sizes"]
): SizeOption[] {
  const mapped =
    sizes
      ?.filter((s) => s?.label && s?.value)
      .map((s) => ({
        label: s.label!,
        value: s.value!,
        priceMultiplier: s.priceMultiplier ?? 1,
      })) ?? [];
  return mapped.length > 0 ? mapped : [...DEFAULT_SIZES];
}

function mapFrames(
  frames?: SanitySiteSettings["frames"]
): FrameOption[] {
  const mapped =
    frames
      ?.filter((f) => f?.label && f?.value && f?.hex)
      .map((f) => ({
        label: f.label!,
        value: f.value!,
        hex: f.hex!,
      })) ?? [];
  return mapped.length > 0 ? mapped : [...DEFAULT_FRAME_OPTIONS];
}

function mapLabeledOptions(
  items: Array<{ label?: string; value?: string }> | undefined,
  fallback: readonly LabeledOption[]
): LabeledOption[] {
  const mapped =
    items
      ?.filter((i) => i?.label && i?.value)
      .map((i) => ({ label: i.label!, value: i.value! })) ?? [];
  return mapped.length > 0 ? mapped : [...fallback];
}

function mapResinColors(
  colors?: SanitySiteSettings["resinColors"]
): ResinColorOption[] {
  const mapped =
    colors
      ?.filter((c) => c?.label && c?.value && c?.hex)
      .map((c) => ({
        label: c.label!,
        value: c.value!,
        hex: c.hex!,
      })) ?? [];
  return mapped.length > 0 ? mapped : [...DEFAULT_RESIN_COLORS];
}

function mapManufacturers(list?: string[]): string[] {
  const mapped = list?.map((m) => m.trim()).filter(Boolean) ?? [];
  return mapped.length > 0 ? mapped : [...DEFAULT_MANUFACTURERS];
}

function mapImages(images?: SanityImageSource[]): string[] {
  if (!images?.length) return [];
  return images
    .filter(Boolean)
    .map((img) => getImageUrl(img, 1600))
    .filter((url): url is string => Boolean(url));
}

function mapImage(image?: SanityImageSource, width = 1200): string {
  return getImageUrl(image, width) || "";
}

export function mapSanityProduct(doc: SanityProduct): Product {
  return {
    id: doc._id,
    slug: doc.slug,
    name: doc.name,
    series: doc.series || "",
    manufacturer: doc.manufacturer,
    tagline: doc.tagline || "",
    description: doc.description || "",
    basePrice: doc.basePrice || 0,
    compareAtPrice: doc.compareAtPrice,
    images: mapImages(doc.images),
    edition: {
      current: doc.editionCurrent || 1,
      total: doc.editionTotal || 50,
    },
    featured: doc.featured,
    collection: doc.collection || "",
    sizes: mapProductSizes(doc.sizes),
    frames: mapProductFrames(doc.frames),
    craftsmanship: doc.craftsmanship || [],
    packaging: doc.packaging || [],
    shipping: doc.shipping || "",
    reviews: (doc.reviews || []).map(
      (r, i): Product["reviews"][number] => ({
        id: `review-${i}`,
        author: r.author || "Anonymous",
        rating: r.rating || 5,
        comment: r.comment || "",
        date: r.date || new Date().toISOString().split("T")[0],
      })
    ),
  };
}

export function mapSanityCollection(doc: SanityCollection): Collection {
  return {
    id: doc._id,
    slug: doc.slug,
    name: doc.name,
    tagline: doc.tagline || "",
    description: doc.description || "",
    image: mapImage(doc.image, 1200),
    productCount: doc.productCount || 0,
    comingSoon: doc.comingSoon ?? false,
  };
}

export function mapSanityTestimonial(doc: SanityTestimonial): Testimonial {
  return {
    id: doc._id,
    name: doc.name,
    location: doc.location || "",
    rating: doc.rating || 5,
    quote: doc.quote || "",
    product: doc.product || "",
    image: mapImage(doc.image, 400),
  };
}

export function mapSanityGalleryImage(doc: SanityGalleryImage) {
  return {
    id: doc._id,
    image: mapImage(doc.image, 800),
    category: doc.category || "Gallery",
    alt: doc.alt || "ARK gallery image",
  };
}

export function mapSiteSettings(doc: SanitySiteSettings | null): SiteSettings {
  if (!doc) {
    return {
      ...EMPTY_SITE_SETTINGS,
      sizes: [...DEFAULT_SIZES],
      frames: [...DEFAULT_FRAME_OPTIONS],
      manufacturers: [...DEFAULT_MANUFACTURERS],
      textures: [...DEFAULT_TEXTURES],
      resinColors: [...DEFAULT_RESIN_COLORS],
      configuratorBasePrice: DEFAULT_CONFIGURATOR_BASE_PRICE,
    };
  }

  return {
    logo: mapImage(doc.logo, 256),
    heroImage: mapImage(doc.heroImage, 2560),
    craftsmanshipPrimary: mapImage(doc.craftsmanshipPrimary, 1200),
    craftsmanshipSecondary: mapImage(doc.craftsmanshipSecondary, 1200),
    brandBoardPrimary: mapImage(doc.brandBoardPrimary, 1200),
    brandBoardSecondary: mapImage(doc.brandBoardSecondary, 1200),
    configuratorPreview: mapImage(doc.configuratorPreview, 1200),
    aboutHero: mapImage(doc.aboutHero, 1600),
    packaging: {
      box: mapImage(doc.packagingBox, 1200),
      certificate: mapImage(doc.packagingCertificate, 1200),
      microfiber: mapImage(doc.packagingMicrofiber, 1200),
      thankYou: mapImage(doc.packagingThankYou, 1200),
    },
    instagramImages: mapImages(doc.instagramImages),
    sizes: mapSizes(doc.sizes),
    frames: mapFrames(doc.frames),
    manufacturers: mapManufacturers(doc.manufacturers),
    textures: mapLabeledOptions(doc.textures, DEFAULT_TEXTURES),
    resinColors: mapResinColors(doc.resinColors),
    configuratorBasePrice:
      typeof doc.configuratorBasePrice === "number" && doc.configuratorBasePrice > 0
        ? doc.configuratorBasePrice
        : DEFAULT_CONFIGURATOR_BASE_PRICE,
  };
}
