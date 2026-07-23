"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { packagingItems } from "@/lib/data/content";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { resolveImageSrc } from "@/lib/images";

export function PackagingShowcase() {
  const { packaging } = useSiteSettings();

  return (
    <section className="section-padding px-6 lg:px-8 bg-card/30" aria-label="Packaging">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Unboxing"
          title="Premium Packaging"
          description="The ritual begins before the artwork reaches your wall. Scroll through the ARK unboxing experience."
        />

        <div className="relative mt-12 md:mt-16">
          <div
            className="absolute left-[19px] sm:left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden sm:block"
            aria-hidden
          />

          <div className="space-y-10 sm:space-y-16">
            {packagingItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr] gap-4 sm:gap-8 items-center"
              >
                <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full border border-gold/30 bg-background shrink-0 relative z-10">
                  <span className="font-heading text-lg text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative aspect-[16/10] sm:aspect-[4/3] md:aspect-[3/2] max-h-[220px] sm:max-h-[320px] md:max-h-none rounded-[20px] overflow-hidden border border-border image-zoom-container shadow-luxury spotlight-card">
                  <Image
                    src={resolveImageSrc(packaging[item.imageKey])}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent md:hidden" />
                  <span className="md:hidden absolute top-3 left-3 font-heading text-2xl text-gold/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="md:pl-4">
                  <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
                    Step {index + 1}
                  </p>
                  <h3 className="font-heading text-2xl sm:text-3xl font-light text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-grey leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-heading text-xl sm:text-2xl font-light text-center text-gold-gradient mt-16 sm:mt-20"
        >
          Your piece arrives ready for the wall.
        </motion.p>
      </div>
    </section>
  );
}
