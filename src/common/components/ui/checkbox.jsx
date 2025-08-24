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
        "peer size-4 shrink-0 rounded border-2 border-slate-500 cursor-pointer " +
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 " +
        "focus-visible:ring-ring focus-visible:ring-offset-2 " +
        "disabled:cursor-not-allowed disabled:opacity-50 " +
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-blue-200",
        loading && "opacity-70 cursor-wait",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="flex items-center justify-center text-white"
      >
        {loading ? (
          <Loader2 className="size-2 animate-spin" />
        ) : (
          <Check className="size-3" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
