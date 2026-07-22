"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { InstagramIcon } from "@/components/icons/SocialIcons";
import { SectionHeading } from "@/components/animations/SectionHeading";
import { instagramPosts } from "@/lib/data/content";
import { BRAND } from "@/lib/constants";

export function InstagramFeed() {
  return (
    <section className="section-padding px-6 lg:px-8 bg-card/30" aria-label="Instagram Feed">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Social"
          title="Follow the Craft"
          description={`Join our community on Instagram @${BRAND.instagramHandle}`}
        />

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="block break-inside-avoid group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
            >
              <div className="relative rounded-[20px] overflow-hidden border border-border gold-glow-hover image-zoom-container">
                <Image
                  src={post.image}
                  alt={post.caption}
                  width={400}
                  height={index % 3 === 0 ? 500 : 400}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3">
                  <InstagramIcon size={24} className="text-gold" />
                  <div className="flex items-center gap-2 text-foreground text-sm">
                    <Heart size={14} className="fill-gold text-gold" />
                    {post.likes.toLocaleString()}
                  </div>
                  <p className="text-xs text-grey px-4 text-center">{post.caption}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
