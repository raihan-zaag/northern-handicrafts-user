import { cn } from "@/common/lib/utils";

const Spinner = ({ size = "md", className, ...props }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-primary border-t-transparent",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
};

export { Spinner };
