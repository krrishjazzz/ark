import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { timeline, craftsmanshipFeatures } from "@/lib/data/content";
import { IMAGES, BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `The story of ${BRAND.fullName} — handcrafted resin art born from automotive passion.`,
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[500px] mb-20">
        <Image
          src={IMAGES.brandBoard1}
          alt="ARK brand story"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/30" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="mx-auto max-w-7xl">
            <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
              Est. 2019
            </p>
            <h1 className="font-heading text-5xl md:text-7xl font-light text-foreground max-w-3xl">
              Driven Art.
              <br />
              <span className="text-gold-gradient">Frozen Motion.</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <FadeIn>
            <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
              Mission
            </p>
            <h2 className="font-heading text-3xl font-light text-foreground mb-6">
              To immortalize the machines that move us
            </h2>
            <p className="text-grey leading-relaxed">
              ARK exists at the intersection of automotive passion and resin
              artistry. We transform legendary machines into permanent
              masterpieces — each piece a conversation between engineering and
              emotion.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
              Vision
            </p>
            <h2 className="font-heading text-3xl font-light text-foreground mb-6">
              The world&apos;s most coveted resin art brand
            </h2>
            <p className="text-grey leading-relaxed">
              We envision a world where every collector, enthusiast, and luxury
              homeowner can own a piece of frozen motion — art that transcends
              decoration and becomes legacy.
            </p>
          </FadeIn>
        </div>

        {/* Craftsmanship */}
        <SectionHeading
          label="Process"
          title="Our Craftsmanship"
          description="40+ hours of meticulous handcrafting goes into every single piece."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {craftsmanshipFeatures.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.1}>
              <div className="p-8 rounded-[20px] border border-border">
                <h3 className="font-heading text-xl text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-grey">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Timeline */}
        <SectionHeading label="Journey" title="Our Timeline" />
        <div className="max-w-2xl mx-auto">
          {timeline.map((item, i) => (
            <FadeIn key={item.year} delay={i * 0.08}>
              <div className="flex gap-8 mb-8 pb-8 border-b border-border last:border-0">
                <p className="font-button text-[10px] uppercase tracking-[0.2em] text-gold w-16 shrink-0 pt-1">
                  {item.year}
                </p>
                <div>
                  <h4 className="font-heading text-lg text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-sm text-grey mt-1">{item.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
