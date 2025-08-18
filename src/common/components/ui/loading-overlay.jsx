"use client"; // needed in Next.js App Router

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";

const LoadingOverlay = ({
  isLoading = false,
  children,
  spinnerSize = "xl",
  spinnerClassName = "text-primary",
  overlayClassName = "bg-black/20",
  zIndex = "z-50",
  fullscreen = true,       // global overlay vs scoped
  fadeDelay = 200,         // ms anti-flicker delay
  usePortal = true,        // render fullscreen in <body>
  unmountOnExit = true,    // completely remove when hidden
}) => {
  const [visible, setVisible] = useState(isLoading);
  const [mounted, setMounted] = useState(false);

  // for Next.js (prevent SSR mismatch for portal)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), fadeDelay);
      return () => clearTimeout(timer);
    }
  }, [isLoading, fadeDelay]);

  // nothing to show
  if ((!visible && unmountOnExit) && !children) return null;

  const overlayElement = (
    <div
      role="status"
      aria-busy={isLoading}
      aria-live="polite"
      className={cn(
        fullscreen ? "fixed inset-0" : "absolute inset-0",
        "flex items-center justify-center transition-opacity duration-300",
        isLoading ? "opacity-100" : "opacity-0",
        overlayClassName,
        zIndex
      )}
    >
      <Spinner size={spinnerSize} className={spinnerClassName} />
    </div>
  );

  return (
    <div className={cn(!fullscreen && "relative", "w-full h-full")}>
      {children}
      {visible &&
        (fullscreen && usePortal && mounted
          ? createPortal(overlayElement, document.body)
          : overlayElement)}
    </div>
  );
};

// 🔥 Shortcut for direct fullscreen usage
LoadingOverlay.Fullscreen = (props) => (
  <LoadingOverlay {...props} fullscreen isLoading />
);

export { LoadingOverlay };
