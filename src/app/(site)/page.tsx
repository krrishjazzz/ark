import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { Craftsmanship } from "@/components/home/Craftsmanship";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { WhyARK } from "@/components/home/WhyARK";
import { PackagingShowcase } from "@/components/home/PackagingShowcase";
import { OurStory } from "@/components/home/OurStory";
import { CustomerGallery } from "@/components/home/CustomerGallery";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import {
  fetchCollections,
  fetchFeaturedProducts,
  fetchProducts,
  fetchTestimonials,
  fetchGalleryImages,
} from "@/lib/cms";
import { isComingSoonCollection } from "@/lib/data/collections";

export default async function HomePage() {
  const [collections, products, featuredProducts, testimonials, galleryImages] =
    await Promise.all([
      fetchCollections(),
      fetchProducts(),
      fetchFeaturedProducts(),
      fetchTestimonials(),
      fetchGalleryImages(),
    ]);

  const previewProducts = featuredProducts.filter((p) =>
    isComingSoonCollection(p.collection)
  );

  return (
    <>
      <Hero />
      <FeaturedCollections collections={collections} products={products} />
      <Craftsmanship />
      {previewProducts.length > 0 && (
        <ProductShowcase
          products={previewProducts}
          label="Early Preview"
          title="Coming Soon"
          description="A first look at pieces from our upcoming collections. Tap to explore — available to preview, not to purchase yet."
        />
      )}
      <WhyARK />
      <PackagingShowcase />
      <OurStory />
      <CustomerGallery images={galleryImages} />
      <Testimonials items={testimonials} />
      <InstagramFeed />
    </>
  );
}
