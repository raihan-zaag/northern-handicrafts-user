import TrackOrderContainer from "@/sections/TrackOrder/TrackOrderContainer";
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
