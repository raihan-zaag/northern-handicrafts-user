import BreadcrumbWrapper from "@/components/breadcrumb/BreadcrumbWrapper";
import TopHeading from "@/components/common/TopHeading";
export default function AuthLayout({ children }) {
    return (
        <>
            <TopHeading />
            <BreadcrumbWrapper />
            {children}
        </>
    );
}