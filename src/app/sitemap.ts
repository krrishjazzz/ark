import type { MetadataRoute } from "next";
import { fetchProducts, fetchCollections } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://arkresin.art";
  const [products, collections] = await Promise.all([
    fetchProducts(),
    fetchCollections(),
  ]);

  const staticPages = [
    "",
    "/collections",
    "/gallery",
    "/craftsmanship",
    "/custom-orders",
    "/about",
    "/contact",
    "/configurator",
    "/garage",
    "/search",
    "/cart",
    "/checkout",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productPages = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const collectionPages = collections.map((c) => ({
    url: `${baseUrl}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...collectionPages];
}
