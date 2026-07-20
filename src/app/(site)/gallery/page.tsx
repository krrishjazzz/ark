import type { Metadata } from "next";
import { CustomerGallery } from "@/components/home/CustomerGallery";
import { fetchGalleryImages } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore ARK resin art displayed in luxury homes, offices, and showrooms worldwide.",
};

export default async function GalleryPage() {
  const images = await fetchGalleryImages();

  return (
    <div className="pt-20">
      <CustomerGallery images={images} />
    </div>
  );
}
