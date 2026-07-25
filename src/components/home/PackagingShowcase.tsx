"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";
import { packagingItems } from "@/lib/data/content";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { resolveImageSrc } from "@/lib/images";
import { cn } from "@/lib/utils";

export function PackagingShowcase() {
  const { packaging } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const collage = packagingItems.map((item) => ({
    title: item.title,
    src: resolveImageSrc(packaging[item.imageKey]),
  }));

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  return (
    <FadeIn delay={0.1}>
      <div
        ref={containerRef}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-label="Premium packaging unboxing details"
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsOpen((open) => !open);
          }
        }}
        className={cn(
          "group relative aspect-[4/3] w-full rounded-[14px] overflow-hidden border border-border shadow-luxury outline-none cursor-pointer",
          isOpen && "is-open"
        )}
      >
        <div className="absolute inset-0 grid grid-cols-2 gap-1">
          {collage.map((item, index) => (
            <div key={item.title} className="relative min-h-0 overflow-hidden bg-card">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover object-center transition-transform duration-[1.1s] ease-out group-hover:scale-110 group-[.is-open]:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />

        {/* Idle label */}
        <div className="absolute bottom-4 left-4 right-4 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-2 group-[.is-open]:opacity-0 group-[.is-open]:translate-y-2 pointer-events-none">
          <p className="font-button text-[9px] uppercase tracking-[0.28em] text-gold mb-1">
            Unboxing
          </p>
          <h2 className="font-heading text-xl sm:text-2xl font-light text-foreground">
            Premium Packaging
          </h2>
          <p className="mt-1 font-button text-[8px] uppercase tracking-[0.18em] text-foreground/45 sm:hidden">
            Tap to reveal
          </p>
        </div>

        {/* Hover / tap reveal */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-[.is-open]:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-background/55 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,164,91,0.12),transparent_55%)]" />

          <div className="relative h-full flex flex-col items-center justify-center text-center px-5 sm:px-8">
            <p className="font-button text-[9px] uppercase tracking-[0.35em] text-gold mb-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-[.is-open]:translate-y-0 group-[.is-open]:opacity-100 transition-all duration-500 delay-75">
              Unboxing
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-foreground mb-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-[.is-open]:translate-y-0 group-[.is-open]:opacity-100 transition-all duration-500 delay-100">
              Premium Packaging
            </h2>
            <div className="h-px w-10 bg-gold/50 mb-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-[.is-open]:translate-y-0 group-[.is-open]:opacity-100 transition-all duration-500 delay-150" />
            <p className="text-xs sm:text-sm text-foreground/70 font-light mb-5 max-w-xs translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-[.is-open]:translate-y-0 group-[.is-open]:opacity-100 transition-all duration-500 delay-200">
              The ritual before the wall.
            </p>

            <div className="grid grid-cols-2 gap-2 w-full max-w-xs mb-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-[.is-open]:translate-y-0 group-[.is-open]:opacity-100 transition-all duration-500 delay-300">
              {packagingItems.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[10px] border border-gold/20 bg-background/40 px-3 py-2.5 backdrop-blur-sm text-left"
                >
                  <p className="font-heading text-sm text-gold/90 mb-0.5">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-[11px] text-foreground/85 font-light leading-snug">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-button text-[9px] uppercase tracking-[0.22em] text-gold/80 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-[.is-open]:translate-y-0 group-[.is-open]:opacity-100 transition-all duration-500 delay-[350ms]">
              Ready for the wall
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
