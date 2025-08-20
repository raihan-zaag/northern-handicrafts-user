
import { ImCancelCircle } from "react-icons/im";
import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import useUpdateOrderStatus from "@/app/(public)/orders/hooks/useMakeChangeOrderStatus";
import { Spinner } from "@/common/components/ui/spinner";
import { PROFILE_TRACK_ORDER_DYNAMIC_URL } from "@/common/config/constants/routes";
import { formatText, formatTimestamp } from "@/common/lib/utils";

const OrderCard = ({ order, ongoingOrders = [], setOngoingOrders }) => {
  const router = useRouter();

  const { loading, updateOrderStatus, success } = useUpdateOrderStatus();

  const handleOrderCancel = async () => {
    const res = await updateOrderStatus(order?.invoiceNumber, "ORDER_CANCELED");

    if (res?.status === 200) {
      if (setOngoingOrders) {
        const removeOrder = ongoingOrders?.filter(
          (singleOrder) => singleOrder?.invoiceNumber !== order?.invoiceNumber
        );

        setOngoingOrders(removeOrder);
      }
    }
  };

  const isShowOrderCancelButton =
    order?.orderStatus === "PAYMENT_PENDING" ||
    order?.orderStatus === "ORDER_PLACED";

  return (
  <div className="py-6 border-b border-border-gray flex flex-col sm:flex-row items-start justify-between relative">
      {loading && (
        <div className="absolute inset-0 grid place-items-center bg-background/40 z-10">
          <Spinner className="text-primary" />
        </div>
      )}

      <div className="flex flex-row justify-between sm:justify-start items-start sm:flex-col w-full sm:w-auto">
        <div className="flex flex-col">
          <p className="text-xs2 sm:text-md2 text-gray-medium">
            Order Id{" "}
            <span className="text-xs2 sm:text-md2 text-gray-dark">
              #{order.invoiceNumber}
            </span>
          </p>
          <p className="text-xs2 sm:text-md2 text-gray-medium mt-1">
            {formatTimestamp(order.createdAt)}
          </p>
          <p className="text-xs2 sm:text-md2 mt-1 text-gray-medium">
            Total{" "}
            <span className="text-xs2 sm:text-md2 text-gray-dark">
              ${order.invoice.totalFinalPrice}
            </span>
          </p>
        </div>
  <div className="py-2 px-3.5 sm:py-2.5 sm:px-4 bg-bg-off-white sm:mt-2 inline-block">
          <span className="text-xs sm:text-sm text-blue font-semibold">
            {formatText(order.orderStatus)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-x-12 sm:mt-0 mt-6 w-full sm:w-auto">
        {isShowOrderCancelButton ? (
          <button
            onClick={handleOrderCancel}
            className="text-sm flex-grow sm:flex-grow-0 text-font_color_red font-medium flex gap-1.5 items-center justify-center"
          >
            <ImCancelCircle />
            <span>Cancel Order</span>
          </button>
        ) : null}

        <button
          onClick={() =>
            router.push(PROFILE_TRACK_ORDER_DYNAMIC_URL(order.invoiceNumber))
          }
          className="text-sm flex-grow sm:flex-grow-0 text-blue font-medium flex gap-1.5 items-center justify-center"
        >
          <IoEyeOutline />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
