import BreadcrumbWrapper from "@/common/components/layout/breadcrumb/BreadcrumbWrapper";
import TopHeading from "@/common/components/common/TopHeading";
export default function AuthLayout({ children }) {
    return (
        <>
            <TopHeading />
            <BreadcrumbWrapper />
            {children}
        </>
    );
}