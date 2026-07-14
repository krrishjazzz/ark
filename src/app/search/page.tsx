"use client";

import { useState, useMemo } from "react";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/data/products";
import { cn } from "@/lib/utils";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

const collectionFilters = [
  "All",
  "supercars",
  "motorcycles",
  "badge-series",
  "abstract",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [filter, setFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    let filtered = products;

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.series.toLowerCase().includes(q) ||
          p.manufacturer?.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
      );
    }

    if (filter !== "All") {
      filtered = filtered.filter((p) => p.collection === filter);
    }

    switch (sort) {
      case "price-asc":
        filtered = [...filtered].sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price-desc":
        filtered = [...filtered].sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "newest":
        filtered = [...filtered].sort((a, b) => Number(b.id) - Number(a.id));
        break;
      default:
        filtered = [...filtered].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
    }

    return filtered;
  }, [query, sort, filter]);

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading label="Discover" title="Search" align="left" />

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <SearchIcon
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-grey"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, series, or manufacturer..."
              className="pl-12"
              aria-label="Search products"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 rounded-[20px] border border-border text-grey hover:text-gold hover:border-gold/30 transition-all"
          >
            <SlidersHorizontal size={16} />
            <span className="font-button text-[10px] uppercase tracking-wider">
              Filters
            </span>
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-4 mb-8 p-6 rounded-[20px] border border-border">
            <div className="flex flex-wrap gap-2">
              {collectionFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "font-button text-[9px] uppercase tracking-wider px-4 py-2 rounded-full border transition-all",
                    filter === f
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-border text-grey hover:border-gold/30"
                  )}
                >
                  {f === "All" ? "All" : f.replace("-", " ")}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="ml-auto bg-card border border-border rounded-full px-4 py-2 text-xs text-grey"
              aria-label="Sort products"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <p className="text-sm text-grey mb-8">
          {results.length} {results.length === 1 ? "piece" : "pieces"} found
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
