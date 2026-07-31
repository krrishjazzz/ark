import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { WhyARK } from "@/components/home/WhyARK";
import { OurStory } from "@/components/home/OurStory";
import { BRAND } from "@/lib/constants";
import { fetchSiteSettings } from "@/lib/cms";
import { resolveImageSrc } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description: `The story of ${BRAND.fullName} — handcrafted resin art born from automotive passion.`,
};

export default async function AboutPage() {
  const { brandBoardPrimary } = await fetchSiteSettings();

  return (
    <div className="pt-32 pb-20">
      <div className="relative h-[60vh] min-h-[500px] mb-20">
        <Image
          src={resolveImageSrc(brandBoardPrimary)}
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

        <FadeIn>
          <div className="flex flex-wrap gap-4 mb-8">
            <Link
              href="/craftsmanship"
              className="font-button text-[10px] uppercase tracking-[0.2em] text-gold border border-gold/30 rounded-full px-5 py-2.5 hover:bg-gold/10 transition-colors"
            >
              Explore Craftsmanship →
            </Link>
            <Link
              href="/unboxing"
              className="font-button text-[10px] uppercase tracking-[0.2em] text-grey border border-border rounded-full px-5 py-2.5 hover:border-gold/30 hover:text-gold transition-colors"
            >
              Unboxing Experience →
            </Link>
          </div>
        </FadeIn>
      </div>

      <WhyARK />
      <OurStory />
    </div>
  );
}
