import Header from "@/common/components/layout/header";
import Footer from "@/common/components/layout/footer";

export default function PublicLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}