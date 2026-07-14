import type { Metadata } from "next";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/data/products";
import { collections } from "@/lib/data/collections";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore ARK's curated collections of handcrafted resin automotive art.",
};

export default function CollectionsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Curated"
          title="Our Collections"
          description="Seven distinct series. One uncompromising standard of craftsmanship."
        />

        {/* Collection categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group relative overflow-hidden rounded-[20px] border border-border gold-glow-hover shadow-lift"
            >
              <div className="relative aspect-[16/9] image-zoom-container">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-light text-foreground">
                    {collection.name}
                  </h3>
                  <p className="text-xs text-grey mt-1">{collection.tagline}</p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-gold opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* All products */}
        <SectionHeading
          label="All Pieces"
          title="Every Masterpiece"
          align="left"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
