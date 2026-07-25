"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { timeline } from "@/lib/data/content";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { resolveImageSrc } from "@/lib/images";

export function OurStory() {
  const { brandBoardSecondary } = useSiteSettings();
  const highlights = timeline.filter((_, i) => i === 0 || i === timeline.length - 1 || i === Math.floor(timeline.length / 2));

  return (
    <section className="py-12 md:py-16 px-6 lg:px-8" aria-label="Our Story">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-14 items-center">
          <FadeIn direction="left">
            <div className="relative aspect-[4/3] md:aspect-[5/4] max-h-[320px] md:max-h-[360px] w-full rounded-[14px] overflow-hidden border border-border shadow-luxury">
              <Image
                src={resolveImageSrc(brandBoardSecondary)}
                alt="ARK founder studio"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-heading text-base sm:text-lg italic text-gold-light">
                  &ldquo;We don&apos;t make art. We freeze emotion.&rdquo;
                </p>
                <p className="font-button text-[8px] uppercase tracking-[0.2em] text-grey mt-2">
                  — Founder, ARK
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <p className="font-button text-[9px] uppercase tracking-[0.28em] text-gold mb-2">
              Heritage
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-light text-foreground mb-2 leading-tight">
              Our Story
            </h2>
            <p className="text-xs sm:text-sm text-grey leading-snug mb-5 max-w-md">
              Born in 2019. Built for collectors who feel machines.
            </p>

            <ul className="space-y-2.5 mb-6">
              {highlights.map((item) => (
                <li key={item.year} className="flex items-baseline gap-3">
                  <span className="font-button text-[9px] uppercase tracking-[0.2em] text-gold shrink-0 w-10">
                    {item.year}
                  </span>
                  <span className="text-sm text-foreground/90 font-light">
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="font-button text-[9px] uppercase tracking-[0.2em] text-gold hover:text-gold-light transition-colors"
            >
              Read our story →
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
