import BreadcrumbWrapper from "@/common/components/layout/breadcrumb/BreadcrumbWrapper";
import Footer from "@/common/components/layout/footer";
import TopHeading from "@/common/components/shared/TopHeading";
export default function AuthLayout({ children }) {
    return (
        <div className="bg-surface">
            <TopHeading />
            <BreadcrumbWrapper />
            <div className="flex justify-center items-center my-[80px]">{children}</div>
            <Footer />
        </div>
    );
}