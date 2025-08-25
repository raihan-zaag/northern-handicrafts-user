"use client";

import Link from "next/link";
import { Button } from "@/common/components/ui/button";

const EmptyCartState = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
      <div className="max-w-md mx-auto space-y-6">
        {/* Icon or Illustration */}
        <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-xl font-medium text-gray-500">
          No items added
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm">
          Your cart is empty. Browse our products and add items to your cart.
        </p>

        {/* Action Button */}
        <Link href="/">
          <Button 
            className="px-8 py-3 font-semibold"
          >
            START SHOPPING
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCartState;
