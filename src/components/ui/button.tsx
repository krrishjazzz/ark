import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-button text-xs font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-background border border-gold/40 text-gold hover:border-gold hover:shadow-[0_0_30px_rgba(201,164,91,0.2)] hover:scale-[1.03] rounded-[20px] px-8 py-4",
        gold: "bg-gold text-background hover:bg-gold-light hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(201,164,91,0.3)] rounded-[20px] px-8 py-4",
        ghost:
          "text-foreground/70 hover:text-gold border border-transparent hover:border-border rounded-[20px] px-6 py-3",
        outline:
          "border border-border text-foreground hover:border-gold/40 hover:text-gold rounded-[20px] px-8 py-4",
        link: "text-gold underline-offset-4 hover:underline p-0",
      },
      size: {
        default: "h-12 px-8 py-4",
        sm: "h-10 px-6 text-[10px]",
        lg: "h-14 px-10 text-sm",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
