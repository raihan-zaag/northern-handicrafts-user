"use client"
import { cn } from "@/common/lib/utils"

const Textarea = ({ className, resize = "vertical", ...props }) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-[var(--color-border)] " +
          "bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-primary)] " +
          "placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] " +
          "focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        resize === "none" && "resize-none",
        resize === "horizontal" && "resize-x",
        resize === "vertical" && "resize-y",
        resize === "both" && "resize",
        className
      )}
      {...props}
    />
  )
}

Textarea.displayName = "Textarea"

export { Textarea }
