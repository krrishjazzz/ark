"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { packagingItems } from "@/lib/data/content";

export function PackagingShowcase() {
  return (
    <section className="section-padding px-6 lg:px-8 bg-card/30" aria-label="Packaging">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Unboxing"
          title="Premium Packaging"
          description="The experience begins before you reach the artwork. Every ARK piece arrives in museum-quality presentation."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Large hero packaging image */}
          <FadeIn direction="left">
            <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden border border-border image-zoom-container shadow-luxury">
              <Image
                src={packagingItems[0].image}
                alt="ARK premium packaging"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>

          {/* Packaging items grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {packagingItems.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1} direction="right">
                <motion.div
                  className="group rounded-[20px] border border-border overflow-hidden gold-glow-hover shadow-lift"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative aspect-square image-zoom-container">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-light text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-xs text-grey mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
