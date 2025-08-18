"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/common/components/ui/Breadcrumb";
import { generateBreadcrumbPath } from "@/utils";

const NextBreadcrumb = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const toPascalCase = (string) => (string ? string : "");
  const breadcrumbPath = () => {
    const removeQuestionMark = paths.replace(/\?/g, "/");
    const removeEquals = removeQuestionMark.replace(/\=/g, "/");
    const pathToPascalCase = toPascalCase(removeQuestionMark);

    return pathToPascalCase.split("/").slice(1);
  };

  const isHomePage = paths === "/";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href={"/"}
              style={{
                color: paths === "/" ? "#2A2A2A" : "#7A8699",
                fontWeight: paths === "/" ? "600" : "500",
              }}
            >
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {!isHomePage && breadcrumbPath().length > 0 && <BreadcrumbSeparator />}

        {breadcrumbPath().map((route, index) => {
          const isLastItem = breadcrumbPath()?.length - 1 === index;

          const href = `${route === "profile"
            ? "/profile/my-account"
            : breadcrumbPath().includes("profile")
              ? route.includes("track-order")
                ? "/profile/my-orders/track-order" // Ensure it always links to the track-order base URL
                : `/profile/${route}`
              : `${generateBreadcrumbPath(breadcrumbPath(), index)}`
            }`;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem className="capitalize">
                {isLastItem ? (
                  <BreadcrumbPage
                    style={{
                      color: "#2A2A2A",
                      fontWeight: "600",
                      cursor: "default",
                    }}
                  >
                    {route}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={href}
                      style={{
                        color: "#7A8699",
                        fontWeight: "600",
                      }}
                    >
                      {route}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLastItem && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NextBreadcrumb;
