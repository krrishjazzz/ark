import { fetchProduct } from "@/lib/cms";
import { calculatePrice } from "@/lib/checkout";
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

  const validated: CartItem[] = [];

  for (const item of items) {
    const product = await fetchProduct(item.slug);
    if (!product) {
      throw new Error(`Product not found: ${item.slug}`);
    }

    const quantity = Math.min(Math.max(1, item.quantity), 10);
    const price = calculatePrice(product.basePrice, item.size);
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
