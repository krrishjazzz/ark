"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { staggerContainer, staggerItem } from "@/components/animations/FadeIn";
import type { Testimonial } from "@/types";
import { resolveImageSrc } from "@/lib/images";

interface TestimonialsProps {
  items: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4, type: "spring" }}
        >
          <Star
            size={14}
            className={i < rating ? "fill-gold text-gold" : "text-border"}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function Testimonials({ items }: TestimonialsProps) {
  return (
    <section className="section-padding px-6 lg:px-8" aria-label="Testimonials">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Collectors"
          title="What They Say"
          description="Trusted by enthusiasts, designers, and collectors worldwide."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {items.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={staggerItem}
              className="p-8 md:p-10 rounded-[20px] border border-border glass gold-glow-hover"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="relative h-14 w-14 rounded-full overflow-hidden border border-border shrink-0">
                  <Image
                    src={resolveImageSrc(testimonial.image)}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="font-heading text-lg text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-grey">{testimonial.location}</p>
                  <StarRating rating={testimonial.rating} />
                </div>
              </div>

              <blockquote className="text-foreground/80 leading-relaxed font-light italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <p className="mt-6 font-button text-[9px] uppercase tracking-[0.15em] text-gold">
                {testimonial.product}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
