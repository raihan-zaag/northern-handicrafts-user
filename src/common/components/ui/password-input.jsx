import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { cn } from "@/common/lib/utils"

const PasswordInput = ({ className, ref, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="relative">
      <input
        ref={ref}
        type={showPassword ? "text" : "password"}
        className={cn(
          // Layout
          "w-full h-12 rounded-xl px-3 pr-10 text-sm",

          // Background & border
          "border border-[var(--color-border)] bg-[var(--color-background)]",

          // Text & placeholder
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

      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        tabIndex={-1}
        className={cn(
          "absolute right-3 top-1/2 -translate-y-1/2",
          "text-[var(--color-text-subtle)] hover:text-[var(--color-text-primary)] transition-colors"
        )}
      >
        {showPassword ? (
          <EyeOffIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  )
}

export { PasswordInput }
