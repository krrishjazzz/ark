import type { Collection } from "@/types";

export const collections: Collection[] = [
  {
    id: "1",
    slug: "cars",
    name: "Cars",
    tagline: "All cars possible.",
    description: "Every make. Every model. Handcrafted in museum-grade resin.",
    image: "",
    productCount: 5,
    comingSoon: false,
  },
  {
    id: "2",
    slug: "motorcycles",
    name: "Motorcycles",
    tagline: "Built to thrill.",
    description: "Two-wheeled icons embedded in raw resin energy.",
    image: "",
    productCount: 2,
    comingSoon: true,
  },
  {
    id: "3",
    slug: "wine-bottle",
    name: "Wine Bottle",
    tagline: "Pour with passion.",
    description: "Luxury wine and spirits immortalized in flowing resin.",
    image: "",
    productCount: 5,
    comingSoon: true,
  },
  {
    id: "4",
    slug: "marvel",
    name: "Marvel",
    tagline: "Heroes immortalized.",
    description: "Iconic superheroes sculpted in 3D resin relief.",
    image: "",
    productCount: 2,
    comingSoon: true,
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function isComingSoonCollection(slug: string): boolean {
  const collection = getCollectionBySlug(slug);
  return collection?.comingSoon ?? false;
}
