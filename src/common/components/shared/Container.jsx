import { cn } from "@/common/lib/utils";

const Container = ({ children, className }) => {
    return (
        <div className={cn("container mx-auto px-4 lg:px-0 h-full", className)}>
            {children}
        </div>
    );
};

export default Container;
