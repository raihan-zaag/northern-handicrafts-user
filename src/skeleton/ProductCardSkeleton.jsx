"use client";

import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Skeleton for Product Image */}
  <div className="bg-gray-300 h-369px w-full rounded-md"></div>

      {/* Skeleton for Product Details */}
      <div className="mt-4 space-y-2">
        {/* Skeleton for Product Name */}
        <div className="bg-gray-300 h-4 w-3/4 rounded"></div>

        {/* Skeleton for Product Price */}
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
