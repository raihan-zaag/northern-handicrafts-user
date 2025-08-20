"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoadingOverlay } from "@/common/components/ui/loading-overlay";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/common/components/ui/radio-group";
import { Label } from "@/common/components/ui/label";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/common/components/ui/form";
import Link from "next/link";

import Button from "@/common/components/common/Button";
import Container from "@/common/components/common/Container";
import { useCart } from "@/contextProviders/useCartContext";
import { useUserContext } from "@/contextProviders/userContextProvider";
import useGetDefaultSettings from "@/app/(public)/checkout/hooks/useGetSettingsInfo";
import useCreateOrder from "@/app/(public)/orders/hooks/useMakeOrder";
import AuthUserAddress from "@/app/(public)/checkout/sections/AuthUserAddress";
import CheckoutProductCard from "./components/CheckoutProductCart";
import useNotification from "@/common/hooks/useNotification";
import useUpdateCart from "@/app/(public)/cart/hooks/useCartUpdate";
import GuestUserAddressForm from "@/sections/checkout/GuestUserAddressForm";
import useGetUserProfile from "@/app/(auth)/hooks/useGetUserInfo";
import OrderSummary from "@/sections/orderSummary/OrderSummary";

// Checkout form schema with dynamic validation
const createCheckoutSchema = (isAuthenticated) => {
    const baseSchema = {
        email: z
            .string()
            .min(1, "Email is required")
            .email("Please enter a valid email address"),
        mobileNumber: z
            .string()
            .min(1, "Mobile number is required")
            .regex(/^[0-9+\-\s()]+$/, "Please enter a valid mobile number"),
        deliveryMethod: z.enum(["STANDARD", "EXPRESS"], {
            required_error: "Please select a delivery method",
        }),
        paymentMethod: z.literal("stripe"),
        promoCode: z.string().optional(),
        orderNote: z.string().optional(),
    };

    // Add guest user address validation only for non-authenticated users
    if (!isAuthenticated) {
        return z.object({
            ...baseSchema,
            fullName: z.string().min(1, "Full name is required"),
            country: z.string().min(1, "Country is required"),
            state: z.string().min(1, "District/State is required"),
            city: z.string().min(1, "City/Area is required"),
            zipCode: z.string().min(1, "ZIP/Postal code is required"),
            street: z.string().min(1, "Street address is required"),
        });
    }

    return z.object(baseSchema);
};

const CheckoutPage = () => {
    const [deliveryAddress, setDeliveryAddress] = useState();
    const { isAuthenticated, user } = useUserContext();

    const form = useForm({
        resolver: zodResolver(createCheckoutSchema(isAuthenticated)),
        defaultValues: {
            email: "",
            mobileNumber: "",
            deliveryMethod: "STANDARD",
            paymentMethod: "stripe",
            promoCode: "",
            orderNote: "",
            // Guest user address defaults
            fullName: "",
            country: "",
            state: "",
            city: "",
            zipCode: "",
            street: "",
        },
    });

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
    const { profile } = useGetUserProfile();
    const { createOrder, loading: orderLoading } = useCreateOrder();
    const { updateCart, loading: cartUpdateLoading } = useUpdateCart();
    const { configData, loading: settingLoading } = useGetDefaultSettings();
    const { openInfoNotification } = useNotification();

    // Get current delivery method value from form
    const deliveryMethod = form.watch("deliveryMethod");

    const handledeliveryMethodChange = (value) => {
        form.setValue("deliveryMethod", value);
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
            info: configData?.standardDeliveryTime
                ? `(${configData.standardDeliveryTime})`
                : "(3-5 business days)",
            value: "STANDARD",
            price: configData?.standardDeliveryPrice ?? 0,
        },
        {
            status: "Express delivery",
            info: configData?.expressDeliveryTime
                ? `(${configData.expressDeliveryTime})`
                : "(Within 24 hours)",
            value: "EXPRESS",
            price: configData?.expressDeliveryPrice ?? 0,
        },
    ];


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
            const formData = form.getValues();
            const isValid = await form.trigger(["email", "mobileNumber"]);

            if (!isValid) {
                return;
            }

            const data = {
                customer: {
                    id: Number(user?.id),
                    email: formData.email,
                    mobileNumber: formData.mobileNumber,
                },
                savedAddress: {
                    id: Number(deliveryAddress?.id),
                },
                orderNote: formData.orderNote,
                deliveryMethod: formData.deliveryMethod,
            };

            const res = await createOrder(data);

            if (res?.paymentLink) {
                clearCart();
                const paymentLink = res?.paymentLink;
                window.location.href = paymentLink;
            }
        } else {
            handleFormFinish();
        }
    };

    // order for guest user
    const handleFormFinish = async () => {
        const formData = form.getValues();
        const isValid = await form.trigger();

        if (!isValid) {
            return;
        }

        try {
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
                deliveryMethod: formData.deliveryMethod,
                ...(formData.orderNote && { orderNote: formData.orderNote }),
                ...(formData.promoCode && { promo: { code: formData.promoCode } }),
            };

            const response = await handleMakeOrderForGuestUser(data);

            if (response?.paymentLink) {
                clearCart();
                const paymentLink = response?.paymentLink;
                window.location.href = paymentLink;
            }
        } catch (error) {
            console.error("Form validation failed:", error);
        }
    };

    const handleGetPromoCode = async () => {
        const currentPromoCode = form.getValues("promoCode");
        if (currentPromoCode) {
            const res = await handleGetOrderCalculateData(
                deliveryMethod,
                currentPromoCode
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
                            code: currentPromoCode,
                        },
                    };

                    await updateCart(cartData);
                }
            } else {
                form.setValue("promoCode", "");
            }
        }
    };

    const handlePromoCodeChange = async (value) => {
        form.setValue("promoCode", value);

        if (!value) {
            const res = await handleGetOrderCalculateData(deliveryMethod);

            if (res?.status === 201 && isAuthenticated) {
                handleUpdateCartInBackend();
            }
        }
    };

    useEffect(() => {
        if (profile) {
            form.setValue("email", profile.email);
            form.setValue("mobileNumber", profile.mobileNumber);
        }
    }, [profile, form]);

    return (
        <LoadingOverlay
            isLoading={
                (isAuthenticated && getCartLoading) ||
                orderLoading ||
                cartUpdateLoading ||
                settingLoading ||
                getCalculationLoading
            }
        >
            <Container>
                <h2 className="text-center font-semibold text-base md:text-base lg:text-2xl">
                    Checkout
                </h2>

                <Form {...form}>
                    <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-12 gap-6 md:gap-12 mt-12">
                        <div className="col-span-3 md:col-span-3 lg:col-span-2 xl:col-span-7 2xl:col-span-8">
                            <div className="flex flex-col gap-6">
                                {isAuthenticated && (
                                    <div className="bg-neutral-200 px-4 py-6 font-semibold">
                                        <h2>Contact Information</h2>
                                    </div>
                                )}
                                {isAuthenticated && (
                                    <div className="w-full flex gap-5 px-4 py-6">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormLabel>Email address</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter your email address"
                                                            className="h-14 text-base"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="mobileNumber"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormLabel>Phone number</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter your phone number"
                                                            className="h-14 text-base"
                                                            maxLength={15}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                                {/* Delivery address */}
                                <div className="bg-neutral-200 px-4 py-6 font-semibold">
                                    <h2>Delivery Address</h2>
                                </div>
                                {isAuthenticated ? (
                                    <AuthUserAddress
                                        setDeliveryAddress={setDeliveryAddress}
                                        deliveryAddress={deliveryAddress}
                                    />
                                ) : (
                                    <GuestUserAddressForm />
                                )}

                                {/* Delivery Method */}
                                <div className="bg-neutral-200 px-4 py-6 font-semibold">
                                    <h2>Delivery Method</h2>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="deliveryMethod"
                                    render={({ field }) => (
                                        <FormItem className="w-full px-4">
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        handledeliveryMethodChange({ target: { value } });
                                                    }}
                                                    value={field.value}
                                                    className="flex flex-col gap-1 w-full"
                                                >
                                                    {deliveryMethods?.map((delivery, index) => (
                                                        <div
                                                            className="py-2 flex items-end gap-2 w-full"
                                                            key={index}
                                                        >
                                                            <RadioGroupItem
                                                                value={delivery.value}
                                                                id={`delivery-${index}`}
                                                                className="mt-1"
                                                            />
                                                            <div className="flex items-center justify-between w-full">
                                                                <label
                                                                    htmlFor={`delivery-${index}`}
                                                                    className={`text-sm cursor-pointer ${field.value === delivery?.value
                                                                        ? "font-semibold text-gray-dark"
                                                                        : "font-normal text-gray-medium"
                                                                        }`}
                                                                >
                                                                    {delivery.status}&nbsp;
                                                                    <span className="font-normal text-gray text-sm">
                                                                        {delivery?.info}
                                                                    </span>
                                                                </label>
                                                                <h3
                                                                    className={`text-lg ${field.value === delivery?.value
                                                                        ? "font-semibold text-gray-dark"
                                                                        : "font-normal text-gray-medium"
                                                                        }`}
                                                                >
                                                                    $ {delivery.price}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Payment Method */}
                                <div className="bg-neutral-200 px-4 py-6 font-semibold">
                                    <h2>Payment Method</h2>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="paymentMethod"
                                    render={({ field }) => (
                                        <FormItem className="px-4">
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="flex flex-col gap-2"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="stripe" id="stripe" />
                                                        <Label htmlFor="stripe">Stripe</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="col-span-3 md:col-span-3 lg:col-span-2 xl:col-span-5 2xl:col-span-4 bg-secondary p-3 sm:p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                {/* Heading */}
                                <div className="flex items-center justify-between">
                                    <h1 className="font-bold text-dark text-18px">
                                        Order Summary
                                    </h1>
                                    {isAuthenticated ? (
                                        <Link
                                            href={"/my-cart"}
                                            className="text-blue font-semibold text-sm"
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
                                        <FormField
                                            control={form.control}
                                            name="promoCode"
                                            render={({ field }) => (
                                                <FormItem className="w-full flex-1">
                                                    <FormControl>
                                                        <Input
                                                            className="h-14 w-full text-base"
                                                            placeholder="Enter a promo code"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e.target.value);
                                                                handlePromoCodeChange(e.target.value);
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="outline"
                                            className={"w-full md:w-1/3"}
                                            onClick={handleGetPromoCode}
                                            disabled={!form.watch("promoCode")}
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                </div>

                                {/* Note */}
                                <div className="flex flex-col items-start gap-1">
                                    <p>Order Note</p>
                                    <FormField
                                        control={form.control}
                                        name="orderNote"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormControl>
                                                    <Textarea
                                                        rows={4}
                                                        className="w-full text-base"
                                                        placeholder="Write your instruction here.."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
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
                </Form>
            </Container>
        </LoadingOverlay>
    );
};

export default CheckoutPage;
