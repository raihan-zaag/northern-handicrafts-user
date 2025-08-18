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
            <div className="w-full h-0.5 border-b border-[#EBEDF0]" />
          </>
        ))}
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <CalculationBox
          title={
            <span>
              Sub Total{" "}
              <span className="text-[#0F62FE]">
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
          valueColor="text-[#D9333F]"
        />
        <CalculationBox title="Tax" value={data?.invoice?.taxAmount} />
        <CalculationBox
          title="Shipping cost"
          value={data?.invoice?.shippingCost}
        />
        <div className="w-full h-0.5 border-b border-[#EBEDF0]" />
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
            valueColor={"text-[#E91C24]"}
          />
          <div className="w-full h-0.5 border-b border-[#EBEDF0]" />
        </div>
      )}

      <div className="flex justify-between mt-3">
        <p className="text-lg font-semibold text-[#2A2A2A]">
          Final Order Price
        </p>
        <p className="text-lg font-semibold text-[#0F62FE]">
          ${formatNumber(data?.invoice?.totalFinalPrice)}
        </p>
      </div>
    </div>
  );
};

export default RightSide;

const CalculationBox = ({ title, value, valueColor = "text-[#2A2A2A]" }) => {
  return (
    <div className="flex justify-between">
      <p className="text-sm font-medium text-[#2A2A2A]">{title}</p>
      <p className={`text-sm font-medium ${valueColor}`}>
        {title === "Discount" || (title === "Return Amount" && "-")}${value}
      </p>
    </div>
  );
};
