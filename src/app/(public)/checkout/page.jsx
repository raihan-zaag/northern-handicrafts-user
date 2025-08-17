"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Spin } from "antd";
import Link from "next/link";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import OrderSummary from "@/components/orderSummary";
import { useCart } from "@/contextProviders/useCartContext";
import { useUserContext } from "@/contextProviders/userContextProvider";
import useGetDefaultSettings from "@/hooks/checkout/useGetSettingsInfo";
import useCreateOrder from "@/hooks/order/useMakeOrder";
import AuthUserAddress from "@/sections/checkout/AuthUserAddress";
import GuestUserAddressForm from "@/sections/checkout/GuestUserAddressForm";
import CheckoutProductCard from "./_component/CheckoutProductCart";
import useNotification from "@/hooks/useNotification";
import useUpdateCart from "@/hooks/cart/useCartUpdate";
import { formatNumber } from "@/utils";
import useGetUserProfile from "@/hooks/user/useGetUserInfo";

const CheckoutPage = () => {
    const [deliveryAddress, setDeliveryAddress] = useState();
    const [paymentMetod, setPaymentMethod] = useState("stripe");

    const [form] = Form.useForm();
    const [promoCode, setPromoCode] = useState();
    const [note, setNote] = useState();

    const {
        cart,
        handleGetOrderCalculateData,
        calculatedData,
        handleMakeOrderForGuestUser,
        getCartListForAuthUser,
        loading: getCartLoading,
        getCalculationLoading,
        clearCart,
        handleUpdateCartInBackend,
    } = useCart();
    const { isAuthenticated, user } = useUserContext();
    const { profile } = useGetUserProfile();
    const { createOrder, loading: orderLoading } = useCreateOrder();
    const { updateCart, loading: cartUpdateLoading } = useUpdateCart();
    const { configData, loading: settingLoading } = useGetDefaultSettings();
    const { openInfoNotification } = useNotification();

    const handledeliveryMethodChange = (e) => {
        setDeliveryMethod(e.target.value);
    };

    useEffect(() => {
        if (isAuthenticated) {
            const fetchData = async () => {
                try {
                    const res = await getCartListForAuthUser();
                    // console.log(res);

                    // Conditionally set promo code if it exists
                    if (res?.promo?.code) {
                        setPromoCode(res.promo.code);
                        handleGetOrderCalculateData(
                            deliveryMethod,
                            res?.promo?.code
                        );
                    } else {
                        setPromoCode(null);
                    }
                } catch (error) {
                    console.error("Failed to fetch cart list:", error);
                }
            };

            fetchData();
        }
    }, [isAuthenticated]);

    const deliveryMethods = [
        {
            status: "Standard delivery",
            info:
                `(${configData?.standardDeliveryTime})` ||
                "(3-5 business days)",
            value: "STANDARD",
            price: configData?.standardDeliveryPrice ?? 0,
        },
        {
            status: "Express delivery",
            info: `(${configData?.expressDeliveryTime})` || "(Within 24 hours)",
            value: "EXPRESS",
            price: configData?.expressDeliveryPrice ?? 0,
        },
    ];

    // Set default delivery method to "Standard delivery"
    const [deliveryMethod, setDeliveryMethod] = useState(
        deliveryMethods[0].value
    );

    useEffect(() => {
        if (cart?.length > 0) {
            handleGetOrderCalculateData(deliveryMethod);
        }
    }, [deliveryMethod]);

    // order for auth user
    const handleMakeOrder = async () => {
        if (cart?.length === 0) {
            openInfoNotification(
                "info",
                "Please select some product for order."
            );
            return;
        }

        if (!deliveryAddress && isAuthenticated) {
            openInfoNotification("info", "Please select a delivery addresss.");
            return;
        }

        if (isAuthenticated) {
            try {
                // Validate email and mobileNumber fields from the form
                const values = await form.validateFields([
                    "email",
                    "mobileNumber",
                ]);
                const data = {
                    customer: {
                        id: Number(user?.id),
                        email: values.email,
                        mobileNumber: values.mobileNumber,
                    },
                    savedAddress: {
                        id: Number(deliveryAddress?.id),
                    },
                    orderNote: note,
                    deliveryMethod,
                };

                const res = await createOrder(data);

                if (res?.paymentLink) {
                    clearCart();
                    const paymentLink = res?.paymentLink;
                    window.location.href = paymentLink;
                }
            } catch (error) {
                console.error("Form validation failed:", error);
            }
        } else {
            handleFormFinish();
        }
    };

    // order for guest user
    const handleFormFinish = async () => {
        try {
            const formData = await form.validateFields();
            form.submit();

            const productMap = cart?.map((product) => ({
                product: { id: product.product.id },
                productColor: product.productColor,
                ...(product?.productColorId && {
                    productColorId: Number(product?.productColorId),
                }),
                sellQty: product.sellQty,
                thumbnailImage: product.thumbnailImage,
                prescription: product?.prescription,
            }));

            const data = {
                guestUserAddress: formData,
                cartDetailsList: productMap,
                deliveryMethod,
                ...(note && { orderNote: note }),
                ...(promoCode && { promo: { code: promoCode } }),
            };

            const response = await handleMakeOrderForGuestUser(data);

            if (response?.paymentLink) {
                clearCart();
                const paymentLink = response?.paymentLink;
                window.location.href = paymentLink;
            }
        } catch (error) {
            // Toast("error", "Error", "Please fill up all fields");
            console.error("Form validation failed:", error);
        }
    };

    const handleGetPromoCode = async () => {
        if (promoCode) {
            const res = await handleGetOrderCalculateData(
                deliveryMethod,
                promoCode
            );

            if (res?.status === 201) {
                if (isAuthenticated) {
                    const productMap = cart?.map((product) => ({
                        product: { id: product.product.id },
                        ...(product.productColorId && {
                            productColorId: product.productColorId,
                        }),
                        sellQty: product.sellQty,
                        thumbnailImage: product.thumbnailImage,
                        prescription: product?.prescription,
                    }));

                    const cartData = {
                        customer: {
                            id: user?.id,
                            email: user?.email,
                        },
                        cartDetailsList: [...productMap],
                        promo: {
                            code: promoCode,
                        },
                    };

                    await updateCart(cartData);
                }
            } else {
                setPromoCode("");
            }
        }
    };

    if (isAuthenticated && getCartLoading) {
        return <Spin fullscreen spinning={getCartLoading} />;
    }

    const handlePromoCodeChange = async (e) => {
        const promoCode = e?.target?.value;
        setPromoCode(promoCode);

        if (!promoCode) {
            const res = await handleGetOrderCalculateData(deliveryMethod);

            if (res?.status === 201 && isAuthenticated) {
                handleUpdateCartInBackend();
            }
        }
    };

    // if (
    //   orderLoading ||
    //   cartUpdateLoading ||
    //   settingLoading ||
    //   getCalculationLoading
    // ) {
    //   return (
    //     <Spin
    //       spinning={orderLoading || cartUpdateLoading || settingLoading}
    //       fullscreen
    //     />
    //   );
    // }

    useEffect(() => {
        if (profile) {
            form.setFieldsValue({
                email: profile.email,
                mobileNumber: profile.mobileNumber,
            });
        }
    }, [profile]);

    return (
        <Container>
            <h2 className="text-center font-semibold text-base md:text-base lg:text-2xl">
                Checkout
            </h2>

            <Spin
                spinning={
                    orderLoading ||
                    cartUpdateLoading ||
                    settingLoading ||
                    getCalculationLoading
                }
                fullscreen
            />

            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-12 gap-6 md:gap-[50px] mt-[50px]">
                <div className="col-span-3 md:col-span-3 lg:col-span-2 xl:col-span-7 2xl:col-span-8">
                    <div className="flex flex-col gap-6">
                        {isAuthenticated && (
                            <Form
                                form={form}
                                layout="vertical"
                                className="w-full flex gap-5"
                                initialValues={{
                                    email: profile?.email,
                                    mobileNumber: profile?.mobileNumber, // Adjust key as needed
                                }}
                            >
                                <Form.Item
                                    name="email"
                                    label="Email address"
                                    className="flex-1"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Email address is required.",
                                        },
                                        {
                                            type: "email",
                                            message:
                                                "Please enter a valid email address.",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Enter your email address."
                                        className="h-14"
                                        style={{ fontSize: "16px" }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="mobileNumber"
                                    label="Phone number"
                                    className="flex-1"
                                    rules={[
                                        // { required: true, message: "Phone number is required" },
                                        {
                                            // pattern: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/, // Only for USA
                                            pattern: /^[+\d]?[0-9\s()-]*$/, // for all country
                                            message:
                                                "Please enter a valid US phone number",
                                        },
                                        {
                                            validator: (_, value) =>
                                                value && value.length > 15
                                                    ? Promise.reject(
                                                          new Error(
                                                              "Phone number cannot exceed 15 characters"
                                                          )
                                                      )
                                                    : Promise.resolve(),
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Enter your phone number."
                                        className="h-14"
                                        style={{ fontSize: "16px" }}
                                        maxLength={15}
                                    />
                                </Form.Item>
                            </Form>
                        )}
                        {/* Delivery address */}
                        <div className="bg-[#E5E7EB] px-4 py-6 font-semibold">
                            <h2>Delivery Address</h2>
                        </div>
                        {isAuthenticated ? (
                            <AuthUserAddress
                                setDeliveryAddress={setDeliveryAddress}
                                deliveryAddress={deliveryAddress}
                            />
                        ) : (
                            <Form form={form} layout="vertical">
                                <GuestUserAddressForm />
                            </Form>
                        )}

                        {/* Delivery Method */}
                        <div className="bg-[#E5E7EB] px-4 py-6 font-semibold">
                            <h2>Delivery Method</h2>
                        </div>

                        <Radio.Group
                            onChange={handledeliveryMethodChange}
                            value={deliveryMethod}
                            className="w-full"
                        >
                            <div
                                key={1}
                                className="flex flex-col items-center gap-1 w-full px-4 "
                            >
                                {deliveryMethods?.map((delivery, index) => {
                                    return (
                                        <div
                                            className="py-2 flex items-end gap-2 w-full"
                                            key={index}
                                        >
                                            <Radio
                                                value={delivery.value}
                                                className="mt-1"
                                            />
                                            <div className="flex items-center justify-between w-full">
                                                <h3
                                                    className={`text-[14px]  font-normal ${
                                                        deliveryMethod ===
                                                        delivery?.value
                                                            ? "font-semibold text-[#2A2A2A]"
                                                            : "font-normal text-[#4A4A4A]"
                                                    } `}
                                                >
                                                    {delivery.status}&nbsp;
                                                    <span className="font-normal text-[#9A9A9A] text-[14px]">
                                                        {delivery?.info}
                                                    </span>
                                                </h3>
                                                <h3
                                                    className={`text-lg ${
                                                        deliveryMethod ===
                                                        delivery?.value
                                                            ? "font-semibold text-[#2A2A2A]"
                                                            : "font-normal text-[#4A4A4A]"
                                                    }`}
                                                >
                                                    $ {delivery.price}
                                                </h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Radio.Group>

                        {/* Payment Method */}
                        <div className="bg-[#E5E7EB] px-4 py-6 font-semibold">
                            <h2>Payment Method</h2>
                        </div>

                        <div className="px-4">
                            <Radio
                                value={paymentMetod}
                                className="mt-1"
                                defaultChecked
                            >
                                Stripe
                            </Radio>
                        </div>
                    </div>
                </div>

                <div className="col-span-3 md:col-span-3 lg:col-span-2 xl:col-span-5 2xl:col-span-4 bg-[#FAFBFB] p-3 sm:p-6 md:p-8">
                    <div className="flex flex-col gap-6">
                        {/* Heading */}
                        <div className="flex items-center justify-between">
                            <h1 className="font-bold text-[#262626 text-[20px]">
                                Order Summary
                            </h1>
                            {isAuthenticated ? (
                                <Link
                                    href={"/my-cart"}
                                    className="text-blue-500 font-semibold text-[14px]"
                                >
                                    Edit Order
                                </Link>
                            ) : null}
                        </div>

                        {/* Product list */}
                        {cart?.map((cartItem, index) => {
                            return (
                                <div key={index}>
                                    <CheckoutProductCard
                                        cartInfo={cartItem}
                                        pageCard={false}
                                        showButton={false}
                                    />
                                </div>
                            );
                        })}

                        {/* Summary */}
                        <OrderSummary
                            total={
                                cart?.length > 0
                                    ? calculatedData?.totalProductPriceAfterPromo +
                                      calculatedData?.taxAmount +
                                      calculatedData?.shippingCost
                                    : 0
                            }
                            subTotal={
                                cart?.length > 0
                                    ? calculatedData?.totalProductPrice +
                                      calculatedData?.totalExtraCharge
                                    : 0
                            }
                            taxPercentage={
                                cart?.length > 0
                                    ? calculatedData?.taxPercentage
                                    : 0
                            }
                            taxAmount={
                                cart?.length > 0 ? calculatedData?.taxAmount : 0
                            }
                            shippingCost={
                                cart?.length > 0
                                    ? calculatedData?.shippingCost
                                    : 0
                            }
                            discount={
                                cart?.length > 0
                                    ? calculatedData?.promoDiscountAmount
                                    : 0
                            }
                            fromCartPage={false}
                        />

                        {/* Discount */}
                        <div className="flex flex-col items-start gap-1">
                            <p>Discount code</p>
                            <div className="flex flex-col md:flex-row items-center w-full gap-4 md:gap-2">
                                <Input
                                    className="h-14 w-full flex-1 text-[20px]"
                                    style={{ fontSize: "15px" }}
                                    placeholder="Enter a promo code"
                                    onChange={handlePromoCodeChange}
                                    value={promoCode}
                                />
                                <Button
                                    type="outline"
                                    className={"w-full md:w-[30%]"}
                                    onClick={handleGetPromoCode}
                                    disabled={!promoCode}
                                >
                                    Apply
                                </Button>
                            </div>
                        </div>

                        {/* Note */}
                        <div className="flex flex-col items-start gap-1">
                            <p>Order Note</p>
                            <div className="flex items-center w-full gap-2">
                                <Input.TextArea
                                    rows={4}
                                    className="h-14 w-full flex-1 text-[20px]"
                                    style={{ fontSize: "15px" }}
                                    placeholder="Write your instruction here.."
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setNote(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        {/* Payment button */}
                        <Button
                            type="primary"
                            className={"w-full"}
                            onClick={handleMakeOrder}
                        >
                            Confirm Order
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CheckoutPage;
