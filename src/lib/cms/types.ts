import type { Product, Collection, Testimonial } from "@/types";
import { products, getProductBySlug, getFeaturedProducts, getProductsByCollection, getRelatedProducts } from "@/lib/data/products";
import { collections, getCollectionBySlug } from "@/lib/data/collections";
import { testimonials, customerGallery } from "@/lib/data/content";

export interface CMSAdapter {
  getProducts(): Promise<Product[]>;
  getProduct(slug: string): Promise<Product | null>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCollection(collection: string): Promise<Product[]>;
  getCollections(): Promise<Collection[]>;
  getCollection(slug: string): Promise<Collection | null>;
  getTestimonials(): Promise<Testimonial[]>;
  getGalleryImages(): Promise<typeof customerGallery>;
  submitCustomOrder(data: Record<string, unknown>): Promise<{ success: boolean }>;
  submitContact(data: Record<string, unknown>): Promise<{ success: boolean }>;
}

export class LocalCMSAdapter implements CMSAdapter {
  async getProducts() {
    return products;
  }

  async getProduct(slug: string) {
    return getProductBySlug(slug) ?? null;
  }

  async getFeaturedProducts() {
    return getFeaturedProducts();
  }

  async getProductsByCollection(collection: string) {
    return getProductsByCollection(collection);
  }

  async getCollections() {
    return collections;
  }

  async getCollection(slug: string) {
    return getCollectionBySlug(slug) ?? null;
  }

  async getTestimonials() {
    return testimonials;
  }

  async getGalleryImages() {
    return customerGallery;
  }

  async submitCustomOrder(data: Record<string, unknown>) {
    console.log("[CMS] Custom order received:", data);
    return { success: true };
  }

  async submitContact(data: Record<string, unknown>) {
    console.log("[CMS] Contact form received:", data);
    return { success: true };
  }
}

export async function getRelatedProductsFromCMS(slug: string, limit = 4) {
  return getRelatedProducts(slug, limit);
}
