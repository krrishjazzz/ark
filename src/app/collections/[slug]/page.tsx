import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { getCollectionBySlug } from "@/lib/data/collections";
import { getProductsByCollection } from "@/lib/data/products";
import { collections } from "@/lib/data/collections";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: collection.name,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const collectionProducts = getProductsByCollection(
    slug.replace("-series", "").replace("velocity-series", "supercars")
  );

  const allProducts = collectionProducts.length > 0
    ? collectionProducts
    : getProductsByCollection(slug);

  return (
    <div className="pt-32 pb-20">
      <div className="relative h-[50vh] min-h-[400px] mb-16">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="mx-auto max-w-7xl">
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
        {allProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
