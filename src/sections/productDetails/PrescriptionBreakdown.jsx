import { useSingleCartProduct } from "@/contextProviders/useSingleCartProductProvider";
import { formatNumber } from "@/utils";
import React from "react";

const PrescriptionBreakdown = ({ priceForValue, cartInfo = {}, mode }) => {
  const { prodBasePrice } = useSingleCartProduct();

  const totalPrice = Object.values(priceForValue)
    .filter((item) => item && typeof item.price === "number")
    .reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <p>Base Price Per Unit</p>
        <p>
          {mode === "create"
            ? prodBasePrice
              ? formatNumber(prodBasePrice)
              : formatNumber(cartInfo?.productBasePrice)
            : formatNumber(cartInfo?.productBasePrice)}
          {/* ${formatNumber(prodBasePrice)} */}
        </p>
      </div>

      {/* if, Item price is less then 0 then the item will not appear in the list. */}
      {Object.entries(priceForValue).map(
        ([key, item]) =>
          item &&
          item.price > 0 && ( // Check if item exists and price is greater than 0
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "2px 0",
              }}
            >
              <span>
                {key} <span className="text-blue-500">({item.label})</span>
              </span>
              <span>+ ${item.price}</span>
            </div>
          )
      )}

      <div className="h-0.5 bg-[#EBEDF0] w-full my-2" />
      <div className="flex items-center justify-between">
        <p>Price Per Unit after prescription</p>
        <p>
          {formatNumber(
            (totalPrice || 0) +
              (prodBasePrice ? prodBasePrice : cartInfo?.productBasePrice || 0)
          )}
        </p>
      </div>
    </div>
  );
};

export default PrescriptionBreakdown;
