"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16 md:mb-24",
        align === "center" && "text-center mx-auto max-w-3xl",
        align === "left" && "text-left max-w-2xl",
        className
      )}
    >
      {label && (
        <FadeIn>
          <p className="font-button text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
            {label}
          </p>
        </FadeIn>
      )}
      <TextReveal
        text={title}
        as="h2"
        className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1]"
      />
      {description && (
        <FadeIn delay={0.3}>
          <p className="mt-6 text-grey text-base md:text-lg leading-relaxed font-light">
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
