"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";
import { packagingItems } from "@/lib/data/content";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { resolveImageSrc } from "@/lib/images";

export function PackagingShowcase() {
  const { packaging } = useSiteSettings();

  const collage = packagingItems.map((item) => ({
    title: item.title,
    src: resolveImageSrc(packaging[item.imageKey]),
  }));

  return (
    <FadeIn delay={0.1}>
      <div
        tabIndex={0}
        className="group relative aspect-[4/3] w-full rounded-[14px] overflow-hidden border border-border shadow-luxury outline-none"
      >
        <div className="absolute inset-0 grid grid-cols-2 gap-1">
          {collage.map((item, index) => (
            <div key={item.title} className="relative min-h-0 overflow-hidden bg-card">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 sm:p-6 pointer-events-none">
          <p className="font-button text-[9px] uppercase tracking-[0.28em] text-gold mb-1.5">
            Unboxing
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl font-light text-foreground mb-2 leading-tight">
            Premium Packaging
          </h2>
          <p className="text-xs sm:text-sm text-grey leading-snug mb-3">
            Arrives ready for the wall.
          </p>
          <ul className="space-y-1.5">
            {packagingItems.map((item, index) => (
              <li key={item.title} className="flex items-center gap-2.5">
                <span className="font-heading text-xs text-gold/80 w-5 shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-foreground/95 font-light">
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeIn>
  );
}
