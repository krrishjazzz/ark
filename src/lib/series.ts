import type { Product, ProductSeries } from "@/types";

export function groupProductsBySeries(
  products: Product[],
  seriesList: ProductSeries[]
): Array<{ series: ProductSeries | null; products: Product[] }> {
  if (seriesList.length === 0) {
    return [{ series: null, products }];
  }

  const used = new Set<string>();
  const groups: Array<{ series: ProductSeries | null; products: Product[] }> =
    seriesList.map((series) => {
      const matched = products.filter((p) => p.seriesSlug === series.slug);
      matched.forEach((p) => used.add(p.id));
      return { series, products: matched };
    });

  const ungrouped = products.filter((p) => !used.has(p.id));
  if (ungrouped.length > 0) {
    groups.push({ series: null, products: ungrouped });
  }

  return groups;
}

export function seriesBlankCount(
  series: ProductSeries | null,
  productCount: number
): number {
  if (!series) return 0;
  const slots = series.slotCount > 0 ? series.slotCount : 3;
  return Math.max(0, slots - productCount);
}
