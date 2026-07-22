import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { Clock } from "lucide-react";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import {
  fetchCollection,
  fetchCollections,
  fetchProductsByCollection,
} from "@/lib/cms";
import { Badge } from "@/components/ui/badge";
import { resolveImageSrc } from "@/lib/images";
import { BRAND } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const collections = await fetchCollections();
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = await fetchCollection(slug);
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: collection.name,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = await fetchCollection(slug);
  if (!collection) notFound();

  const products = await fetchProductsByCollection(slug);

  return (
    <div className="pt-32 pb-20">
      <div className="relative h-[32vh] min-h-[220px] sm:h-[50vh] sm:min-h-[400px] mb-10 sm:mb-16">
        <Image
          src={resolveImageSrc(collection.image)}
          alt={collection.name}
          fill
          className={`object-cover ${collection.comingSoon ? "grayscale-[30%]" : ""}`}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="mx-auto max-w-7xl">
            {collection.comingSoon && (
              <Badge variant="outline" className="gap-1.5 mb-4 bg-background/80">
                <Clock size={12} />
                Coming Soon
              </Badge>
            )}
            <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
              {collection.tagline}
            </p>
            <h1 className="font-heading text-5xl md:text-6xl font-light text-foreground">
              {collection.name}
            </h1>
            <p className="text-grey mt-4 max-w-xl">{collection.description}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {products.length > 0 ? (
          <>
            {collection.comingSoon && (
              <div className="mb-10 rounded-[20px] border border-gold/20 bg-gold/5 px-6 py-4">
                <p className="font-button text-[10px] uppercase tracking-[0.2em] text-gold mb-1">
                  Early Preview
                </p>
                <p className="text-sm text-grey">
                  This collection is still launching — browse pieces below and follow{" "}
                  <span className="text-foreground">@{BRAND.instagramHandle}</span> for updates.
                </p>
              </div>
            )}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : collection.comingSoon ? (
          <SectionHeading
            title="Launching Soon"
            description={`This collection is currently in development. Follow us on Instagram @${BRAND.instagramHandle} for updates.`}
          />
        ) : (
          <SectionHeading
            title="Coming Soon"
            description="New pieces for this collection are in production. Join our newsletter to be notified."
          />
        )}
      </div>
    </div>
  );
}
