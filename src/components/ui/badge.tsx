import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-button uppercase tracking-widest",
        variant === "default" && "bg-card border border-border text-grey",
        variant === "gold" && "bg-gold/10 border border-gold/30 text-gold",
        variant === "outline" && "border border-border text-foreground/60",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
