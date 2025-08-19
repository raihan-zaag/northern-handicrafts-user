import BreadcrumbWrapper from "@/common/components/layout/breadcrumb/BreadcrumbWrapper";
import TopHeading from "@/common/components/common/TopHeading";
import Footer from "@/common/components/layout/footer";
export default function AuthLayout({ children }) {
    return (
        <div className="bg-secondary-bg">
            <TopHeading />
            <BreadcrumbWrapper />
            <div className="flex justify-center items-center my-80px ">{children}</div>
            <Footer />
        </div>
    );
}