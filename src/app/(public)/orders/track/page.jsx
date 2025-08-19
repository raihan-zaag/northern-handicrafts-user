// "use client";

// import TopHeading from "@/common/components/common/TopHeading";
// import useGetGuestUserOrderInfo from "@/app/(public)/orders/hooks/useGetGuestUserOrderInfo";
// import LeftSide from "@/app/(public)/orders/sections/LeftSide";
// import RightSide from "@/app/(public)/orders/sections/RightSide";
// import { Form, Input, Spin } from "antd";
// import React, { useState } from "react";

// const TreakOrders = () => {
//   const { getGuestUserOrderInformation, data, loading } =
//     useGetGuestUserOrderInfo();
//   const [isValueExist, setIsValueExist] = useState("");

//   const onFinish = async (values) => {
//     setIsValueExist(values);
//     await getGuestUserOrderInformation(values.id);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-scr bg-white my-[80px] ">
//       <Spin fullscreen spinning={loading} />

//       {data ? (
//         <div>
//           <h1 className="text-2xl font-semibold text-[#262626] text-center">
//             Track Order{" "}
//             <span className="text-[#0F62FE]">#{data?.invoiceNumber}</span>
//           </h1>
//           <div className="mt-12 grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-[60px]">
//             <LeftSide data={data} />
//             <RightSide data={data} />
//           </div>
//         </div>
//       ) : (
//         <div className="w-full max-w-[600px] bg-secondary p-8 rounded border border-border">
//           {/* Logo */}
//           <div className="flex justify-center mb-6">
//             <TopHeading />
//           </div>

//           <div className="mb-5">
//             <h2 className="text-2xl font-semibold text-left mb-2">
//               Track Order
//             </h2>
//             <span className="text-[#4A4A4A] text-left mb-6 font-light">
//               Enter your tracking id below to know the latest status of your
//               delivery
//             </span>
//           </div>

//           <Form layout="vertical" onFinish={onFinish}>
//             <Form.Item
//               name="id"
//               label="Tracking Id"
//               rules={[
//                 {
//                   required: true,
//                   type: "text",
//                   message: "Please enter a valid id",
//                 },
//               ]}
//             >
//               <Input
//                 placeholder="Enter your tracking id here.."
//                 className="h-[52px]"
//               />
//             </Form.Item>

//             <Form.Item>
//               <button
//                 type="submit"
//                 className="w-full bg-primary text-white font-semibold h-[52px] rounded mt-5"
//                 // disabled={!isValueExist}
//                 disabled={isValueExist === ""}
//               >
//                 Start Tracking Order
//               </button>
//             </Form.Item>
//           </Form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TreakOrders;

"use client";

import TopHeading from "@/common/components/common/TopHeading";
import useGetGuestUserOrderInfo from "@/app/(public)/orders/hooks/useGetGuestUserOrderInfo";
import LeftSide from "@/sections/TrackOrder/LeftSide";
import RightSide from "@/sections/TrackOrder/RightSide";
import { LoadingOverlay } from "@/common/components/ui/loading-overlay";
import React, { useState } from "react";

const TreakOrders = () => {
  const { getGuestUserOrderInformation, data, loading } =
    useGetGuestUserOrderInfo();
  const [trackingId, setTrackingId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let sanitizedTrackingId = trackingId.startsWith("#")
      ? trackingId.slice(1)
      : trackingId;

    if (!sanitizedTrackingId.trim()) {
      setError("Please enter a valid tracking ID.");
      return;
    }
    setError("");
    await getGuestUserOrderInformation(sanitizedTrackingId);
  };

  return (
    <LoadingOverlay isLoading={loading}>
      <div className="flex items-center justify-center min-h-scr bg-white my-20 ">
        {data ? (
          <div>
            <h1 className="text-2xl font-semibold text-dark text-center">
              Track Order{" "}
              <span className="text-blue">#{data?.invoiceNumber}</span>
            </h1>
          <div className="mt-12 grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-15px">
            <LeftSide data={data} />
            <RightSide data={data} />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-600px bg-secondary p-8 rounded border border-border">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <TopHeading />
          </div>

          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-left mb-2">
              Track Order
            </h2>
            <span className="text-gray-mid2 text-left mb-6 font-light">
              Enter your tracking ID below to know the latest status of your
              delivery
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="trackingId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tracking ID
              </label>
              <input
                id="trackingId"
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter your tracking ID here.."
                className="w-full h-52px px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold h-52px rounded mt-5"
                disabled={!trackingId.trim()}
              >
                Start Tracking Order
              </button>
            </div>
          </form>
        </div>
      )}
      </div>
    </LoadingOverlay>
  );
};

export default TreakOrders;
