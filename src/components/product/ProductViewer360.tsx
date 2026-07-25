"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { ensureProductImages, getProductPrimaryImage } from "@/lib/images";
import { cn } from "@/lib/utils";

interface ProductViewer360Props {
  images: string[];
  name: string;
}

/**
 * True 360° frame viewer: drag swaps angle photos of the framed piece.
 * Does NOT CSS-rotate a flat image (that spins the whole photo oddly).
 *
 * Upload photos in order around the frame (e.g. every 15° = 24 frames).
 * Shoot the product on a turntable — only the frame turns between shots.
 */
export function ProductViewer360({ images, name }: ProductViewer360Props) {
  const frames = ensureProductImages(images);
  const frameCount = frames.length;
  const canSpin = frameCount > 1;

  const [frameIndex, setFrameIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startIndex = useRef(0);

  const pixelsPerFrame = 12;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canSpin) return;
    setIsDragging(true);
    startX.current = e.clientX;
    startIndex.current = frameIndex;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !canSpin) return;
    const delta = e.clientX - startX.current;
    const steps = Math.round(delta / pixelsPerFrame);
    const next = (((startIndex.current - steps) % frameCount) + frameCount) % frameCount;
    setFrameIndex(next);
  };

  const handlePointerUp = () => setIsDragging(false);

  const activeSrc = frames[frameIndex] ?? getProductPrimaryImage(frames);

  return (
    <div className="relative">
      <div
        className={cn(
          "relative aspect-square rounded-[20px] overflow-hidden border border-border bg-card select-none",
          canSpin ? "cursor-grab active:cursor-grabbing" : "cursor-default"
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Preload all angles so scrubbing stays smooth */}
        <div className="absolute inset-0 opacity-0 pointer-events-none" aria-hidden>
          {frames.map((src, i) => (
            <Image key={`${src}-${i}`} src={src} alt="" fill sizes="1px" />
          ))}
        </div>

        <Image
          src={activeSrc}
          alt={`${name} — frame angle ${frameIndex + 1} of ${frameCount}`}
          fill
          className="object-contain object-center p-4 sm:p-6"
          sizes="(max-width: 1024px) 100vw, 500px"
          draggable={false}
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-gold/5 pointer-events-none" />

        {canSpin && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-background/70 px-3 py-1 backdrop-blur-sm">
            <p className="font-button text-[8px] uppercase tracking-[0.2em] text-grey">
              {frameIndex + 1} / {frameCount}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 text-grey">
        <RotateCcw size={14} />
        <span className="font-button text-[9px] uppercase tracking-[0.2em]">
          {canSpin
            ? "Drag to rotate the frame"
            : "Add angle photos for 360° frame spin"}
        </span>
      </div>
    </div>
  );
}
