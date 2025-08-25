"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contextProviders/useCartContext";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { formatNumber } from "@/common/lib/utils";
import { CHECKOUT_URL } from "@/common/config/constants/routes";

const OrderSummaryCard = ({
  total,
  subTotal,
  taxPercentage,
  taxAmount,
  shippingCost,
  discount,
  promoCode,
  onPromoCodeChange,
  onApplyPromoCode,
  fromCartPage = false,
  className = "",
}) => {
  const router = useRouter();
  const { cart } = useCart();
  const [localPromoCode, setLocalPromoCode] = useState(promoCode || "");

  const handlePromoCodeSubmit = () => {
    if (onApplyPromoCode) {
      onApplyPromoCode(localPromoCode);
    }
  };

  const handlePromoCodeChange = (e) => {
    const value = e.target.value;
    setLocalPromoCode(value);
    if (onPromoCodeChange) {
      onPromoCodeChange(value);
    }
  };

  const handleCheckout = () => {
    router.push(CHECKOUT_URL);
  };

  const itemCount = cart?.length || 0;

  return (
    <div className={`bg-gray-50 rounded-xl p-8 space-y-6 ${className}`}>
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
        
        {/* Cart Items Summary */}
        <div className="space-y-5">
          {cart?.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-5">
              <div className="space-y-2">
                {/* Product Name and Quantity x Price */}
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-gray-900 flex-1 pr-4">
                    {item.productName}
                  </h3>
                  <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                    {item.sellQty} x ${formatNumber(item.singleProductPrice)}
                  </span>
                </div>
                
                {/* Product Options */}
                <div className="flex flex-wrap gap-2">
                  {item.productColorId && (
                    <div className="bg-gray-100 px-3 py-1 rounded-xl text-xs font-medium text-gray-700">
                      Color: {item.productColor}
                    </div>
                  )}
                  <div className="bg-gray-100 px-3 py-1 rounded-xl text-xs font-medium text-gray-700">
                    Size: {item.prescription?.productSize}
                  </div>
                </div>
              </div>
              
              {/* Item Total */}
              <div className="flex justify-end mt-3">
                <span className="text-sm font-medium text-gray-900">
                  ${formatNumber(item.productPrice)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Totals */}
      <div className="space-y-4 border-t border-gray-200 pt-6">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            Sub total ({itemCount} item{itemCount !== 1 ? 's' : ''})
          </span>
          <span className="text-sm font-medium text-gray-900">
            ${formatNumber(subTotal)}
          </span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Discount</span>
            <span className="text-sm font-medium text-red-600">
              -${formatNumber(discount)}
            </span>
          </div>
        )}

        {/* Tax (if not from cart page) */}
        {!fromCartPage && taxAmount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              Tax ({taxPercentage}%)
            </span>
            <span className="text-sm font-medium text-gray-900">
              ${formatNumber(taxAmount)}
            </span>
          </div>
        )}

        {/* Shipping Cost (if not from cart page) */}
        {!fromCartPage && shippingCost > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Shipping cost</span>
            <span className="text-sm font-medium text-gray-900">
              ${formatNumber(shippingCost)}
            </span>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <span className="text-lg font-semibold text-gray-900">Total Price</span>
          <span className="text-lg font-semibold text-gray-900">
            ${formatNumber(total)}
          </span>
        </div>
      </div>

      {fromCartPage && (
        <>
          {/* Promo Code Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Discount code
            </label>
            <div className="flex gap-3">
              <Input
                placeholder="Enter a promo code"
                value={localPromoCode}
                onChange={handlePromoCodeChange}
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={handlePromoCodeSubmit}
                disabled={!localPromoCode.trim()}
                className="px-6"
              >
                Apply
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleCheckout}
              className="w-full h-12 text-base font-semibold"
              disabled={itemCount === 0}
            >
              Checkout
            </Button>
            
            <button
              onClick={() => router.push('/')}
              className="w-full text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummaryCard;
