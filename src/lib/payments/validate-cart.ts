import { fetchProduct, fetchSiteSettings } from "@/lib/cms";
import { calculatePrice } from "@/lib/checkout";
import { resolveProductFrames, resolveProductSizes } from "@/lib/commerce";
import type { CartItem } from "@/types";

export interface ClientCartItem {
  slug: string;
  size: string;
  frame: string;
  quantity: number;
}

export async function validateAndPriceCart(items: ClientCartItem[]): Promise<CartItem[]> {
  if (!items.length) {
    throw new Error("Cart is empty");
  }

  const siteSettings = await fetchSiteSettings();
  const validated: CartItem[] = [];

  for (const item of items) {
    const product = await fetchProduct(item.slug);
    if (!product) {
      throw new Error(`Product not found: ${item.slug}`);
    }

    const sizes = resolveProductSizes(product, siteSettings.sizes);
    const frames = resolveProductFrames(product, siteSettings.frames);
    const validSizes = new Set(sizes.map((s) => s.value));
    const validFrames = new Set(frames.map((f) => f.value));

    if (!validSizes.has(item.size)) {
      throw new Error(`Invalid size for ${product.name}: ${item.size}`);
    }
    if (!validFrames.has(item.frame)) {
      throw new Error(`Invalid frame for ${product.name}: ${item.frame}`);
    }

    const quantity = Math.min(Math.max(1, item.quantity), 10);
    const price = calculatePrice(
      product.basePrice,
      item.size,
      sizes,
      item.frame,
      frames
    );
    const image = product.images[0] ?? "/images/collection-car-grid.png";

    validated.push({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image,
      size: item.size,
      frame: item.frame,
      price,
      quantity,
    });
  }

  return validated;
}
