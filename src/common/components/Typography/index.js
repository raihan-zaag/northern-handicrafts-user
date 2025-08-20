import { cn } from "@/common/lib/utils";
import React from "react";


const Typography = {
    Title1: ({ children, className = "" }) => (
        <h1 className={cn("text-2xl sm:text-3xl md:text-4xl font-extrabold text-black leading-tight", className)}>
            {children}
        </h1>
    ),

    Title2: ({ children, className = "" }) => (
        <h2 className={cn("text-xl sm:text-2xl md:text-3xl font-bold text-black leading-snug", className)}>
            {children}
        </h2>
    ),

    Title3: ({ children, className = "" }) => (
        <h3 className={cn("text-lg sm:text-xl md:text-xl2 font-semibold leading-normal", className)}>
            {children}
        </h3>
    ),

    Paragraph: ({ children, className = "" }) => (
        <p className={cn("text-sm sm:text-base md:text-lg font-normal text-gray-700 leading-relaxed", className)}>
            {children}
        </p>
    ),

    BodyText: ({ children, className = "" }) => (
        <p className={cn("text-xs sm:text-sm md:text-base font-normal text-primary leading-none", className)}>
            {children}
        </p>
    ),

    SmallText: ({ children, className = "" }) => (
        <p className={cn("text-xs font-normal text-gray-600 leading-tight", className)}>
            {children}
        </p>
    ),
};

export default Typography;