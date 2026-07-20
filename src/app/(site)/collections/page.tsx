import type { Metadata } from "next";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { fetchProducts, fetchCollections } from "@/lib/cms";
import { resolveImageSrc } from "@/lib/images";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
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

  const active = collections.filter((c) => !c.comingSoon);
  const upcoming = collections.filter((c) => c.comingSoon);

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Curated"
          title="Our Collections"
          description="All cars possible — handcrafted today. New categories launching soon."
        />

        {/* Active collections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {active.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group relative overflow-hidden rounded-[20px] border border-border gold-glow-hover shadow-lift"
            >
              <div className="relative aspect-[16/9] image-zoom-container">
                <Image
                  src={resolveImageSrc(collection.image)}
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
                  <p className="text-xs text-gold mt-2">
                    {collection.productCount} pieces
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-gold opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Coming soon */}
        {upcoming.length > 0 && (
          <>
            <SectionHeading
              label="Upcoming"
              title="Coming Soon"
              description="New collections in development. Join our newsletter to be first to know."
              align="left"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
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
                      sizes="(max-width: 1024px) 50vw, 25vw"
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
