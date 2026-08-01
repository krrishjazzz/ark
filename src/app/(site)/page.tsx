import { Hero } from "@/components/home/Hero";
import { HomeCarsSeries } from "@/components/home/HomeCarsSeries";
import { Craftsmanship } from "@/components/home/Craftsmanship";
import { CustomerGallery } from "@/components/home/CustomerGallery";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import {
  fetchCollections,
  fetchProducts,
  fetchSeriesForCollection,
  fetchTestimonials,
  fetchGalleryImages,
} from "@/lib/cms";

/** Keep homepage cars/series in sync with Sanity quickly */
export const revalidate = 0;

export default async function HomePage() {
  const [collections, products, carSeries, testimonials, galleryImages] =
    await Promise.all([
      fetchCollections(),
      fetchProducts(),
      fetchSeriesForCollection("cars"),
      fetchTestimonials(),
      fetchGalleryImages(),
    ]);

  return (
    <>
      <Hero />
      <HomeCarsSeries
        collections={collections}
        products={products}
        seriesList={carSeries}
      />
      <section className="py-12 md:py-16 px-6 lg:px-8 bg-card/30">
        <div className="mx-auto max-w-3xl">
          <Craftsmanship />
        </div>
      </section>
      <Testimonials items={testimonials} />
      <CustomerGallery images={galleryImages} />
      <InstagramFeed variant="cta" />
    </>
  );
}
