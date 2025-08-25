import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/common/lib/utils";

// Root <nav/>
export function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

// <ul/>
export function PaginationContent({ className, ...props }) {
  return <ul className={cn("flex items-center gap-1", className)} {...props} />;
}

// <li/>
export function PaginationItem({ className, ...props }) {
  return <li className={cn("", className)} {...props} />;
}

// Next.js <Link/> version of PaginationLink
export function PaginationLink({
  className,
  isActive,
  size = "default",
  ...props
}) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[var(--color-border)] bg-[var(--color-background)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]",
        size === "default" && "h-9 px-3 py-2",
        size === "icon" && "h-9 w-9",
        isActive && "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90",
        className
      )}
      {...props}
    />
  );
}

// Button version of PaginationLink (for non-link pagination)
export function PaginationButton({
  className,
  isActive,
  size = "default",
  ...props
}) {
  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[var(--color-border)] bg-[var(--color-background)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]",
        size === "default" && "h-9 px-3 py-2",
        size === "icon" && "h-9 w-9",
        isActive && "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90",
        className
      )}
      {...props}
    />
  );
}

export function PaginationPrevious({ className, ...props }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 pl-2.5", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  );
}

export function PaginationNext({ className, ...props }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 pr-2.5", className)}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
}

// Button versions for non-link pagination
export function PaginationPreviousButton({ className, onClick, disabled, ...props }) {
  return (
    <PaginationButton
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 pl-2.5", className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Prev</span>
    </PaginationButton>
  );
}

export function PaginationNextButton({ className, onClick, disabled, ...props }) {
  return (
    <PaginationButton
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 pr-2.5", className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationButton>
  );
}

export function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
