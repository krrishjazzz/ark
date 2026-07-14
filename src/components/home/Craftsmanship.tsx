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
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { craftsmanshipFeatures } from "@/lib/data/content";
import { IMAGES } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  Droplets,
  Hand,
  Sun,
  Gem,
  Award,
  Frame,
};

export function Craftsmanship() {
  return (
    <section className="section-padding px-6 lg:px-8 bg-card/30" aria-label="Craftsmanship">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="The Process"
          title="Luxury Craftsmanship"
          description="Every ARK piece undergoes 40+ hours of meticulous handcrafting. From resin pour to final polish."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          <FadeIn direction="left">
            <ParallaxImage
              src={IMAGES.productEasel}
              alt="ARK craftsmanship detail"
              className="rounded-[20px] aspect-[4/5]"
              speed={0.2}
            />
          </FadeIn>
          <FadeIn direction="right" delay={0.2}>
            <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
              Museum Grade
            </p>
            <h3 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-6 leading-tight">
              Where engineering meets art
            </h3>
            <p className="text-grey leading-relaxed mb-8">
              Our artisans combine automotive passion with resin artistry. Each
              layer is poured by hand, each texture sculpted with precision, each
              surface polished to a mirror finish that captures light like liquid
              gold.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {craftsmanshipFeatures.slice(0, 4).map((feature) => {
                const Icon = iconMap[feature.icon] || Gem;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-3 p-4 rounded-[20px] border border-border"
                  >
                    <Icon size={18} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {feature.title}
                      </p>
                      <p className="text-xs text-grey mt-1">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>

        {/* Alternating layout - reversed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn direction="left" delay={0.2} className="lg:order-2">
            <ParallaxImage
              src={IMAGES.productTopdown}
              alt="ARK resin detail top view"
              className="rounded-[20px] aspect-[4/5]"
              speed={0.15}
            />
          </FadeIn>
          <FadeIn direction="right" className="lg:order-1">
            <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
              Limited Edition
            </p>
            <h3 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-6 leading-tight">
              Built to become heirlooms
            </h3>
            <p className="text-grey leading-relaxed mb-8">
              UV-resistant coatings, solid hardwood frames, and numbered editions
              ensure your ARK piece remains a centerpiece for generations. This is
              not decor — this is legacy.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {craftsmanshipFeatures.slice(4).map((feature) => {
                const Icon = iconMap[feature.icon] || Gem;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-3 p-4 rounded-[20px] border border-border"
                  >
                    <Icon size={18} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {feature.title}
                      </p>
                      <p className="text-xs text-grey mt-1">{feature.description}</p>
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
