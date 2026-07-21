import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductViewer360 } from "@/components/product/ProductViewer360";
import { StickyPurchaseCard } from "@/components/product/StickyPurchaseCard";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { fetchProduct, fetchProducts, fetchRelatedProducts, fetchCollection } from "@/lib/cms";
import { isComingSoonCollection } from "@/lib/data/collections";
import { Star } from "lucide-react";
import { ProductViewTracker } from "@/components/product/ProductViewTracker";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) notFound();

  const related = await fetchRelatedProducts(slug);
  const collection = await fetchCollection(product.collection);
  const comingSoon =
    collection?.comingSoon ?? isComingSoonCollection(product.collection);

  return (
    <div className="pt-28 pb-20">
      <ProductViewTracker slug={slug} />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-3 space-y-8">
            <ProductGallery images={product.images} name={product.name} />
            <div>
              <p className="font-button text-[10px] uppercase tracking-[0.2em] text-gold mb-4">
                360° View
              </p>
              <ProductViewer360 images={product.images} name={product.name} />
            </div>
          </div>
          <div className="lg:col-span-2">
            <StickyPurchaseCard product={product} comingSoon={comingSoon} />
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
          <FadeIn>
            <h3 className="font-heading text-2xl font-light text-foreground mb-4">
              Craftsmanship
            </h3>
            <ul className="space-y-3">
              {product.craftsmanship.map((item) => (
                <li key={item} className="text-sm text-grey flex items-start gap-2">
                  <span className="text-gold mt-1">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="font-heading text-2xl font-light text-foreground mb-4">
              Packaging
            </h3>
            <ul className="space-y-3">
              {product.packaging.map((item) => (
                <li key={item} className="text-sm text-grey flex items-start gap-2">
                  <span className="text-gold mt-1">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h3 className="font-heading text-2xl font-light text-foreground mb-4">
              Shipping
            </h3>
            <p className="text-sm text-grey leading-relaxed">{product.shipping}</p>
          </FadeIn>
        </div>

        {product.reviews.length > 0 && (
          <div className="mt-24">
            <SectionHeading label="Reviews" title="Collector Reviews" align="left" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-8 rounded-[20px] border border-border glass"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={
                          i < review.rating
                            ? "fill-gold text-gold"
                            : "text-border"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-foreground/80 italic font-light">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                  <p className="text-xs text-grey mt-4">
                    — {review.author}, {review.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-24">
            <SectionHeading
              label="You May Also Like"
              title="Related Pieces"
              align="left"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
