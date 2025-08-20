import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/common/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "bg-transparent cursor-pointer",
        text: "bg-transparent cursor-pointer",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  icon,
  iconPosition = "left",
  children,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : "button"

  const renderIcon = () => {
    if (!icon) return null

    return (
      <span className={cn(
        "inline-flex items-center justify-center",
        children && iconPosition === "left" && "mr-2",
        children && iconPosition === "right" && "ml-2"
      )}>
        {React.isValidElement(icon) ? icon : React.createElement(icon)}
      </span>
    )
  }

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {iconPosition === "left" && renderIcon()}
      {children}
      {iconPosition === "right" && renderIcon()}
    </Comp>
  )
}

export { Button, buttonVariants }
