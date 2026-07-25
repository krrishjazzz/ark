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
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
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

export function Craftsmanship() {
  const { craftsmanshipPrimary } = useSiteSettings();

  return (
    <FadeIn>
      <Link
        href="/craftsmanship"
        className="group relative block aspect-[4/3] w-full rounded-[14px] overflow-hidden border border-border shadow-luxury"
      >
        <Image
          src={resolveImageSrc(craftsmanshipPrimary)}
          alt="ARK craftsmanship"
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 sm:p-6">
          <p className="font-button text-[9px] uppercase tracking-[0.28em] text-gold mb-1.5">
            The Process
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl font-light text-foreground mb-2 leading-tight">
            Craftsmanship
          </h2>
          <p className="text-xs sm:text-sm text-grey leading-snug mb-3">
            40+ hours. Hand-poured. Museum finish.
          </p>
          <ul className="space-y-1.5 mb-3">
            {craftsmanshipFeatures.slice(0, 4).map((feature) => {
              const Icon = iconMap[feature.icon] || Gem;
              return (
                <li key={feature.title} className="flex items-center gap-2">
                  <Icon size={12} className="text-gold shrink-0" />
                  <span className="text-sm text-foreground/95 font-light">
                    {feature.title}
                  </span>
                </li>
              );
            })}
          </ul>
          <span className="font-button text-[9px] uppercase tracking-[0.2em] text-gold">
            See the process →
          </span>
        </div>
      </Link>
    </FadeIn>
  );
}
