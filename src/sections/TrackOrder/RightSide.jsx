import OrdersProductCard from "@/components/cards/OrdersProductCard";
import { formatNumber } from "@/utils";
import React from "react";

const RightSide = ({ data }) => {
  return (
    <div className="order-1 xl:order-2 w-full">
      <div className="flex flex-col gap-5">
        {data.cartDetailsList.map((item, index) => (
          <>
            <OrdersProductCard
              key={index}
              data={item}
              orderId={data?.id}
              orderStatus={data?.orderStatus}
              allOrderInfo={data}
            />
            <div className="w-full h-0.5 border-b border-border" />
          </>
        ))}
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <CalculationBox
          title={
            <span>
              Sub Total{" "}
              <span className="text-blue">
                ({data.cartDetailsList.length} item)
              </span>
            </span>
          }
          value={formatNumber(
            data?.invoice?.totalProductPrice + data?.invoice?.totalExtraCharge
          )}
        />
        <CalculationBox
          title="Discount"
          value={data?.invoice?.promoDiscountAmount}
          valueColor="text-red-variant1"
        />
        <CalculationBox title="Tax" value={data?.invoice?.taxAmount} />
        <CalculationBox
          title="Shipping cost"
          value={data?.invoice?.shippingCost}
        />
  <div className="w-full h-0.5 border-b border-border" />
      </div>

      {data?.invoice?.refundAmount > 0 && (
        <div className="flex flex-col gap-3 mt-4">
          <CalculationBox
            title="Initial Order Price"
            value={formatNumber(
              data?.invoice?.refundAmount + data?.invoice?.totalFinalPrice
            )}
          />
          <CalculationBox
            title="Return Amount"
            value={formatNumber(data?.invoice?.refundAmount)}
            valueColor={"text-red-variant2"}
          />
          <div className="w-full h-0.5 border-b border-border" />
        </div>
      )}

      <div className="flex justify-between mt-3">
        <p className="text-lg font-semibold text-gray-dark">
          Final Order Price
        </p>
        <p className="text-lg font-semibold text-blue">
          ${formatNumber(data?.invoice?.totalFinalPrice)}
        </p>
      </div>
    </div>
  );
};

export default RightSide;

const CalculationBox = ({ title, value, valueColor = "text-gray-dark" }) => {
  return (
    <div className="flex justify-between">
  <p className="text-sm font-medium text-gray-dark">{title}</p>
      <p className={`text-sm font-medium ${valueColor}`}>
        {title === "Discount" || (title === "Return Amount" && "-")}${value}
      </p>
    </div>
  );
};
