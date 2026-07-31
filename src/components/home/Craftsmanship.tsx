"use client";

import {
  Droplets,
  Hand,
  Sun,
  Gem,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { resolveImageSrc } from "@/lib/images";

const iconMap: Record<string, LucideIcon> = {
  Droplets,
  Hand,
  Sun,
  Gem,
};

export function Craftsmanship() {
  const { craftsmanshipPrimary, craftsmanshipFeatures } = useSiteSettings();
  const features = craftsmanshipFeatures.slice(0, 4);

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
          className="object-cover object-center transition-transform duration-[1.1s] ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Always-on soft base so the card never feels empty */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />

        {/* Idle label */}
        <div className="absolute bottom-4 left-4 right-4 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-2">
          <p className="font-button text-[9px] uppercase tracking-[0.28em] text-gold mb-1">
            The Process
          </p>
          <h2 className="font-heading text-xl sm:text-2xl font-light text-foreground">
            Craftsmanship
          </h2>
        </div>

        {/* Hover reveal */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-background/55 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,164,91,0.12),transparent_55%)]" />

          <div className="relative h-full flex flex-col items-center justify-center text-center px-5 sm:px-8">
            <p className="font-button text-[9px] uppercase tracking-[0.35em] text-gold mb-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
              The Process
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-foreground mb-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              Craftsmanship
            </h2>
            <div className="h-px w-10 bg-gold/50 mb-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150" />
            <p className="text-xs sm:text-sm text-foreground/70 font-light mb-5 max-w-xs translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
              Forty hours. One pour at a time.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-300">
              {features.map((feature) => {
                const Icon = iconMap[feature.icon] || Gem;
                return (
                  <span
                    key={feature.title}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-background/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-foreground/85 backdrop-blur-sm"
                  >
                    <Icon size={11} className="text-gold" />
                    {feature.title}
                  </span>
                );
              })}
            </div>

            <span className="font-button text-[9px] uppercase tracking-[0.22em] text-gold inline-flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-[350ms]">
              Enter the studio
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}
