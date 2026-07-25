"use client";

import { motion } from "framer-motion";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/SocialIcons";
import { BRAND } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  const whatsappHref = buildWhatsAppUrl(
    "Hi ARK! I'd love to know more about your resin art pieces."
  );

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3 md:bottom-8 md:right-8"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.a
        href={BRAND.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white shadow-[0_8px_28px_rgba(221,42,123,0.35)] transition-transform duration-300"
        whileHover={{ scale: 1.08 }}
        aria-label="Follow on Instagram"
      >
        <InstagramIcon size={22} className="text-white" />
      </motion.a>

      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_32px_rgba(37,211,102,0.35)] transition-transform duration-300"
        whileHover={{ scale: 1.08 }}
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon size={28} />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
        </span>
      </motion.a>
    </motion.div>
  );
}
