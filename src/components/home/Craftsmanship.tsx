"use client";

import {
  Droplets,
  Hand,
  Sun,
  Gem,
  Award,
  Frame,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { craftsmanshipFeatures } from "@/lib/data/content";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { resolveImageSrc } from "@/lib/images";

const iconMap: Record<string, LucideIcon> = {
  Droplets,
  Hand,
  Sun,
  Gem,
  Award,
  Frame,
};

function CraftImage({ src, alt }: { src: string; alt: string }) {
  const sharedClass =
    "rounded-[20px] aspect-[16/10] sm:aspect-[4/5] max-h-[240px] sm:max-h-[480px] lg:max-h-none w-full border border-border shadow-luxury spotlight-card";

  return (
    <div className="max-sm:hidden">
      <ParallaxImage src={src} alt={alt} className={sharedClass} speed={0.2} />
    </div>
  );
}

function CraftImageMobile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[16/10] max-h-[220px] w-full rounded-[20px] overflow-hidden border border-border shadow-luxury spotlight-card sm:hidden">
      <Image src={src} alt={alt} fill className="object-cover object-center" sizes="100vw" />
    </div>
  );
}

export function Craftsmanship() {
  const { craftsmanshipPrimary, craftsmanshipSecondary } = useSiteSettings();

  return (
    <section className="section-padding px-6 lg:px-8 bg-card/30" aria-label="Craftsmanship">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="The Process"
          title="Luxury Craftsmanship"
          description="Every ARK piece undergoes 40+ hours of meticulous handcrafting. From resin pour to final polish."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 lg:gap-24 items-center mb-16 sm:mb-24">
          <FadeIn direction="left">
            <CraftImageMobile src={resolveImageSrc(craftsmanshipPrimary)} alt="Audi R8 resin art craftsmanship" />
            <CraftImage src={resolveImageSrc(craftsmanshipPrimary)} alt="Audi R8 resin art craftsmanship" />
          </FadeIn>
          <FadeIn direction="right" delay={0.2}>
            <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
              Museum Grade
            </p>
            <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-light text-foreground mb-4 sm:mb-6 leading-tight">
              Where engineering meets art
            </h3>
            <p className="text-sm sm:text-base text-grey leading-relaxed mb-6 sm:mb-8">
              Our artisans combine automotive passion with resin artistry. Each
              layer is poured by hand, each texture sculpted with precision, each
              surface polished to a mirror finish that captures light like liquid
              gold.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {craftsmanshipFeatures.slice(0, 4).map((feature) => {
                const Icon = iconMap[feature.icon] || Gem;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-[20px] border border-border gold-glow-hover"
                  >
                    <Icon size={16} className="text-gold mt-0.5 shrink-0 sm:hidden" />
                    <Icon size={18} className="text-gold mt-0.5 shrink-0 hidden sm:block" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-foreground">
                        {feature.title}
                      </p>
                      <p className="text-[10px] sm:text-xs text-grey mt-1 line-clamp-2">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 lg:gap-24 items-center">
          <FadeIn direction="left" delay={0.2} className="lg:order-2">
            <CraftImageMobile src={resolveImageSrc(craftsmanshipSecondary)} alt="Rolls Royce resin art detail" />
            <CraftImage src={resolveImageSrc(craftsmanshipSecondary)} alt="Rolls Royce resin art detail" />
          </FadeIn>
          <FadeIn direction="right" className="lg:order-1">
            <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
              Limited Edition
            </p>
            <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-light text-foreground mb-4 sm:mb-6 leading-tight">
              Built to become heirlooms
            </h3>
            <p className="text-sm sm:text-base text-grey leading-relaxed mb-6 sm:mb-8">
              UV-resistant coatings, solid hardwood frames, and numbered editions
              ensure your ARK piece remains a centerpiece for generations. This is
              not decor — this is legacy.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {craftsmanshipFeatures.slice(4).map((feature) => {
                const Icon = iconMap[feature.icon] || Gem;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-[20px] border border-border gold-glow-hover"
                  >
                    <Icon size={16} className="text-gold mt-0.5 shrink-0 sm:hidden" />
                    <Icon size={18} className="text-gold mt-0.5 shrink-0 hidden sm:block" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-foreground">
                        {feature.title}
                      </p>
                      <p className="text-[10px] sm:text-xs text-grey mt-1 line-clamp-2">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
