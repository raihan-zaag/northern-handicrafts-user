import React from "react";
import ProductLeftView from "./ProductLeftView";
import ProductRightView from "./ProductRightView";
import ProductViewMobile from "./ProductViewMobile";


const ProductDetailsPage = ({ product }) => {
  // console.log(product);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10">
      <div className="hidden lg:block col-span-1">
        <ProductLeftView data={product} />
      </div>

      <div className="hidden lg:block col-span-1 w-full">
        <ProductRightView data={product} />
      </div>

      <div className="col-span-1 block lg:hidden">
        <ProductViewMobile data={product} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
