import type { Metadata } from "next";
import { CustomerGallery } from "@/components/home/CustomerGallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore ARK resin art displayed in luxury homes, offices, and showrooms worldwide.",
};

export default function GalleryPage() {
  return (
    <div className="pt-20">
      <CustomerGallery />
    </div>
  );
}
