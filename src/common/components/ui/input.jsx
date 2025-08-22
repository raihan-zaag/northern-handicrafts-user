import * as React from "react"
import { cn } from "@/common/lib/utils"

function Input({ className, type = "text", ref, ...props }) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        // Layout & sizing
        "w-full h-12 rounded-xl px-3 py-2 text-sm",

        // Borders & background (from your tokens)
        "border border-[var(--color-border)] bg-[var(--color-background)]",

        // Text
        "text-[var(--color-text-primary)] placeholder-[var(--color-text-subtle)]",

        // Focus state
        "focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]",

        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-60",

        // Smooth transitions
        "transition-colors duration-200",

        className
      )}
      {...props}
    />
  )
}

export { Input }
