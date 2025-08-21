"use client";
import useOrderById from "@/hooks/order/useOrderById";
import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import EmptyDataSkeleton from "@/common/components/shared/EmptyDataSkeleton";
import TextSkeleton from "@/common/components/shared/TextSkeleton";

const TrackOrderContainer = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = React.useState(null);
  const { getOrderById } = useOrderById();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    const response = await getOrderById(orderId);
    console.log({ response });
    setOrderDetails(response);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <TextSkeleton />
      ) : (
        <>
          {orderDetails ? (
            <div>
              <h1 className="text-2xl font-semibold text-dark text-center">
                Track Order{" "}
                <span className="text-blue">
                  #{orderDetails?.invoiceNumber}
                </span>
              </h1>
              <div className="mt-12 grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-60px">
                <LeftSide data={orderDetails} />
                <RightSide data={orderDetails} />
              </div>
            </div>
          ) : (
            <EmptyDataSkeleton title={"No Order found"} />
          )}
        </>
      )}
    </>
  );
};

export default TrackOrderContainer;
