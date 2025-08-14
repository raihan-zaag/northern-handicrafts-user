import React from "react";
import Container from "@/components/common/container";
import { productDetails } from "@/services/productService";
import ProductDetailsPage from "@/sections/productDetails";
import PeopleAlsoLikeProduct from "@/sections/productDetails/PeopleAlsoLikeProduct";

const ProductDetails = async ({ params }) => {
  const { id: productId } = params;

  try {
    // Fetch product details
    const product = await productDetails(productId);

    // If no product is found, show "Not Found" section
    if (!product?.content.length) {
      return (
        <Container>
          <div className="text-center text-lg font-semibold py-10">
            Product not found!
          </div>
        </Container>
      );
    }

    // Render product details
    return (
      <Container>
        <ProductDetailsPage product={product?.content[0]} />

        {/* description */}
        <ProductDescriptionSection data={product?.content[0]} />

        {/* You may also like. */}
        <div className="mt-8">
          <PeopleAlsoLikeProduct productId={product?.content[0]?.id} />
        </div>
      </Container>
    );
  } catch (error) {
    // Handle API errors and show fallback UI
    return (
      <Container>
        <div className="text-center text-lg font-semibold py-10 text-red-500">
          Something went wrong while loading the product details. Please try
          again later.
        </div>
      </Container>
    );
  }
};
export default ProductDetails;
