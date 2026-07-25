"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomOrderCardProps {
  className?: string;
}

export function CustomOrderCard({ className }: CustomOrderCardProps) {
  return (
    <Link
      href="/custom-orders"
      className={cn(
        "group relative block h-full rounded-[20px] border border-dashed border-gold/35 bg-card/40 gold-glow-hover shadow-lift overflow-hidden",
        className
      )}
    >
      <div className="relative aspect-[4/5] sm:aspect-[3/4] flex items-center justify-center p-6 sm:p-8">
        {/* Empty frame */}
        <div className="relative w-[72%] h-[78%] border border-gold/40 shadow-[inset_0_0_40px_rgba(201,164,91,0.06)]">
          <div className="absolute inset-2 border border-gold/15" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
            <p className="font-button text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-gold/70 mb-2">
              Your Piece
            </p>
            <p className="font-heading text-lg sm:text-2xl font-light text-foreground/40 leading-snug">
              Empty Frame
            </p>
            <p className="mt-3 text-[10px] sm:text-xs text-grey max-w-[10rem] leading-snug">
              Any car. Any vision. Made for you.
            </p>
          </div>
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="h-10 w-10 flex items-center justify-center rounded-full border border-gold/30 bg-background/80 text-gold">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-6 bg-card gold-line">
        <p className="font-button text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-gold mb-1 sm:mb-2">
          Bespoke
        </p>
        <h3 className="font-heading text-sm sm:text-xl font-light text-foreground group-hover:text-gold transition-colors duration-500 leading-snug">
          Custom Order
        </h3>
        <p className="text-xs text-grey mt-1 hidden sm:block">
          Bespoke · 40+ hrs · WhatsApp brief
        </p>
        <p className="font-button text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-gold/70 mt-2 sm:mt-3">
          Start yours →
        </p>
      </div>
    </Link>
  );
}
