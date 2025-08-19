import BreadcrumbWrapper from "@/common/components/layout/breadcrumb/BreadcrumbWrapper";
import TopHeading from "@/common/components/common/TopHeading";
import Footer from "@/common/components/layout/footer";
export default function AuthLayout({ children }) {
    return (
        <>
            <TopHeading />
            <BreadcrumbWrapper />
            {children}
            <Footer />
        </>
    );
}