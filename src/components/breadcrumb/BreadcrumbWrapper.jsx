"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/common/container";
import BreadcrumbComponent from "./index";
import { cn } from "@/utils";

const BreadcrumbWrapper = ({
    hideOnHome = true,
    className = "",
    showContainer = true
}) => {
    const paths = usePathname();

    if (hideOnHome && paths === "/") {
        return null;
    }

    if (!showContainer) {
        return <BreadcrumbComponent />;
    }

    return (
        <div className={cn("bg-white py-5", className)}>
            <Container className={className}>
                <BreadcrumbComponent />
            </Container>
        </div>
    );
};

export default BreadcrumbWrapper;
