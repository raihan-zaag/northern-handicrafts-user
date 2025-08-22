"use client"
import { cn } from "@/common/lib/utils"
import * as SliderPrimitive from "@radix-ui/react-slider"

const Slider = ({ className, ...props }) => (
  <SliderPrimitive.Root
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    {/* Track */}
    <SliderPrimitive.Track
      className="relative h-2 w-full grow overflow-hidden rounded-full bg-[var(--color-secondary)]"
    >
      <SliderPrimitive.Range className="absolute h-full bg-[var(--color-primary)]" />
    </SliderPrimitive.Track>

    {/* Thumb */}
    <SliderPrimitive.Thumb
      className={cn(
        "block h-5 w-5 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-background)] " +
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] " +
          "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[var(--color-primary)]"
      )}
    />
  </SliderPrimitive.Root>
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
