"use client";

import { useState } from "react";
import ReviewAndRatings from "./ReviewAndRatings";


const ProductDescriptionSection = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { label: "Product Details and Review Rating", key: "details" },
  ];

  const RenderComponent = () => {
    switch (selectedTab) {
      case 0:
        return <ProductDetailsAndReviews data={data} />;
      default:
        return <div>No Component Found</div>;
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Tab Header */}
      <div className="flex w-full border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setSelectedTab(index)}
            className={`px-4 py-3 font-semibold text-base transition-all duration-300 border-b-2 ${selectedTab === index
              ? "border-gray-800 text-gray-900"
              : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full py-8">
        {RenderComponent()}
      </div>
    </div>
  );
};

export default ProductDescriptionSection;

const ProductDetailsAndReviews = ({ data }) => {
  const hasProductDetails = data?.productDetails && data.productDetails.trim() !== "";

  // If no product details, show only reviews taking full width
  if (!hasProductDetails) {
    return (
      <div className="w-full">
        <ReviewAndRatings productId={data?.id} />
      </div>
    );
  }

  // If product details exist, show the grid layout
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Left Side - Product Description */}
      <div className="flex flex-col gap-4">
        <div className="prose prose-gray max-w-none">
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: data.productDetails,
            }}
          />
        </div>
      </div>

      {/* Right Side - Reviews Section */}
      <div className="flex flex-col gap-6">
        <ReviewAndRatings productId={data?.id} />
      </div>
    </div>
  );
};
