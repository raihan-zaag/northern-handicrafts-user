import BreadcrumbWrapper from "@/components/breadcrumb/BreadcrumbWrapper";
import TopHeading from "@/components/common/topHeading";
export default function AuthLayout({ children }) {
    return (
        <>
            <TopHeading />
            <BreadcrumbWrapper />
            {children}
        </>
    );
}