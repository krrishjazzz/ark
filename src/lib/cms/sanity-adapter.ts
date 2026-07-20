import { client, writeClient } from "@/sanity/lib/client";
import {
  productsQuery,
  productBySlugQuery,
  featuredProductsQuery,
  collectionsQuery,
  collectionBySlugQuery,
  testimonialsQuery,
  galleryImagesQuery,
} from "@/sanity/queries";
import {
  mapSanityProduct,
  mapSanityCollection,
  mapSanityTestimonial,
  mapSanityGalleryImage,
} from "@/sanity/lib/mappers";
import type { CMSAdapter } from "@/lib/cms/types";
import type { Product, Collection, Testimonial } from "@/types";

export class SanityCMSAdapter implements CMSAdapter {
  async getProducts(): Promise<Product[]> {
    const docs = await client.fetch(productsQuery);
    return docs.map(mapSanityProduct);
  }

  async getProduct(slug: string): Promise<Product | null> {
    const doc = await client.fetch(productBySlugQuery, { slug });
    return doc ? mapSanityProduct(doc) : null;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const docs = await client.fetch(featuredProductsQuery);
    return docs.map(mapSanityProduct);
  }

  async getProductsByCollection(collection: string): Promise<Product[]> {
    const products = await this.getProducts();
    return products.filter((p) => p.collection === collection);
  }

  async getCollections(): Promise<Collection[]> {
    const docs = await client.fetch(collectionsQuery);
    return docs.map(mapSanityCollection);
  }

  async getCollection(slug: string): Promise<Collection | null> {
    const doc = await client.fetch(collectionBySlugQuery, { slug });
    return doc ? mapSanityCollection(doc) : null;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    const docs = await client.fetch(testimonialsQuery);
    return docs.map(mapSanityTestimonial);
  }

  async getGalleryImages() {
    const docs = await client.fetch(galleryImagesQuery);
    return docs.map(mapSanityGalleryImage);
  }

  async submitCustomOrder(data: Record<string, unknown>) {
    if (!process.env.SANITY_API_TOKEN) {
      console.log("[Sanity] Custom order (no token):", data);
      return { success: true };
    }

    await writeClient.create({
      _type: "customOrder",
      ...data,
      status: "new",
      submittedAt: new Date().toISOString(),
    });
    return { success: true };
  }

  async submitContact(data: Record<string, unknown>) {
    console.log("[Sanity] Contact form:", data);
    return { success: true };
  }
}
