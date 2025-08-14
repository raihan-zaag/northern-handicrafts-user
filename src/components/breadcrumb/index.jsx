// export default NextBreadcrumb;

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "antd";
import { generateBreadcrumbPath } from "@/utils";

const NextBreadcrumb = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  // To Uppercase the Breadcrumb item
  const toPascalCase = (string) => (string ? string : "");

  // Breadcrumb item array
  const breadcrumbPath = () => {
    const removeQuestionMark = paths.replace(/\?/g, "/");
    const removeEquals = removeQuestionMark.replace(/\=/g, "/");
    const pathToPascalCase = toPascalCase(removeQuestionMark);

    return pathToPascalCase.split("/").slice(1);
  };

  const isHomePage = paths === "/"; // Check if the user is on the home page

  return (
    <Breadcrumb separator={isHomePage ? "" : "/"}>
      <Breadcrumb.Item separator={false}>
        <Link
          href={"/"}
          className={
            paths === "/"
              ? "text-[#7A8699] font-bold"
              : "text-[#7A8699] font-medium"
          }
          style={{
            color: "#7A8699",
            fontWeight: "500",
          }}
        >
          Home
        </Link>
      </Breadcrumb.Item>

      {breadcrumbPath().map((route, index) => {
        const isLastItem = breadcrumbPath()?.length - 1 === index;
        // console.log(breadcrumbPath()?.length - 1, index, route, isLastItem);
        // console.log(
        //   `${
        //     route === "profile"
        //       ? "/profile/my-account"
        //       : breadcrumbPath().includes("profile")
        //       ? route.includes("track-order")
        //         ? "/profile/my-orders/track-order" // Ensure it always links to the track-order base URL
        //         : `/profile/${route}`
        //       : `${generateBreadcrumbPath(breadcrumbPath(), index)}`
        //   }`
        // );

        const href = `${
          route === "profile"
            ? "/profile/my-account"
            : breadcrumbPath().includes("profile")
            ? route.includes("track-order")
              ? "/profile/my-orders/track-order" // Ensure it always links to the track-order base URL
              : `/profile/${route}`
            : `${generateBreadcrumbPath(breadcrumbPath(), index)}`
        }`;

        return (
          <Breadcrumb.Item
            key={index}
            className={`capitalize`}
            separator={isHomePage && index === 0 ? "" : "/"}
          >
            {/* <Link
              href={`${
                route === "profile"
                  ? "/profile/my-account"
                  : breadcrumbPath().includes("profile")
                  ? `/profile/${route}`
                  : `${generateBreadcrumbPath(breadcrumbPath(), index)}`
              }`}
              style={{
                color: isLastItem ? "#2A2A2A" : "#7A8699",
                fontWeight: "600",
              }}
              // className={`${
              //   isLastItem
              //     ? "text-[#7A8699] font-bold"
              //     : "text-[#7A8699] font-medium"
              // }`}
            >
              {route}
            </Link> */}

            {/* for last item href is not working. */}
            {isLastItem ? (
              <span
                style={{
                  color: "#2A2A2A",
                  fontWeight: "600",
                  cursor: "default",
                }}
              >
                {route}
              </span>
            ) : (
              <Link
                href={href}
                style={{
                  color: "#7A8699",
                  fontWeight: "600",
                }}
              >
                {route}
              </Link>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default NextBreadcrumb;

// previous one
// "use client";

// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { Breadcrumb } from "antd";
// import { generateBreadcrumbPath } from "@/utils";

// const NextBreadcrumb = () => {
//   const paths = usePathname();
//   const pathNames = paths.split("/").filter((path) => path);

//   // To Uppercase the Breadcrumb item
//   const toPascalCase = (string) => (string ? string : "");

//   // Breadcrumb item array
//   const breadcrumbPath = () => {
//     const removeQuestionMark = paths.replace(/\?/g, "/");
//     const removeEquals = removeQuestionMark.replace(/\=/g, "/");
//     const pathToPascalCase = toPascalCase(removeEquals);

//     return pathToPascalCase.split("/").slice(1);
//   };

//   return (
//     <Breadcrumb>
//       <Breadcrumb.Item separator={null}>
//         <Link href={"/"} className={paths === "/" ? "text-black" : ""}>
//           Home
//         </Link>
//       </Breadcrumb.Item>
//       {breadcrumbPath().map((route, index) => (
//         <Breadcrumb.Item
//           key={index}
//           className={`capitalize ${
//             breadcrumbPath()?.length - 1 === index ? "text-primary" : ""
//           }`}
//           // separator={index === 0 ? "" : "/"}
//           separator={null}
//         >
//           <Link
//             href={`${
//               route === "profile"
//                 ? "/profile/my-account"
//                 : breadcrumbPath().includes("profile")
//                 ? `/profile/${route}`
//                 : `${generateBreadcrumbPath(breadcrumbPath(), index)}`
//             }`}
//             className={
//               breadcrumbPath()?.length - 1 === index ? "text-primary" : ""
//             }
//           >
//             {route}
//           </Link>
//         </Breadcrumb.Item>
//       ))}
//     </Breadcrumb>
//   );
// };
