"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { timeline } from "@/lib/data/content";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { resolveImageSrc } from "@/lib/images";

export function OurStory() {
  const { brandBoardSecondary } = useSiteSettings();

  return (
    <section className="py-12 md:py-16 px-6 lg:px-8" aria-label="Our Story">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <Link
            href="/about"
            className="group relative block aspect-[3/4] w-full rounded-[14px] overflow-hidden border border-border shadow-luxury"
          >
            <Image
              src={resolveImageSrc(brandBoardSecondary)}
              alt="ARK founder studio"
              fill
              className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 768px"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

            {/* Idle */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-2">
              <p className="font-button text-[9px] uppercase tracking-[0.28em] text-gold mb-2">
                Heritage
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-light text-foreground mb-3">
                Our Story
              </h2>
              <p className="font-heading text-base sm:text-lg italic text-gold-light max-w-sm">
                &ldquo;We don&apos;t make art. We freeze emotion.&rdquo;
              </p>
            </div>

            {/* Hover — timeline on image */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,164,91,0.1),transparent_55%)]" />

              <div className="relative h-full flex flex-col justify-end p-5 sm:p-8">
                <p className="font-button text-[9px] uppercase tracking-[0.35em] text-gold mb-1.5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                  Heritage
                </p>
                <h2 className="font-heading text-3xl sm:text-4xl font-light text-foreground mb-1 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  Our Story
                </h2>
                <div className="h-px w-10 bg-gold/50 mb-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150" />

                <div className="relative pl-4 mb-5 max-h-[45%] overflow-hidden translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                  <div className="absolute left-[3px] top-1 bottom-1 w-px bg-gold/30" />
                  <ul className="space-y-2.5">
                    {timeline.map((item) => (
                      <li key={item.year} className="relative flex items-baseline gap-3">
                        <span className="absolute -left-4 top-1.5 h-1.5 w-1.5 rounded-full bg-gold" />
                        <span className="font-button text-[8px] uppercase tracking-[0.18em] text-gold shrink-0 w-9">
                          {item.year}
                        </span>
                        <span className="text-xs sm:text-sm text-foreground/90 font-light">
                          {item.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <span className="font-button text-[9px] uppercase tracking-[0.22em] text-gold inline-flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                  Read the full story
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </div>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
