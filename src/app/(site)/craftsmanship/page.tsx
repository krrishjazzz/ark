import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { craftsmanshipFeatures } from "@/lib/data/content";
import { fetchSiteSettings } from "@/lib/cms";
import { resolveImageSrc } from "@/lib/images";

export const metadata: Metadata = {
  title: "Craftsmanship",
  description: "Discover the meticulous process behind every ARK resin masterpiece.",
};

export default async function CraftsmanshipPage() {
  const { aboutHero } = await fetchSiteSettings();

  return (
    <div className="pt-32 pb-20">
      <div className="relative h-[50vh] min-h-[400px] mb-20">
        <Image
          src={resolveImageSrc(aboutHero)}
          alt="ARK craftsmanship"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="mx-auto max-w-7xl">
            <h1 className="font-heading text-5xl md:text-6xl font-light text-foreground">
              The Art of <span className="text-gold-gradient">Craftsmanship</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Process"
          title="From Pour to Masterpiece"
          description="Every ARK piece undergoes a rigorous 40+ hour creation process. No shortcuts. No compromises."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          {craftsmanshipFeatures.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.1}>
              <div className="flex gap-6 p-8 rounded-[20px] border border-border gold-glow-hover">
                <span className="font-heading text-4xl text-gold/30 font-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-xl text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-grey leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Craftsmanship film placeholder */}
        <FadeIn>
          <div className="relative aspect-video rounded-[20px] overflow-hidden border border-border bg-card flex items-center justify-center">
            <div className="text-center">
              <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
                Craftsmanship Film
              </p>
              <p className="font-heading text-2xl text-foreground/60">
                Resin pouring · Polishing · Assembling · Packaging
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
