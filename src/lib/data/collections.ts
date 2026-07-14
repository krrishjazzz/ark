import { IMAGES } from "@/lib/constants";
import type { Collection } from "@/types";

export const collections: Collection[] = [
  {
    id: "1",
    slug: "velocity-series",
    name: "Velocity Series",
    tagline: "Speed. Power. Precision.",
    description: "Supercars frozen in explosive resin motion.",
    image: IMAGES.productWall,
    productCount: 12,
  },
  {
    id: "2",
    slug: "supercars",
    name: "Supercars",
    tagline: "Beyond limits.",
    description: "Legendary machines captured in museum-grade resin.",
    image: IMAGES.productGrid,
    productCount: 8,
  },
  {
    id: "3",
    slug: "motorcycles",
    name: "Motorcycles",
    tagline: "Built to thrill.",
    description: "Two-wheeled icons embedded in raw resin energy.",
    image: IMAGES.brandBoard2,
    productCount: 6,
  },
  {
    id: "4",
    slug: "badge-series",
    name: "Badge Series",
    tagline: "Icons. Legacy. Timeless.",
    description: "Automotive crests elevated to sculptural art.",
    image: IMAGES.packaging,
    productCount: 4,
  },
  {
    id: "5",
    slug: "anime",
    name: "Anime",
    tagline: "Art. Emotion. Story.",
    description: "Beloved characters frozen in swirling resin worlds.",
    image: IMAGES.brandBoard1,
    productCount: 5,
  },
  {
    id: "6",
    slug: "culture",
    name: "Culture",
    tagline: "Heritage reimagined.",
    description: "Cultural icons rendered in premium resin relief.",
    image: IMAGES.productEasel,
    productCount: 3,
  },
  {
    id: "7",
    slug: "abstract",
    name: "Abstract",
    tagline: "Feel the art.",
    description: "Pure resin expression — form, flow, and gold.",
    image: IMAGES.productTopdown,
    productCount: 4,
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
