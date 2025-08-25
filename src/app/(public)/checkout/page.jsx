"use client";

import { useEffect, useState } from "react";
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
import Container from "@/common/components/shared/Container";
import { Button } from "@/common/components";
import { formatNumber } from "@/common/lib/utils";

// Section Header Component
const SectionHeader = ({ title }) => (
    <div className="bg-[var(--color-surface)] px-6 py-4 rounded-xl">
        <h2 className="text-[var(--color-text-primary)] font-semibold text-[15px]">
            {title}
        </h2>
    </div>
);

// Section Container Component  
const SectionContainer = ({ children, className = "" }) => (
    <div className={`bg-white rounded-b-xl border border-[var(--color-border)] ${className}`}>
        {children}
    </div>
);

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
                        form.setValue("promoCode", res.promo.code);
                        handleGetOrderCalculateData(
                            deliveryMethod,
                            res?.promo?.code
                        );
                    } else {
                        form.setValue("promoCode", "");
                    }
                } catch (error) {
                    console.error("Failed to fetch cart list:", error);
                }
            };

            fetchData();
        }
    }, [isAuthenticated, deliveryMethod, getCartListForAuthUser, handleGetOrderCalculateData, form]);

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
    }, [deliveryMethod, cart?.length, handleGetOrderCalculateData]);

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

    const handleRemovePromoCode = async () => {
        form.setValue("promoCode", "");
        
        // Recalculate order without promo code
        const res = await handleGetOrderCalculateData(deliveryMethod);

        if (res?.status === 201 && isAuthenticated) {
            // Update cart in backend without promo code
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
                // No promo code included
            };

            await updateCart(cartData);
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
                <div className="px-4 md:px-8 lg:px-24 xl:px-[120px] py-12">
                    <h2 className="text-center font-semibold text-base md:text-lg lg:text-2xl mb-12">
                        Checkout
                    </h2>

                    <Form {...form}>
                        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                            {/* Left Column - Forms */}
                            <div className="flex-1 lg:max-w-[636px] space-y-6">
                                {/* Delivery Information Section */}
                                <div className="space-y-2">
                                    <SectionHeader title="Delivery Information" />
                                    <SectionContainer className="p-6">
                                        <div className="space-y-5">
                                            {/* Contact Information for Auth Users */}
                                            {isAuthenticated && (
                                                <div className="flex gap-5">
                                                    <FormField
                                                        control={form.control}
                                                        name="fullName"
                                                        render={({ field }) => (
                                                            <FormItem className="flex-1">
                                                                <FormLabel className="text-sm font-medium text-[var(--color-text-primary)]">
                                                                    Full Name
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Mr Smith"
                                                                        className="h-12 text-sm bg-[var(--color-surface)] border-[var(--color-border)] rounded-xl"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            )}

                                            <div className="flex gap-5">
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormLabel className="text-sm font-medium text-[var(--color-text-primary)]">
                                                                Email Address
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="mrsmith@mail.com"
                                                                    className="h-12 text-sm bg-[var(--color-surface)] border-[var(--color-border)] rounded-xl"
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
                                                            <FormLabel className="text-sm font-medium text-[var(--color-text-primary)]">
                                                                Phone Number
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="+116556156"
                                                                    className="h-12 text-sm bg-[var(--color-surface)] border-[var(--color-border)] rounded-xl"
                                                                    maxLength={15}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {/* Delivery Address */}
                                            <div className="space-y-2">
                                                <FormLabel className="text-sm font-medium text-[var(--color-text-primary)]">
                                                    Delivery Address
                                                </FormLabel>
                                                {isAuthenticated ? (
                                                    <AuthUserAddress
                                                        setDeliveryAddress={setDeliveryAddress}
                                                        deliveryAddress={deliveryAddress}
                                                    />
                                                ) : (
                                                    <GuestUserAddressForm />
                                                )}
                                            </div>
                                        </div>
                                    </SectionContainer>
                                </div>

                                {/* Delivery Method Section */}
                                <div className="space-y-2">
                                    <SectionHeader title="Delivery Method" />
                                    <SectionContainer>
                                        <FormField
                                            control={form.control}
                                            name="deliveryMethod"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={(value) => {
                                                                field.onChange(value);
                                                                handledeliveryMethodChange({ target: { value } });
                                                            }}
                                                            value={field.value}
                                                            className="flex flex-col w-full"
                                                        >
                                                            {deliveryMethods?.map((delivery, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`flex items-center justify-between p-4 border-b last:border-b-0 ${
                                                                        field.value === delivery?.value
                                                                            ? "bg-[#EBEDF0]"
                                                                            : "bg-[#F5F7FA]"
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <RadioGroupItem
                                                                            value={delivery.value}
                                                                            id={`delivery-${index}`}
                                                                            className="w-5 h-5"
                                                                        />
                                                                        <div className="flex items-center gap-2">
                                                                            <label
                                                                                htmlFor={`delivery-${index}`}
                                                                                className={`text-sm cursor-pointer ${
                                                                                    field.value === delivery?.value
                                                                                        ? "font-semibold text-[var(--color-text-primary)]"
                                                                                        : "font-normal text-[var(--color-text-secondary)]"
                                                                                }`}
                                                                            >
                                                                                {delivery.status}
                                                                            </label>
                                                                            <span className="text-sm text-[var(--color-text-subtle)]">
                                                                                {delivery?.info}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <span
                                                                        className={`text-sm ${
                                                                            field.value === delivery?.value
                                                                                ? "font-semibold text-[var(--color-text-primary)]"
                                                                                : "font-normal text-[var(--color-text-secondary)]"
                                                                        }`}
                                                                    >
                                                                        $ {delivery.price}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </SectionContainer>
                                </div>

                                {/* Payment Method Section */}
                                <div className="space-y-2">
                                    <SectionHeader title="Payment Method" />
                                    <SectionContainer>
                                        <FormField
                                            control={form.control}
                                            name="paymentMethod"
                                            render={({ field }) => (
                                                <FormItem className="p-4">
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                            className="flex flex-col gap-2"
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <RadioGroupItem value="stripe" id="stripe" className="w-5 h-5" />
                                                                <Label 
                                                                    htmlFor="stripe" 
                                                                    className="text-sm font-medium text-[var(--color-text-secondary)] cursor-pointer"
                                                                >
                                                                    Stripe
                                                                </Label>
                                                            </div>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </SectionContainer>
                                </div>
                            </div>

                            {/* Right Column - Order Summary */}
                            <div className="w-full lg:w-[400px] bg-[var(--color-background)] rounded-xl p-8 border border-[var(--color-border)] h-fit">
                                <div className="space-y-6">
                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <h1 className="font-bold text-[var(--color-text-primary)] text-xl">
                                            Order Summary
                                        </h1>
                                        {isAuthenticated && (
                                            <Link
                                                href={"/my-cart"}
                                                className="text-[var(--color-primary)] font-semibold text-sm"
                                            >
                                                Edit Order
                                            </Link>
                                        )}
                                    </div>

                                    {/* Product List */}
                                    <div className="space-y-5">
                                        {cart?.map((cartItem, index) => (
                                            <div key={index} className="pb-5 border-b border-[var(--color-border)] last:border-b-0">
                                                <CheckoutProductCard
                                                    cartInfo={cartItem}
                                                    pageCard={false}
                                                    showButton={false}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Summary */}
                                    <div className="space-y-3 py-4 border-y border-[var(--color-border)]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-[var(--color-text-primary)]">
                                                Sub total ({cart?.length} items)
                                            </span>
                                            <span className="text-sm font-medium text-[var(--color-text-primary)]">
                                                $ {formatNumber(
                                                    cart?.length > 0
                                                        ? calculatedData?.totalProductPrice + calculatedData?.totalExtraCharge
                                                        : 0
                                                )}
                                            </span>
                                        </div>
                                        
                                        {calculatedData?.promoDiscountAmount > 0 && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-[var(--color-text-secondary)]">Discount</span>
                                                <span className="text-sm text-red-500 font-medium">
                                                    - $ {formatNumber(calculatedData?.promoDiscountAmount)}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex justify-between items-center pt-3 border-t border-[var(--color-border)]">
                                            <span className="text-sm font-medium text-[var(--color-text-primary)]">Total Price</span>
                                            <span className="text-sm font-medium text-[var(--color-text-primary)]">
                                                $ {formatNumber(
                                                    cart?.length > 0
                                                        ? calculatedData?.totalProductPriceAfterPromo
                                                        : 0
                                                )}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-[var(--color-text-secondary)]">Tax ({calculatedData?.taxPercentage || 0}%)</span>
                                            <span className="text-sm text-[var(--color-text-secondary)]">
                                                $ {formatNumber(cart?.length > 0 ? calculatedData?.taxAmount : 0)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-[var(--color-text-secondary)]">Shipping cost</span>
                                            <span className="text-sm text-[var(--color-text-secondary)]">
                                                $ {formatNumber(cart?.length > 0 ? calculatedData?.shippingCost : 0)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Final Total */}
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-lg font-semibold text-[var(--color-text-primary)]">
                                            Final Order Price
                                        </span>
                                        <span className="text-lg font-semibold text-[var(--color-primary)]">
                                            $ {formatNumber(
                                                cart?.length > 0
                                                    ? calculatedData?.totalProductPriceAfterPromo +
                                                      calculatedData?.taxAmount +
                                                      calculatedData?.shippingCost
                                                    : 0
                                            )}
                                        </span>
                                    </div>

                                    {/* Discount Code */}
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-[var(--color-text-primary)]">Discount code</p>
                                        {calculatedData?.promoDiscountAmount > 0 && form.watch("promoCode") ? (
                                            // Applied Promo Code Display
                                            <div className="flex items-center justify-between h-12 px-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
                                                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                                                    {form.watch("promoCode")}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={handleRemovePromoCode}
                                                    className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ) : (
                                            // Promo Code Input
                                            <div className="flex gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="promoCode"
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl>
                                                                <Input
                                                                    className="h-12 text-sm bg-[var(--color-surface)] border-[var(--color-border)] rounded-xl"
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
                                                    type="button"
                                                    variant="outline"
                                                    className="px-6 h-12 rounded-xl border-[var(--color-border)]"
                                                    onClick={handleGetPromoCode}
                                                    disabled={!form.watch("promoCode")}
                                                >
                                                    Apply
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Order Note */}
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-[var(--color-text-primary)]">
                                            Order Note (Optional)
                                        </p>
                                        <FormField
                                            control={form.control}
                                            name="orderNote"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea
                                                            rows={4}
                                                            className="text-sm bg-white border-[var(--color-border)] rounded-xl resize-none"
                                                            placeholder="Write your instructions here.."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Confirm Order Button */}
                                    <Button
                                        type="button"
                                        className="w-full h-12 bg-[var(--color-primary)] text-white font-semibold rounded-xl hover:bg-[var(--color-primary)]/90"
                                        onClick={handleMakeOrder}
                                    >
                                        Confirm Order
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </Container>
        </LoadingOverlay>
    );
};

export default CheckoutPage;
