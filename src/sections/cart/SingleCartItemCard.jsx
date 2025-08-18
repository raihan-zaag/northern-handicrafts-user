"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/common/components/ui/popover";

const SingleCartItemCard = ({
  cartInfo,
  pageCard = false,
  showButton = true,
  getUpdateedCalculation = () => {},
}) => {
  const [quantity, setQuantity] = useState(cartInfo?.sellQty || 1);

  const formatPrice = (price) => {
    if (!price) return "0.00";
    return typeof price === "number" ? price.toFixed(2) : price;
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    // Here you would typically update the cart
    if (getUpdateedCalculation) {
      getUpdateedCalculation();
    }
  };

  const isPrescriptionEmpty = () => {
    return !cartInfo?.prescription || Object.keys(cartInfo.prescription).length <= 1;
  };

  const PriceBreakdown = ({ cartInfo }) => (
    <div className="min-w-48 p-3">
      <h4 className="font-semibold text-sm mb-2">Price Details</h4>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>Base Price:</span>
          <span>${formatPrice(cartInfo?.productBasePrice)}</span>
        </div>
        <div className="flex justify-between">
          <span>Quantity:</span>
          <span>{cartInfo?.sellQty || 1}</span>
        </div>
        <div className="border-t pt-1 mt-1">
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${formatPrice(cartInfo?.productPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex gap-4 items-start border-b border-gray-100 pb-4 mb-4">
      {/* Product Image */}
      <Image
        src={cartInfo?.thumbnailImage || "/images/image_placeholder.png"}
        alt={cartInfo?.productName || "Product"}
        height={100}
        width={100}
        className={`${
          pageCard ? "w-[100px] h-[112px]" : "w-[120px] h-[153px]"
        } object-cover bg-gray-100 rounded`}
      />

      {/* Product Details */}
      <div className="flex-1 space-y-2">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            {cartInfo?.productName}
          </h3>
          <div className="flex items-center gap-3">
            <p className="text-base font-semibold text-gray-800">
              ${formatPrice(cartInfo?.productPrice)}
            </p>
            
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-xs text-blue-500 underline">
                  Price Breakdown
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <PriceBreakdown cartInfo={cartInfo} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Product Attributes */}
        <div className="flex items-center gap-2 flex-wrap">
          {cartInfo?.productColor && (
            <div className="bg-gray-100 px-2 py-1 text-xs rounded border">
              Color: <span className="font-medium">{cartInfo.productColor}</span>
            </div>
          )}
          {cartInfo?.prescription?.productSize && (
            <div className="bg-gray-100 px-2 py-1 text-xs rounded border">
              Lens Index: <span className="font-medium">{cartInfo.prescription.productSize}</span>
            </div>
          )}
        </div>

        {/* Prescription Info */}
        <div>
          {isPrescriptionEmpty() ? (
            <button className="text-gray-500 text-sm">
              No Prescription
            </button>
          ) : (
            <button className="text-blue-500 text-sm font-medium">
              View Prescription
            </button>
          )}
        </div>
      </div>

      {/* Quantity Controls and Actions */}
      {showButton && (
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center border rounded">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-3 py-1 text-sm">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          
          <button className="text-red-500 text-sm hover:underline">
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleCartItemCard;
