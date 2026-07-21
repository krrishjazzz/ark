import type { SanityImageSource } from "@sanity/image-url";
import { getImageUrl } from "@/sanity/lib/image";
import { FALLBACK_IMAGE } from "@/lib/constants";
import { getProductBySlug } from "@/lib/data/products";
import { getCollectionBySlug } from "@/lib/data/collections";
import type { Product, Collection, Testimonial, Review } from "@/types";

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

function mapImages(images?: SanityImageSource[]): string[] {
  if (!images?.length) return [];
  return images
    .map((img) => getImageUrl(img, 1600))
    .filter((url): url is string => Boolean(url));
}

function resolveProductImages(
  sanityImages?: SanityImageSource[],
  slug?: string
): string[] {
  const mapped = mapImages(sanityImages);
  if (mapped.length > 0) return mapped;

  if (slug) {
    const local = getProductBySlug(slug);
    const localImages = local?.images?.filter((img) => img?.trim()) ?? [];
    if (localImages.length > 0) return localImages;
  }

  return [FALLBACK_IMAGE];
}

function resolveCollectionImage(
  sanityImage: SanityImageSource | undefined,
  slug: string
): string {
  const mapped = getImageUrl(sanityImage, 1200);
  if (mapped) return mapped;

  const local = getCollectionBySlug(slug);
  if (local?.image?.trim()) return local.image;

  return FALLBACK_IMAGE;
}

export function mapSanityProduct(doc: SanityProduct): Product {
  const images = resolveProductImages(doc.images, doc.slug);
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
    images,
    edition: {
      current: doc.editionCurrent || 1,
      total: doc.editionTotal || 50,
    },
    featured: doc.featured,
    collection: doc.collection || "",
    craftsmanship: doc.craftsmanship || [],
    packaging: doc.packaging || [],
    shipping: doc.shipping || "",
    reviews: (doc.reviews || []).map(
      (r, i): Review => ({
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
    image: resolveCollectionImage(doc.image, doc.slug),
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
    image: getImageUrl(doc.image, 400) || FALLBACK_IMAGE,
  };
}

export function mapSanityGalleryImage(doc: SanityGalleryImage) {
  return {
    id: doc._id,
    image: getImageUrl(doc.image, 800) || FALLBACK_IMAGE,
    category: doc.category || "Gallery",
    alt: doc.alt || "ARK gallery image",
  };
}
