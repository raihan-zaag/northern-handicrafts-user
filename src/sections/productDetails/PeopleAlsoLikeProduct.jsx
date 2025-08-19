"use client";

import React from "react";
import useGetRecomendedProduct from "@/hooks/singleProduct/useGetRecomendedProduct";
import SingleProduct from "../home/SingleProduct";
import useGetSize from "@/hooks/singleProduct/useGetSizes";

const SkeletonProduct = () => {
  return (
    <div className="animate-pulse flex flex-col gap-y-4">
      <div className="h-48 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

const PeopleAlsoLikeProduct = ({ productId }) => {
  const { recommendedProduct, loading } = useGetRecomendedProduct();

  // Limit the product list to 4 products
  const limitedProducts =
    recommendedProduct
      ?.slice(0, 5)
      .filter((product) => product?.id !== productId) || [];
  const { loading: sizeLoading, sizeList } = useGetSize();

  return (
    <div className="">
      <div className="w-full flex justify-start gap-x-10 mb-6">
        {["You Might Also Like"].map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-y-2">
            <h2 className="text-neutral-700 text-18px font-bold">{item}</h2>
          </div>
        ))}
      </div>

      {/* Large screen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 gap-y-4 sm:gap-y-6 md:gap-y-8 lg:gap-y-12">
        {loading || sizeLoading
          ? Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="relative overflow-hidden">
                  <SkeletonProduct />
                </div>
              ))
          : limitedProducts?.map((product, index) => {
              return (
                <div key={index} className="relative overflow-hidden">
                  <SingleProduct
                    product={product}
                    defaultSizePrice={sizeList[0]?.price}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default PeopleAlsoLikeProduct;
