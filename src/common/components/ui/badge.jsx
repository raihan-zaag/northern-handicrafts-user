import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/common/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/80",
        secondary:
          "border-transparent bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
        destructive:
          "border-transparent bg-[var(--color-destructive)] text-white hover:bg-[var(--color-destructive)]/80",
        outline: "text-[var(--color-text-primary)] border border-[var(--color-border)]",
        success:
          "border-transparent bg-[var(--color-success)] text-white hover:bg-[var(--color-success)]/80",
        warning:
          "border-transparent bg-orange-500 text-white hover:bg-orange-500/80",
        info:
          "border-transparent bg-blue-500 text-white hover:bg-blue-500/80",
        muted:
          "border-transparent bg-[var(--color-surface)] text-[var(--color-text-subtle)]",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-1.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Badge = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export { Badge, badgeVariants };
