export interface Product {
  id: string;
  slug: string;
  name: string;
  series: string;
  manufacturer?: string;
  tagline: string;
  description: string;
  basePrice: number;
  images: string[];
  edition: { current: number; total: number };
  featured?: boolean;
  collection: string;
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
