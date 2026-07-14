import { IMAGES } from "@/lib/constants";
import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    slug: "audi-r8-predator",
    name: "Audi R8 — Predator Edition",
    series: "Velocity Series",
    manufacturer: "Audi",
    tagline: "Speed. Power. Precision.",
    description:
      "A white Audi R8 frozen in motion, coiled by a crimson serpent against volcanic obsidian resin. Museum-grade gloss finish with integrated LED ambient lighting.",
    basePrice: 45000,
    images: [
      IMAGES.productWall,
      IMAGES.productTopdown,
      IMAGES.productEasel,
      IMAGES.productGrid,
    ],
    edition: { current: 12, total: 50 },
    featured: true,
    collection: "supercars",
    craftsmanship: [
      "3D handcrafted volcanic textures",
      "High gloss resin pour with 7 layers",
      "Premium diecast Audi R8 model",
      "UV resistant museum coating",
      "Solid walnut wood frame",
      "Integrated LED ambient lighting",
    ],
    packaging: [
      "Premium magnetic closure box",
      "Certificate of authenticity",
      "Microfiber cleaning cloth",
      "Wall hanging kit with level",
      "Handwritten thank you card",
    ],
    shipping: "Ships within 7-14 business days. Fully insured premium packaging.",
    reviews: [
      {
        id: "r1",
        author: "Rahul M.",
        rating: 5,
        comment: "Absolutely stunning. The detail is incredible — looks even better in person.",
        date: "2026-03-15",
      },
      {
        id: "r2",
        author: "Priya S.",
        rating: 5,
        comment: "Perfect centerpiece for my home office. The packaging alone is a work of art.",
        date: "2026-02-28",
      },
    ],
  },
  {
    id: "2",
    slug: "porsche-911-velocity",
    name: "Porsche 911 GT3 RS — Velocity",
    series: "Velocity Series",
    manufacturer: "Porsche",
    tagline: "Born to race. Built to display.",
    description:
      "A white Porsche 911 GT3 RS bursting through churning black resin waves. The definitive statement piece for any Porsche collector.",
    basePrice: 42000,
    images: [IMAGES.brandBoard1, IMAGES.productTopdown, IMAGES.productEasel],
    edition: { current: 8, total: 100 },
    featured: true,
    collection: "supercars",
    craftsmanship: [
      "Explosive resin splash textures",
      "Premium diecast Porsche model",
      "Hand-polished gloss finish",
      "UV resistant coating",
      "Solid wood frame",
    ],
    packaging: [
      "Premium magnetic box",
      "Certificate of authenticity",
      "Microfiber cloth",
      "Wall hanging kit",
    ],
    shipping: "Ships within 7-14 business days.",
    reviews: [],
  },
  {
    id: "3",
    slug: "bmw-s1000rr-impact",
    name: "BMW S1000RR — Impact",
    series: "Impact Series",
    manufacturer: "BMW",
    tagline: "Built to thrill.",
    description:
      "A black and red BMW S1000RR superbike embedded in explosive black resin. Raw power captured in permanent form.",
    basePrice: 38000,
    images: [IMAGES.brandBoard2, IMAGES.productGrid, IMAGES.productWall],
    edition: { current: 5, total: 75 },
    featured: true,
    collection: "motorcycles",
    craftsmanship: [
      "Impact splash resin textures",
      "Premium diecast motorcycle model",
      "High gloss finish",
      "UV resistant coating",
      "Solid wood frame",
    ],
    packaging: [
      "Premium magnetic box",
      "Certificate of authenticity",
      "Microfiber cloth",
      "Wall hanging kit",
    ],
    shipping: "Ships within 7-14 business days.",
    reviews: [],
  },
  {
    id: "4",
    slug: "porsche-crest-badge",
    name: "Porsche Crest — Signature Badge",
    series: "Badge Series",
    manufacturer: "Porsche",
    tagline: "Icons. Legacy. Timeless.",
    description:
      "A monumental 3D Porsche crest mounted on jagged obsidian resin. The ultimate badge of honor for Porsche enthusiasts.",
    basePrice: 35000,
    images: [IMAGES.brandBoard2, IMAGES.packaging, IMAGES.productEasel],
    edition: { current: 3, total: 30 },
    featured: true,
    collection: "badge-series",
    craftsmanship: [
      "3D crest sculpting",
      "Jagged stone resin textures",
      "Metallic gold accents",
      "UV resistant coating",
      "Solid wood frame",
    ],
    packaging: [
      "Premium magnetic box",
      "Certificate of authenticity",
      "Microfiber cloth",
      "Wall hanging kit",
    ],
    shipping: "Ships within 10-14 business days.",
    reviews: [],
  },
  {
    id: "5",
    slug: "abstract-gold-flow",
    name: "Abstract — Gold Flow",
    series: "Abstract Series",
    tagline: "Feel the art.",
    description:
      "Flowing liquid black resin interspersed with thick veins of shimmering gold. Pure artistic expression without boundaries.",
    basePrice: 32000,
    images: [IMAGES.brandBoard1, IMAGES.productTopdown],
    edition: { current: 15, total: 50 },
    featured: false,
    collection: "abstract",
    craftsmanship: [
      "Hand-poured resin waves",
      "Real gold leaf accents",
      "7-layer gloss finish",
      "UV resistant coating",
      "Solid wood frame",
    ],
    packaging: [
      "Premium magnetic box",
      "Certificate of authenticity",
      "Microfiber cloth",
      "Wall hanging kit",
    ],
    shipping: "Ships within 7-14 business days.",
    reviews: [],
  },
  {
    id: "6",
    slug: "ferrari-488-velocity",
    name: "Ferrari 488 — Velocity",
    series: "Velocity Series",
    manufacturer: "Ferrari",
    tagline: "Prancing horse. Frozen motion.",
    description:
      "A Rosso Corsa Ferrari 488 captured mid-acceleration through flowing tire track resin textures.",
    basePrice: 48000,
    images: [IMAGES.productGrid, IMAGES.productWall, IMAGES.productEasel],
    edition: { current: 2, total: 25 },
    featured: true,
    collection: "supercars",
    craftsmanship: [
      "Tire track resin textures",
      "Premium diecast Ferrari model",
      "Hand-polished gloss finish",
      "UV resistant coating",
      "Solid wood frame",
    ],
    packaging: [
      "Premium magnetic box",
      "Certificate of authenticity",
      "Microfiber cloth",
      "Wall hanging kit",
    ],
    shipping: "Ships within 7-14 business days.",
    reviews: [],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter((p) => p.collection === collection);
}

export function getProductsByManufacturer(manufacturer: string): Product[] {
  return products.filter((p) => p.manufacturer === manufacturer);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const product = getProductBySlug(slug);
  if (!product) return products.slice(0, limit);
  return products
    .filter((p) => p.slug !== slug && p.collection === product.collection)
    .slice(0, limit);
}
