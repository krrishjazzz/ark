import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { CollectionSeriesSections } from "@/components/collections/CollectionSeriesSections";
import {
  fetchProducts,
  fetchCollections,
  fetchSeriesForCollection,
} from "@/lib/cms";
import { isComingSoonCollection } from "@/lib/data/collections";
import { resolveImageSrc } from "@/lib/images";
import { Badge } from "@/components/ui/badge";
import {
  buildCollectionInterestMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";
import type { ProductSeries } from "@/types";

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

  const seriesByCollection = new Map<string, ProductSeries[]>();
  await Promise.all(
    liveCollections.map(async (collection) => {
      const series = await fetchSeriesForCollection(collection.slug);
      seriesByCollection.set(collection.slug, series);
    })
  );

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Curated"
          title="Our Collections"
          description="Shop available pieces today. Browse upcoming collections and preview what's launching next."
        />

        {liveCollections.length > 0 && (
          <div className="mb-20 space-y-20">
            {liveCollections.map((collection) => {
              const collectionProducts = liveProducts.filter(
                (p) => p.collection === collection.slug
              );
              const seriesList = seriesByCollection.get(collection.slug) ?? [];
              if (collectionProducts.length === 0 && seriesList.length === 0) {
                return null;
              }

              return (
                <div key={collection.id}>
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                    <div>
                      <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
                        Available Now
                      </p>
                      <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground">
                        {collection.name}
                      </h2>
                      <p className="text-sm text-grey mt-2 max-w-xl">
                        {collection.description}
                      </p>
                    </div>
                    <Link
                      href={`/collections/${collection.slug}`}
                      className="font-button text-[10px] uppercase tracking-[0.2em] text-gold hover:text-gold-light transition-colors shrink-0"
                    >
                      View collection →
                    </Link>
                  </div>

                  <CollectionSeriesSections
                    products={collectionProducts}
                    seriesList={seriesList}
                  />
                </div>
              );
            })}
          </div>
        )}

        {upcoming.length > 0 && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-2">
              <SectionHeading
                label="Upcoming"
                title="Coming Soon"
                description="New collections in development — preview pieces, or register interest to be notified."
                align="left"
                className="mb-0"
              />
              <a
                href={buildWhatsAppUrl(
                  buildCollectionInterestMessage(upcoming[0].name)
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="font-button text-[9px] uppercase tracking-[0.18em] px-5 py-2.5 rounded-sm bg-gold text-background hover:bg-gold-light transition-colors shrink-0 text-center sm:mb-8"
              >
                WhatsApp — Notify Me
              </a>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-24">
              {upcoming.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.slug}`}
                  className="group relative overflow-hidden rounded-[20px] border border-border opacity-90 gold-glow-hover shadow-lift transition-opacity hover:opacity-100"
                >
                  <div className="relative aspect-[4/3] sm:aspect-[16/9] image-zoom-container">
                    <Image
                      src={resolveImageSrc(collection.image)}
                      alt={collection.name}
                      fill
                      className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                      <Badge variant="outline" className="gap-1.5 bg-background/80 max-sm:text-[8px] max-sm:px-2 max-sm:py-0.5">
                        <Clock size={10} className="max-sm:w-2 max-sm:h-2" />
                        <span className="max-sm:hidden">Coming Soon</span>
                        <span className="sm:hidden">Soon</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3 sm:p-5 flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-heading text-sm sm:text-lg font-light text-foreground group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                        {collection.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-grey mt-1 line-clamp-1">{collection.tagline}</p>
                      {collection.productCount > 0 && (
                        <p className="text-[10px] sm:text-xs text-gold mt-1 sm:mt-2">
                          {collection.productCount} pieces
                        </p>
                      )}
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="text-gold shrink-0 sm:hidden"
                    />
                    <ArrowUpRight
                      size={16}
                      className="text-gold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block"
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
