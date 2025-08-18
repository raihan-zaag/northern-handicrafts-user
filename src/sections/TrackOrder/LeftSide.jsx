import { formatAddress, formatText, formatTimestamp } from "@/utils";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const LeftSide = ({ data }) => {
    console.log("data", data);

    // Logic to determine styles
    const getStatusStyles = (orderStatus) => {
        if (
            orderStatus === "ORDER_CANCELED" ||
            orderStatus === "PARTIALLY_RETURNED" ||
            orderStatus === "ORDER_RETURNED"
        ) {
            return {
                backgroundColor: "bg-red-100",
                valueColor: "text-red-500",
            };
        } else if (orderStatus === "ORDER_DELIVERED") {
            return {
                backgroundColor: "bg-green-100", // Greenish background
                valueColor: "text-green-500", // Green text
            };
        } else if (orderStatus === "PAYMENT_PENDING") {
            return {
                backgroundColor: "bg-yellow-100", // Yellowish background
                valueColor: "text-yellow-500", // Yellow text
            };
        } else if (
            orderStatus === "ORDER_PLACED" ||
            orderStatus === "ORDER_ON_THE_WAY" ||
            orderStatus === "ORDER_ON_THE_WAY"
        ) {
            return {
                backgroundColor: "bg-blue-100", // Bluish background
                valueColor: "text-blue-500", // Blue text
            };
        }
        return {};
    };

    return (
        <div className="p-8 bg-[#FAFBFB] order-2 xl:order-1 w-full">
            <DetailsBox
                title="Order ID"
                value={data?.invoiceNumber}
                valueColor="font-medium text-[#0F62FE]"
                padding="pb-5"
            />
            <DetailsBox
                title="Current order status"
                value={formatText(data?.orderStatus)}
                {...getStatusStyles(data?.orderStatus)}
                paymentLink={data?.stripePaymentLink}
            />

            <div className={`py-5 border-b border-[#F0F0F0]`}>
                <p className="text-[#3A3A3A] text-sm font-semibold">
                    Tracking link
                </p>
                <div className="mt-1 flex items-center justify-between gap-2">
                    {data?.deliveryTrackingLink ? (
                        <div className="flex flex-row items-center justify-between gap-3 w-full">
                            <div className="hidden md:block">
                                <Link
                                    href={`${data?.deliveryTrackingLink}`}
                                    className={`text-[#0F62FE] mt-1 text-sm font-medium underline`}
                                    target="_blank"
                                >
                                    <p className="w-full">
                                        {data?.deliveryTrackingLink}
                                    </p>
                                </Link>
                            </div>

                            <Link
                                href={`${data?.deliveryTrackingLink}`}
                                className={`text-[#0F62FE] mt-1 text-sm font-semibold flex items-center gap-1`}
                                target="_blank"
                            >
                                <span className="whitespace-nowrap">
                                    Track order
                                </span>
                                <FaArrowRightLong className="-rotate-[45deg]" />
                            </Link>
                        </div>
                    ) : (
                        <p>--</p>
                    )}
                </div>
            </div>
            <DetailsBox
                title="Order Date & time"
                value={formatTimestamp(data.createdAt)}
            />
            <DetailsBox
                title="Email address"
                value={data?.guestUserAddress?.email}
            />
            <DetailsBox
                title="Phone number"
                value={data?.guestUserAddress?.mobileNumber || "--"}
            />
            <DetailsBox
                title="Delivery type"
                value={formatText(data?.deliveryMethod)}
            />
            <DetailsBox
                title="Delivery Address"
                value={formatAddress(data?.guestUserAddress)}
            />
            {/* <DetailsBox title="Billing Address" value={"Same as Delivery address"} /> */}
            <DetailsBox title="Payment method" value={"Stripe"} />
            <DetailsBox
                title="Order Note"
                value={data.orderNote || "--"}
                padding="pt-5"
                border="border-none"
            />
        </div>
    );
};

export default LeftSide;

const DetailsBox = ({
    title,
    value,
    valueColor = "text-[#5A5A5A]",
    padding = "py-5",
    border = "border-b border-[#F0F0F0]",
    backgroundColor = "bg-transparent",
    paymentLink = "",
}) => {
    const handleReOpenPaymentLink = () => {
        // const paymentLink = orderDetails?.stripePaymentLink;
        // window.location.href = paymentLink;
        // const paymentLink = paymentLink;

        if (paymentLink) {
            window.open(paymentLink, "_blank");
        }
    };
    return (
        <div className={`${padding} ${border}`}>
            {title === "Current order status" && value === "Payment Pending" ? (
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
                    <div>
                        <p className="text-[#3A3A3A] text-sm font-semibold">
                            {title}
                        </p>
                        <p
                            className={`${valueColor} mt-1 text-base font-medium`}
                        >
                            {value}
                        </p>
                    </div>
                    <button
                        className="bg-primary text-white px-6 py-2 font-semibold text-sm"
                        onClick={handleReOpenPaymentLink}
                    >
                        Make Payment
                    </button>
                </div>
            ) : (
                <>
                    <p className="text-[#3A3A3A] text-sm font-semibold">
                        {title}
                    </p>
                    <p className={`${valueColor} mt-1 text-base font-medium`}>
                        {value}
                    </p>
                </>
            )}
        </div>
    );
};
