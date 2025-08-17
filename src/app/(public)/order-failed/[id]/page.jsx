"use client";

import React from "react";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import { useUserContext } from "@/contextProviders/userContextProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useOrderById from "@/hooks/order/useOrderById";
import { Spin } from "antd";

const OrderFailed = ({ params }) => {
    const router = useRouter();
    const { isAuthenticated } = useUserContext();

    const [orderDetails, setOrderDetails] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const orderId = params.id;

    const { getOrderById } = useOrderById();

    const fetchOrderDetails = async () => {
        setLoading(true);
        const response = await getOrderById(orderId);
        setOrderDetails(response);
        setLoading(false);
    };

    React.useEffect(() => {
        fetchOrderDetails();
    }, []);

    const handleGoToHomePage = () => {
        if (isAuthenticated) {
            router.push("/profile/my-orders/track-order/" + orderId);
        } else {
            router.push("/track-order");
        }
    };

    const handleReOpenPaymentLink = () => {
        // const paymentLink = orderDetails?.stripePaymentLink;
        // window.location.href = paymentLink;
        const paymentLink = orderDetails?.stripePaymentLink;
        if (paymentLink) {
            window.open(paymentLink, "_blank");
        }
    };

    return (
        <Container className="flex flex-col items-center justify-center">
            <Spin spinning={loading} fullscreen />

            <h1 className="text-[24px] text-[#E91C24] font-semibold mb-12">
                Order Failed
            </h1>
            <div className="lg:w-[600px] flex flex-col items-center gap-3">
                <Image
                    src={"/images/order_failed_image.svg"}
                    height={1000}
                    width={1000}
                    alt="Success_image"
                    className="w-[190px] h-[140px]"
                />
                <h1 className="text-[24px] text-[#E91C24] font-semibold mt-12">
                    Oops! Payment Failed
                </h1>
                <p className="font-normal text-base text-[#5A5A5A]">
                    Payment for Order ID #{orderId} could not be processed.
                </p>
                <p className="font-normal text-base text-[#5A5A5A]">
                    Please try again to complete the payment.
                </p>
                <p className="font-normal text-base text-[#5A5A5A] text-center">
                    If you want to pay later , please visit the{" "}
                    <span
                        className="text-[#0F62FE] hover:underline cursor-pointer"
                        onClick={() =>
                            router.push(
                                "/profile/my-orders/track-order/" + orderId
                            )
                        }
                    >
                        Order History page
                    </span>{" "}
                    and go to the{" "}
                    <span className="text-[#0F62FE] ">#{orderId}</span> order
                    details page to complete payment.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                    {isAuthenticated ? (
                        <Button
                            type={"outline"}
                            className={
                                "w-[100%] mt-2 py-4 px-16 whitespace-nowrap"
                            }
                            onClick={handleGoToHomePage}
                        >
                            Go To Order Details
                        </Button>
                    ) : null}

                    <Button
                        type={"primary"}
                        className={"w-[100%] mt-2 py-4 px-16 whitespace-nowrap"}
                        onClick={handleReOpenPaymentLink}
                    >
                        Try Payment Again
                    </Button>
                </div>
            </div>
            {/* <Image /> */}
        </Container>
    );
};

export default OrderFailed;
