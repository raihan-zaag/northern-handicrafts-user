import React from "react";

const EmptyDataSkeleton = ({ title }) => {
    return (
        <div className="w-full py-12 border border-[#EBEDF0] shadow-sm text-center bg-[#FAFBFB]">
            {title}
        </div>
    );
};

export default EmptyDataSkeleton;
