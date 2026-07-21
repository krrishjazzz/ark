import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { fetchProducts, fetchCollections } from "@/lib/cms";
import { isComingSoonCollection } from "@/lib/data/collections";
import { resolveImageSrc } from "@/lib/images";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore ARK's handcrafted resin art — cars, wine & spirits, motorcycles, Marvel, and more.",
};

export default async function CollectionsPage() {
  const [products, collections] = await Promise.all([
    fetchProducts(),
    fetchCollections(),
  ]);

  const liveCollections = collections.filter((c) => !c.comingSoon);
  const upcoming = collections.filter((c) => c.comingSoon);
  const liveProducts = products.filter((p) => !isComingSoonCollection(p.collection));

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Curated"
          title="Our Collections"
          description="Shop available pieces today. Browse upcoming collections and preview what's launching next."
        />

        {liveProducts.length > 0 && (
          <div className="mb-20">
            {liveCollections.map((collection) => {
              const collectionProducts = liveProducts.filter(
                (p) => p.collection === collection.slug
              );
              if (collectionProducts.length === 0) return null;

              return (
                <div key={collection.id} className="mb-16 last:mb-0">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                    <div>
                      <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
                        Available Now
                      </p>
                      <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground">
                        {collection.name}
                      </h2>
                      <p className="text-sm text-grey mt-2 max-w-xl">{collection.description}</p>
                    </div>
                    <Link
                      href={`/collections/${collection.slug}`}
                      className="font-button text-[10px] uppercase tracking-[0.2em] text-gold hover:text-gold-light transition-colors shrink-0"
                    >
                      View collection →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {collectionProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {upcoming.length > 0 && (
          <>
            <SectionHeading
              label="Upcoming"
              title="Coming Soon"
              description="New collections in development — click to preview pieces inside each collection."
              align="left"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {upcoming.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.slug}`}
                  className="group relative overflow-hidden rounded-[20px] border border-border opacity-90 gold-glow-hover shadow-lift transition-opacity hover:opacity-100"
                >
                  <div className="relative aspect-[16/9] image-zoom-container">
                    <Image
                      src={resolveImageSrc(collection.image)}
                      alt={collection.name}
                      fill
                      className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="gap-1.5 bg-background/80">
                        <Clock size={10} />
                        Coming Soon
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-lg font-light text-foreground group-hover:text-gold transition-colors">
                        {collection.name}
                      </h3>
                      <p className="text-xs text-grey mt-1">{collection.tagline}</p>
                      {collection.productCount > 0 && (
                        <p className="text-xs text-gold mt-2">
                          {collection.productCount} pieces to preview
                        </p>
                      )}
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-gold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
