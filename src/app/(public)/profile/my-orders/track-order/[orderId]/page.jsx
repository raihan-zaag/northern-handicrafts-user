import TrackOrderContainer from "@/app/(public)/orders/sections/TrackOrderContainer";
import React from "react";

const TrackOrder = ({ params }) => {
  // console.log(params);
  return (
    <>
      <TrackOrderContainer orderId={params.orderId} />
    </>
  );
};

export default TrackOrder;
