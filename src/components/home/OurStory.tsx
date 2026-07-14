"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { timeline } from "@/lib/data/content";
import { IMAGES } from "@/lib/constants";

export function OurStory() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section className="section-padding px-6 lg:px-8" aria-label="Our Story">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Heritage"
          title="Our Story"
          description="Born from a garage, refined in the studio. ARK exists to freeze moments that move you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Founder image placeholder */}
          <FadeIn direction="left">
            <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden border border-border">
              <Image
                src={IMAGES.brandBoard2}
                alt="ARK founder studio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-heading text-2xl italic text-gold-light">
                  &ldquo;We don&apos;t make art. We freeze emotion.&rdquo;
                </p>
                <p className="font-button text-[10px] uppercase tracking-[0.2em] text-grey mt-4">
                  — Founder, ARK
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Story text + timeline */}
          <FadeIn direction="right" delay={0.2}>
            <p className="text-grey leading-relaxed text-base md:text-lg mb-6">
              ARK began in 2019 with a simple belief: the machines that move us
              deserve to be immortalized. What started as a passion project in a
              small studio has grown into a globally recognized brand, trusted by
              collectors, interior designers, and automotive enthusiasts across
              15 countries.
            </p>
            <p className="text-grey leading-relaxed text-base md:text-lg mb-12">
              Every piece we create is a collaboration between artisan and
              machine — where resin meets passion, and craftsmanship meets
              legacy.
            </p>

            {/* Timeline */}
            <div ref={timelineRef} className="relative pl-8">
              <div className="absolute left-[3px] top-0 bottom-0 w-[1px] bg-border" />
              <motion.div
                className="absolute left-[3px] top-0 w-[1px] bg-gold origin-top"
                style={{ height: lineHeight }}
              />

              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  className="relative mb-8 last:mb-0"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="absolute -left-8 top-1.5 h-[7px] w-[7px] rounded-full border border-gold bg-background" />
                  <p className="font-button text-[10px] uppercase tracking-[0.2em] text-gold">
                    {item.year}
                  </p>
                  <h4 className="font-heading text-lg text-foreground mt-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-grey mt-1">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
