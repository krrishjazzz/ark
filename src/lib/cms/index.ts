/**
 * CMS-ready data layer for ARK
 *
 * This module provides a clean abstraction over data sources.
 * Currently backed by local JSON/TS files. Swap implementations
 * to connect Sanity, Contentful, Strapi, or a custom admin API.
 */

import type { Product, Collection, Testimonial } from "@/types";
import { products, getProductBySlug, getFeaturedProducts } from "@/lib/data/products";
import { collections, getCollectionBySlug } from "@/lib/data/collections";
import { testimonials, customerGallery } from "@/lib/data/content";

export interface CMSAdapter {
  getProducts(): Promise<Product[]>;
  getProduct(slug: string): Promise<Product | null>;
  getCollections(): Promise<Collection[]>;
  getCollection(slug: string): Promise<Collection | null>;
  getTestimonials(): Promise<Testimonial[]>;
  getGalleryImages(): Promise<typeof customerGallery>;
  submitCustomOrder(data: Record<string, unknown>): Promise<{ success: boolean }>;
  submitContact(data: Record<string, unknown>): Promise<{ success: boolean }>;
}

class LocalCMSAdapter implements CMSAdapter {
  async getProducts() {
    return products;
  }

  async getProduct(slug: string) {
    return getProductBySlug(slug) ?? null;
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

let cmsInstance: CMSAdapter = new LocalCMSAdapter();

export function setCMSAdapter(adapter: CMSAdapter) {
  cmsInstance = adapter;
}

export function getCMS(): CMSAdapter {
  return cmsInstance;
}

export { products, collections, testimonials, getFeaturedProducts };
