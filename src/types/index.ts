import type { FrameOption, SizeOption } from "@/types/site-settings";

export interface ProductSeries {
  id: string;
  name: string;
  slug: string;
  collection: string;
  sortOrder: number;
  /** Cards to show in the series row (products + blanks), default 3 */
  slotCount: number;
  description?: string;
  comingSoon?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Display name of the sub-series (e.g. Environment) */
  series: string;
  seriesSlug?: string;
  seriesOrder?: number;
  manufacturer?: string;
  tagline: string;
  description: string;
  basePrice: number;
  compareAtPrice?: number;
  images: string[];
  edition: { current: number; total: number };
  featured?: boolean;
  collection: string;
  /** Per-product sizes from Sanity; empty/undefined → Site Settings defaults */
  sizes?: SizeOption[];
  /** Per-product frames from Sanity; empty/undefined → Site Settings defaults */
  frames?: FrameOption[];
  craftsmanship: string[];
  packaging: string[];
  shipping: string;
  reviews: Review[];
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  productCount: number;
  comingSoon?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  image: string;
  product: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  size: string;
  frame: string;
  price: number;
  quantity: number;
}

export interface CustomOrder {
  brand: string;
  model: string;
  year: string;
  color: string;
  customText: string;
  phone: string;
  email: string;
  imageUrl?: string;
}

export interface ConfiguratorState {
  manufacturer: string;
  model: string;
  backgroundTexture: string;
  resinColor: string;
  frameSize: string;
  frameColor: string;
}
