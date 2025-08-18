import React from "react";

const RowSkeleton = ({ count = 2 }) => {
  return (
    <div className="space-y-4">
      <div className="animate-pulse flex flex-col gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="h-20 bg-gray-200 rounded w-full"></div>
        ))}
      </div>
    </div>
  );
};

export default RowSkeleton;
