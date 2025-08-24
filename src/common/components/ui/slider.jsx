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
      className="relative h-1 w-full grow overflow-hidden bg-secondary"
    >
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>

    {/* First Thumb */}
    <SliderPrimitive.Thumb
      className={cn(
        "block h-5 w-5 rounded-full border-2 border-primary bg-primary " +
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary " +
        "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary"
      )}
    />

    {/* Second Thumb */}
    <SliderPrimitive.Thumb
      className={cn(
        "block h-5 w-5 rounded-full border-2 border-primary bg-primary " +
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary " +
        "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary"
      )}
    />

  </SliderPrimitive.Root>
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
