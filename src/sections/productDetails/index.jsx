import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";

const ProductDetailsPage = ({ product }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 xl:gap-12">
      {/* Left Side - Product Image Gallery */}
      <div className="order-1 lg:order-1 lg:col-span-3 h-full">
        <ProductImageGallery product={product} />
      </div>

      {/* Right Side - Product Information */}
      <div className="order-2 lg:order-2 lg:col-span-2 h-full">
        <ProductInfo product={product} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
