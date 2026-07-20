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
  fetchTestimonials,
  fetchGalleryImages,
} from "@/lib/cms";

export default async function HomePage() {
  const [collections, featuredProducts, testimonials, galleryImages] =
    await Promise.all([
      fetchCollections(),
      fetchFeaturedProducts(),
      fetchTestimonials(),
      fetchGalleryImages(),
    ]);

  return (
    <>
      <Hero />
      <FeaturedCollections collections={collections} />
      <Craftsmanship />
      <ProductShowcase products={featuredProducts} />
      <WhyARK />
      <PackagingShowcase />
      <OurStory />
      <CustomerGallery images={galleryImages} />
      <Testimonials items={testimonials} />
      <InstagramFeed />
    </>
  );
}
