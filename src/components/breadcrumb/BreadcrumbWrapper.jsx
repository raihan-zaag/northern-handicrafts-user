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
        <div className={cn("bg-white mt-5 mb-2 sm:mb-6 md:mb-8 lg:mb-11", className)}>
            <Container className={className}>
                <BreadcrumbComponent />
            </Container>
        </div>
    );
};

export default BreadcrumbWrapper;
