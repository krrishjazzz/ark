import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { Craftsmanship } from "@/components/home/Craftsmanship";
import { PackagingShowcase } from "@/components/home/PackagingShowcase";
import { CustomerGallery } from "@/components/home/CustomerGallery";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import {
  fetchCollections,
  fetchProducts,
  fetchTestimonials,
  fetchGalleryImages,
} from "@/lib/cms";

export default async function HomePage() {
  const [collections, products, testimonials, galleryImages] =
    await Promise.all([
      fetchCollections(),
      fetchProducts(),
      fetchTestimonials(),
      fetchGalleryImages(),
    ]);

  return (
    <>
      <Hero />
      <FeaturedCollections collections={collections} products={products} />
      <section className="py-12 md:py-16 px-6 lg:px-8 bg-card/30">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <Craftsmanship />
          <PackagingShowcase />
        </div>
      </section>
      <Testimonials items={testimonials} />
      <CustomerGallery images={galleryImages} />
      <InstagramFeed variant="cta" />
    </>
  );
}
