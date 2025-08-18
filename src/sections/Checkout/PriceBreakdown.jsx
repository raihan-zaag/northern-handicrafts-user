"use client";

import React from "react";

const PriceBreakdown = ({ cartInfo }) => {
  if (!cartInfo) {
    return (
      <div className="p-4 text-center text-gray-500">
        No pricing information available
      </div>
    );
  }

  const formatPrice = (price) => {
    if (!price) return "0.00";
    return typeof price === "number" ? price.toFixed(2) : price;
  };

  const renderPriceRow = (label, price, isHighlight = false) => {
    if (!price || price === 0) return null;
    
    return (
      <div className={`flex justify-between py-1 ${isHighlight ? 'font-semibold text-blue-600' : 'text-gray-700'}`}>
        <span className="text-sm">{label}:</span>
        <span className="text-sm">${formatPrice(price)}</span>
      </div>
    );
  };

  const basePrice = cartInfo.productBasePrice || 0;
  const quantity = cartInfo.sellQty || 1;
  const singleProductPrice = cartInfo.singleProductPrice || basePrice;
  const totalPrice = cartInfo.productPrice || (singleProductPrice * quantity);

  return (
    <div className="min-w-48 space-y-2">
      <h4 className="font-semibold text-gray-900 mb-3">Price Breakdown</h4>
      
      <div className="space-y-1">
        {renderPriceRow("Base Price", basePrice)}
        
        {cartInfo.productColor && renderPriceRow("Color", 0)} {/* Color prices would come from prescription data */}
        
        {cartInfo.prescription?.productSize && renderPriceRow("Lens Index", 0)} {/* Lens index prices would come from prescription data */}
        
        {/* Prescription-related prices would be calculated here */}
        
        <div className="border-t border-gray-200 mt-2 pt-2">
          {renderPriceRow("Price per unit", singleProductPrice)}
          {renderPriceRow("Quantity", quantity, false)}
        </div>
        
        <div className="border-t border-gray-200 mt-2 pt-2">
          {renderPriceRow("Total Price", totalPrice, true)}
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
