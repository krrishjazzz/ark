import { IMAGES } from "@/lib/constants";
import type { Collection } from "@/types";

export const collections: Collection[] = [
  {
    id: "1",
    slug: "cars",
    name: "Cars",
    tagline: "All cars possible.",
    description:
      "Every make. Every model. Every dream machine — handcrafted in museum-grade resin. Porsche, BMW, Audi, Ferrari, Rolls Royce, and beyond.",
    image: IMAGES.collectionCars,
    productCount: 4,
    comingSoon: false,
  },
  {
    id: "2",
    slug: "motorcycles",
    name: "Motorcycles",
    tagline: "Built to thrill.",
    description:
      "Two-wheeled icons frozen in raw resin energy. Superbikes and classics for the passionate rider.",
    image: IMAGES.collectionBmwMotorrad,
    productCount: 2,
    comingSoon: true,
  },
  {
    id: "3",
    slug: "wine-bottle",
    name: "Wine Bottle",
    tagline: "Pour with passion.",
    description:
      "Luxury wine and spirits immortalized in flowing resin — for collectors and connoisseurs.",
    image: IMAGES.collectionWineBottle,
    productCount: 5,
    comingSoon: false,
  },
  {
    id: "5",
    slug: "marvel",
    name: "Marvel",
    tagline: "Heroes immortalized.",
    description:
      "Iconic superheroes sculpted in 3D resin relief — Spider-Man, Batman, and beyond for the devoted collector.",
    image: IMAGES.collectionMarvel,
    productCount: 2,
    comingSoon: true,
  },
];

export const activeCollections = collections.filter((c) => !c.comingSoon);
export const comingSoonCollections = collections.filter((c) => c.comingSoon);

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
