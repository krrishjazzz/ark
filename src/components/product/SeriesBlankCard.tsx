import { cn } from "@/lib/utils";

interface SeriesBlankCardProps {
  label?: string;
  className?: string;
}

/** Empty slot — same footprint as ProductCard, labeled Coming soon */
export function SeriesBlankCard({
  label = "Coming soon",
  className,
}: SeriesBlankCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-[20px] border border-dashed border-border/80 bg-card/40 overflow-hidden",
        className
      )}
      aria-label={label}
    >
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full shrink-0 flex flex-col items-center justify-center px-4 text-center bg-[#141414]">
        <div className="h-px w-10 bg-gold/25 mb-4" />
        <p className="font-button text-[9px] uppercase tracking-[0.22em] text-gold/70">
          {label}
        </p>
        <p className="font-heading text-lg text-foreground/25 mt-2 font-light">
          —
        </p>
      </div>
      <div className="flex flex-1 flex-col p-2.5 sm:p-6 min-h-0 sm:min-h-[11rem] justify-center">
        <p className="font-button text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-grey/50 mb-2">
          Reserved
        </p>
        <p className="font-heading text-[13px] sm:text-xl font-light text-foreground/30">
          Coming Soon
        </p>
      </div>
    </div>
  );
}
