import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check, Loader2 } from "lucide-react"
import { cn } from "@/common/lib/utils"

const Checkbox = ({
  className,
  loading = false,
  ...props
}) => {
  return (
    <CheckboxPrimitive.Root
      disabled={loading || props.disabled}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary cursor-pointer " +
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 " +
          "focus-visible:ring-ring focus-visible:ring-offset-2 " +
          "disabled:cursor-not-allowed disabled:opacity-50 " +
          "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        loading && "opacity-70 cursor-wait",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="flex items-center justify-center text-white"
      >
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Check className="h-4 w-4" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
