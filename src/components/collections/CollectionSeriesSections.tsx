import { ProductCard } from "@/components/product/ProductCard";
import { groupProductsBySeries } from "@/lib/series";
import type { Product, ProductSeries } from "@/types";

interface CollectionSeriesSectionsProps {
  products: Product[];
  seriesList: ProductSeries[];
}

export function CollectionSeriesSections({
  products,
  seriesList,
}: CollectionSeriesSectionsProps) {
  const groups = groupProductsBySeries(products, seriesList).filter(
    ({ products: seriesProducts }) => seriesProducts.length > 0
  );
  const useSeriesLayout = seriesList.length > 0;

  if (groups.length === 0) return null;

  return (
    <div className="space-y-12 md:space-y-16">
      {groups.map(({ series, products: seriesProducts }) => (
        <section key={series?.id ?? "ungrouped"}>
          {series && (
            <div className="mb-6">
              <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
                Series {String(series.sortOrder).padStart(2, "0")}
              </p>
              <h3 className="font-heading text-2xl md:text-3xl font-light text-foreground">
                {series.name}
              </h3>
              {series.description && (
                <p className="text-grey text-sm mt-2 max-w-xl">
                  {series.description}
                </p>
              )}
            </div>
          )}

          <div
            className={
              useSeriesLayout
                ? "grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8"
                : "flex flex-wrap justify-center gap-3 sm:gap-8"
            }
          >
            {seriesProducts.map((product) => (
              <div
                key={product.id}
                className={
                  useSeriesLayout
                    ? undefined
                    : "w-[calc(50%-0.375rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.375rem)]"
                }
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
