"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-20 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold/80 via-gold-light to-gold/80"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
