import type { Metadata } from "next";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { PackagingShowcase } from "@/components/home/PackagingShowcase";
import { fetchSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Unboxing",
  description:
    "The ARK unboxing ritual — magnetic box, certificate of authenticity, microfiber cloth, and handwritten thank you.",
};

export default async function UnboxingPage() {
  const { packagingItems } = await fetchSiteSettings();

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Unboxing"
          title="Premium Packaging"
          description="Every ARK piece arrives as a ritual — presented, protected, and ready for the wall."
        />

        <div className="mx-auto max-w-4xl mb-20">
          <PackagingShowcase />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {packagingItems.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <div className="p-8 rounded-[20px] border border-border">
                <p className="font-heading text-2xl text-gold/40 mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-heading text-xl text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-grey leading-relaxed">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
