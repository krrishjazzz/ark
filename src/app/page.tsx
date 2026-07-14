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

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <Craftsmanship />
      <ProductShowcase />
      <WhyARK />
      <PackagingShowcase />
      <OurStory />
      <CustomerGallery />
      <Testimonials />
      <InstagramFeed />
    </>
  );
}
