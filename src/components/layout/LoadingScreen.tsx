"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { resolveImageSrc } from "@/lib/images";

export function LoadingScreen() {
  const { logo } = useSiteSettings();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <Image
            src={resolveImageSrc(logo)}
            alt="ARK"
            width={120}
            height={120}
            className="object-contain"
            priority
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        <motion.p
          className="mt-8 font-button text-[10px] uppercase tracking-[0.4em] shimmer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Aesthetic Resin Kreations
        </motion.p>

        <motion.div
          className="mt-8 h-[1px] w-32 bg-border overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full bg-gold"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
