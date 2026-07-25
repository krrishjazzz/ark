"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Testimonial } from "@/types";
import { resolveImageSrc } from "@/lib/images";

interface TestimonialsProps {
  items: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? "fill-gold text-gold" : "text-border"}
        />
      ))}
    </div>
  );
}

export function Testimonials({ items }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const count = items.length;
  const current = items[index];

  const goTo = (next: number, dir: number) => {
    setDirection(dir);
    setIndex((next + count) % count);
  };

  useEffect(() => {
    if (count <= 1) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % count);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [count]);

  if (!current) return null;

  return (
    <section className="py-12 md:py-16 px-6 lg:px-8" aria-label="Testimonials">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-button text-[9px] uppercase tracking-[0.28em] text-gold mb-2">
          Collectors
        </p>
        <h2 className="font-heading text-2xl sm:text-3xl font-light text-foreground mb-8">
          What They Say
        </h2>

        <div className="relative overflow-hidden rounded-[14px] border border-border glass px-6 py-8 sm:px-10 sm:py-10 min-h-[260px] sm:min-h-[240px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col items-center gap-3 mb-5">
                <div className="relative h-12 w-12 rounded-full overflow-hidden border border-border">
                  <Image
                    src={resolveImageSrc(current.image)}
                    alt={current.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-heading text-base text-foreground">
                    {current.name}
                  </p>
                  <p className="text-[11px] text-grey">{current.location}</p>
                  <div className="flex justify-center mt-1.5">
                    <StarRating rating={current.rating} />
                  </div>
                </div>
              </div>

              <blockquote className="text-sm sm:text-base text-foreground/80 leading-relaxed font-light italic">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <p className="mt-4 font-button text-[9px] uppercase tracking-[0.15em] text-gold">
                {current.product}
              </p>
            </motion.div>
          </AnimatePresence>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(index - 1, -1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-border/80 text-grey hover:text-gold hover:border-gold/40 transition-colors flex items-center justify-center"
                aria-label="Previous review"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1, 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-border/80 text-grey hover:text-gold hover:border-gold/40 transition-colors flex items-center justify-center"
                aria-label="Next review"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div className="flex justify-center gap-1.5 mt-5">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(i, i > index ? 1 : -1)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-5 bg-gold" : "w-1.5 bg-border hover:bg-grey"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
