import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductPriceProps {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: {
    price: "text-sm",
    compare: "text-xs",
  },
  md: {
    price: "text-base font-light",
    compare: "text-sm",
  },
  lg: {
    price: "font-heading text-3xl",
    compare: "text-lg",
  },
};

export function ProductPrice({
  price,
  compareAtPrice,
  size = "md",
  className,
}: ProductPriceProps) {
  const styles = sizeStyles[size];
  const showCompare = compareAtPrice != null && compareAtPrice > price;

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span className={cn("text-gold", styles.price)}>{formatPrice(price)}</span>
      {showCompare && (
        <span className={cn("text-grey line-through", styles.compare)}>
          {formatPrice(compareAtPrice)}
        </span>
      )}
    </div>
  );
}
