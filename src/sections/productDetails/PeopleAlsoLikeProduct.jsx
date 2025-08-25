"use client";

import { dummyProducts } from "@/data/dummyProductData";
import SingleProduct from "@/sections/products/SingleProduct";
import Typography from "@/common/components/Typography";

const PeopleAlsoLikeProduct = ({ productId }) => {
  // Get recommended products (excluding current product)
  const recommendedProducts = dummyProducts
    .filter(product => product.id !== productId)
    .slice(0, 4);

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-8">
        <Typography.Title2 className="text-gray-900">You Might Also Like</Typography.Title2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedProducts.map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PeopleAlsoLikeProduct;
