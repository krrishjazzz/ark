"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/data/products";
import { MANUFACTURERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function GaragePage() {
  const [activeManufacturer, setActiveManufacturer] = useState<string | null>(null);

  const filtered = activeManufacturer
    ? products.filter((p) => p.manufacturer === activeManufacturer)
    : products.filter((p) => p.manufacturer);

  const availableManufacturers = MANUFACTURERS.filter((m) =>
    products.some((p) => p.manufacturer === m)
  );

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Garage"
          title="Garage Collection"
          description="Browse by manufacturer. Find the machine that speaks to you."
        />

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setActiveManufacturer(null)}
            className={cn(
              "font-button text-[10px] uppercase tracking-[0.15em] px-5 py-2.5 rounded-full border transition-all duration-500",
              !activeManufacturer
                ? "border-gold/50 text-gold bg-gold/5"
                : "border-border text-grey hover:border-gold/30"
            )}
          >
            All
          </button>
          {availableManufacturers.map((m) => (
            <button
              key={m}
              onClick={() => setActiveManufacturer(m)}
              className={cn(
                "font-button text-[10px] uppercase tracking-[0.15em] px-5 py-2.5 rounded-full border transition-all duration-500",
                activeManufacturer === m
                  ? "border-gold/50 text-gold bg-gold/5"
                  : "border-border text-grey hover:border-gold/30"
              )}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-grey py-20">
            New pieces for this manufacturer are coming soon.
          </p>
        )}
      </div>
    </div>
  );
}
