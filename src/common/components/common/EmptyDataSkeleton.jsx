import React from "react";

const EmptyDataSkeleton = ({ title }) => {
    return (
    <div className="w-full py-12 border border-border-gray shadow-sm text-center bg-bg-lighter">
            {title}
        </div>
    );
};

export default EmptyDataSkeleton;
