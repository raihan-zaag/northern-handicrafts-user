import { Spinner } from "@/common/components/ui/spinner";

const HomePageLoding = () => {
    return (
        <div className="fixed inset-0 grid place-items-center bg-background/60">
            <Spinner size="xl" className="text-primary" />
        </div>
    );
};

export default HomePageLoding;
