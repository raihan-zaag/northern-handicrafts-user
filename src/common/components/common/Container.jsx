import { cn } from "@/common/lib/utils";
import React from "react";

const Container = ({ children, className }) => {
    return (
        <div className={cn("container mx-auto  h-full", className)}>
            {children}
        </div>
    );
};

export default Container;
