"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { ensureProductImages, getProductPrimaryImage } from "@/lib/images";

interface ProductViewer360Props {
  images: string[];
  name: string;
}

export function ProductViewer360({ images, name }: ProductViewer360Props) {
  const viewerImages = ensureProductImages(images);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startRotation = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
    startRotation.current = rotation;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX.current;
    setRotation(startRotation.current + delta * 0.5);
  };

  const handlePointerUp = () => setIsDragging(false);

  const activeImageIndex = Math.abs(Math.round(rotation / 45)) % viewerImages.length;

  return (
    <div className="relative">
      <div
        className="relative aspect-square rounded-[20px] overflow-hidden border border-border cursor-grab active:cursor-grabbing select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ perspective: 1000 }}
      >
        <motion.div
          animate={{ rotateY: rotation }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src={viewerImages[activeImageIndex] ?? getProductPrimaryImage(viewerImages)}
            alt={`${name} 360 view`}
            fill
            className="object-cover"
            sizes="500px"
            draggable={false}
          />
        </motion.div>

        {/* Gloss overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-gold/5 pointer-events-none" />
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 text-grey">
        <RotateCcw size={14} />
        <span className="font-button text-[9px] uppercase tracking-[0.2em]">
          Drag to rotate
        </span>
      </div>
    </div>
  );
}
