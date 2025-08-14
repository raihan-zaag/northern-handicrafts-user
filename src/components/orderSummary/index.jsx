"use client";

import { useCart } from "@/contextProviders/useCartContext";
import { formatNumber } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const OrderSummary = ({
  total,
  subTotal,
  taxPercentage,
  taxAmount,
  shippingCost,
  discount,
  fromCartPage = false,
  className,
  promoCodeUi,
}) => {
  const router = useRouter();

  const { cart, handleUpdateCartInBackend } = useCart();

  const handleGotoCheckoutPage = () => {
    if (fromCartPage) {
      // handleUpdateCartInBackend();
    }

    router.push("/checkout");
  };

  return (
    <div
      className={`w-full mx-auto bg-[#FAFBFB] ${className} ${
        fromCartPage ? "p-10" : ""
      }`}
    >
      {/* Title */}
      {fromCartPage && (
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      )}

      {/* Subtotal */}
      <div className="flex justify-between text-gray-700 mb-2">
        <span>
          Sub total{" "}
          <span className="text-blue-500">({cart?.length} items)</span>
        </span>
        <span>${formatNumber(subTotal)}</span>
      </div>

      {/* Discount */}
      <div className="flex justify-between text-red-500 font-medium mb-4">
        <span>Discount</span>
        <span>- ${discount || 0}</span>
      </div>

      {/* Divider */}
      <hr className="my-2 border-t" />

      {/* Subtotal */}
      {fromCartPage ? null : (
        <div className="flex justify-between text-gray-700 mb-2">
          <span>
            Sub total{" "}
            <span className="text-blue-500">({cart?.length} items)</span>
          </span>
          <span>${formatNumber(subTotal - discount)}</span>
        </div>
      )}

      {/* Tax */}
      {fromCartPage ? null : (
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Tax ({taxPercentage})%</span>
          <span>${taxAmount || 0}</span>
        </div>
      )}

      {/* Shipping Cost */}
      {fromCartPage ? null : (
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Shipping cost</span>
          <span>${shippingCost || 0}</span>
        </div>
      )}

      {/* Total */}
      <div
        className={`flex justify-between items-center font-semibold text-lg ${
          fromCartPage ? "mb-4" : ""
        }`}
      >
        <span>Final Order Total</span>
        <span className="text-blue-500">${formatNumber(total)}</span>
      </div>

      {fromCartPage && (
        <>
          {promoCodeUi}

          {/* Checkout Button */}
          <button
            onClick={handleGotoCheckoutPage}
            className="w-full py-3 bg-primary text-white text-center font-semibold transition duration-200"
          >
            Checkout
          </button>

          {/* Continue Shopping */}
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-gray-700 underline text-sm hover:text-black"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
