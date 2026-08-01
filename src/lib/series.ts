import type { Product, ProductSeries } from "@/types";

function normalizeSeriesKey(value?: string | null): string {
  return (value || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Match product to series by slug or display name (handles CMS edge cases) */
export function productMatchesSeries(
  product: Pick<Product, "seriesSlug" | "series">,
  series: Pick<ProductSeries, "slug" | "name">
): boolean {
  const productSlug = normalizeSeriesKey(product.seriesSlug);
  const seriesSlug = normalizeSeriesKey(series.slug);
  if (productSlug && seriesSlug && productSlug === seriesSlug) return true;

  const productName = normalizeSeriesKey(product.series);
  const seriesName = normalizeSeriesKey(series.name);
  if (productName && seriesName && productName === seriesName) return true;

  // "Small Car" name ↔ "small-car" slug
  if (productName && seriesSlug && productName === seriesSlug) return true;
  if (productSlug && seriesName && productSlug === seriesName) return true;

  return false;
}

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
      const matched = products.filter((p) => productMatchesSeries(p, series));
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
