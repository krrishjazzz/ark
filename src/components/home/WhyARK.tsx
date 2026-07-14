"use client";

import {
  Gem,
  Hand,
  FileCheck,
  Award,
  Package,
  Infinity,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { staggerContainer, staggerItem } from "@/components/animations/FadeIn";
import { whyARK } from "@/lib/data/content";

const iconMap: Record<string, LucideIcon> = {
  Gem,
  Hand,
  FileCheck,
  Award,
  Package,
  Infinity,
};

export function WhyARK() {
  return (
    <section className="section-padding px-6 lg:px-8" aria-label="Why ARK">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="The ARK Difference"
          title="Why ARK"
          description="We don't create wall art. We create legacy pieces for those who demand the extraordinary."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {whyARK.map((item) => {
            const Icon = iconMap[item.icon] || Gem;
            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="group p-8 md:p-10 rounded-[20px] border border-border glass gold-glow-hover shadow-lift"
              >
                <div className="h-12 w-12 flex items-center justify-center rounded-full border border-gold/20 text-gold mb-6 group-hover:border-gold/50 transition-colors duration-500">
                  <Icon size={20} />
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-light text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-grey leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
