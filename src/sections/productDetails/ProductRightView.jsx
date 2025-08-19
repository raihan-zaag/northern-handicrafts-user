"use client";

import { StarRating } from "@/components/ui/star-rating";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Typography from "@/components/Typography";
import CounterBtn from "@/components/common/CounterButton";
import Button from "@/components/common/Button";
import PrescriptionModal from "./PrescriptionModal";
import { useCart } from "@/contextProviders/useCartContext";
import useNotification from "@/hooks/useNotification";
import { useUserContext } from "@/contextProviders/userContextProvider";
import Image from "next/image";
import { useWishlist } from "@/contextProviders/useWishListProvider";
import { useSingleCartProduct } from "@/contextProviders/useSingleCartProductProvider";
import { usePrescription } from "@/contextProviders/usePrescriptionProvider";
import useGetSize from "@/hooks/singleProduct/useGetSizes";
import useGetAverageRating from "@/hooks/singleProduct/useGetAverateRatingInfo";
import { formatNumber } from "@/utils";
import Icons from "../../../public/icons";

const ProductRightView = ({ forModal = false, data }) => {
    // console.log("data----------", data);

    const router = useRouter();
    const pathname = usePathname();

    const { isProductInWishlist, makeWishlist, removeWishlist } = useWishlist();
    const { sizeList, loading: sizeLoading } = useGetSize();
    const { openSuccessNotification } = useNotification();
    const { loading: averageRatingLoading, averageRatingValue } =
        useGetAverageRating(data?.id);

    const { isAuthenticated } = useUserContext();
    const {
        addToCart,
        handleUpdateCartInBackend,
        handleGetPriceForSelectedPrescriptions,
    } = useCart();
    const {
        setProductData,
        totalPrice,
        quantity,
        selectedColor,
        selectedSize,
        maxLimit,
        calculatePriceForSingleProduct,
        basePriceWithoutDiscount,
        setQuantity,
        handleCurrentCount,
        setSelectedColor,
        setSelectedSize,
        handleSelectColor,
        handleSizeChange,
        handleResetPriceAfterAddToCart,
    } = useSingleCartProduct();
    const {
        isCreatePrescriptionModal,
        setIsSelectPrescription,
        setIsCreatePrescriptionModal,
        handleCreatePrescriptionForAuthUser,
    } = usePrescription();

    useEffect(() => {
        setProductData(data);

        return () => {
            setSelectedColor("");
            setSelectedSize("");
            setProductData("");
        };
    }, [data]);

    const [isClickBuyNow, setIsClickBuyNow] = useState(false);
    const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);

    const buildProductStructure = (
        prescriptionData,
        prescriptionPrice = 0
    ) => ({
        product: { id: data?.id },
        ...(selectedColor?.id && { productColorId: Number(selectedColor?.id) }),
        ...(selectedColor?.color?.name && {
            productColor: selectedColor?.color?.name,
        }),
        sellQty: Number(quantity),
        thumbnailImage: data?.thumbnailImage,
        prescription: {
            ...prescriptionData,
        },
        productName: data?.name,
        productPrice:
            (calculatePriceForSingleProduct + prescriptionPrice) * quantity,
        singleProductPrice: calculatePriceForSingleProduct + prescriptionPrice,
        totalQuantity: data?.availableQty,
        productBasePrice: data?.priceAfterDiscount ?? data?.regularPrice,
        uid: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    });

    const handleAddToCart = (prescriptionInformation, prescriptionPrice) => {
        const productStructure = buildProductStructure(
            prescriptionInformation,
            prescriptionPrice
        );

        addToCart(productStructure);

        openSuccessNotification(
            "success",
            "Product successfully add to cart list."
        );
    };

    // fire after click buy now button
    // It execute after 10 milisecond cause cart update in localstorage.
    // localstorate operation is too slow
    const handleClickBuyNowButton = () => {
        setTimeout(() => {
            if (isAuthenticated) {
                // handleUpdateCartInBackend();
                router.push("/checkout");
            } else {
                router.push("/login?redirect=/checkout");
            }

            setIsClickBuyNow(false);
        }, 100);
    };

    // Fire click confirm button in prescription modal
    // make product with prescription data
    // auth user if prescription exist then give an error, don't add prodict add to cart as well. (Momo)

    const handleGetPrescriptionInfo = async (info) => {
        // auth user and create prescription.
        if (isAuthenticated && isCreatePrescriptionModal) {
            const prescriptionData = { ...info, productSize: selectedSize };

            const res = await handleCreatePrescriptionForAuthUser(
                prescriptionData
            );
            if (res?.status === 400) {
                return;
            }
        }

        const prescriptionPrice = handleGetPriceForSelectedPrescriptions(info);

        // handleAddToCart(info, prescriptionPrice);
        const productStructure = buildProductStructure(info, prescriptionPrice);

        addToCart(productStructure);

        openSuccessNotification(
            "success",
            "Product successfully add to cart list."
        );
        handleClosePrescriptionModal();

        if (isClickBuyNow) {
            handleClickBuyNowButton();
        }
    };

    //Fire When user click in skip button in prescription form.
    // make product without prescription data
    const handleSkipAddPrescription = () => {
        const productStructure = buildProductStructure(
            {
                productSize: selectedSize,
            },
            0
        );

        addToCart(productStructure);
        openSuccessNotification(
            "success",
            "Product added to cart successfully."
        );

        handleClosePrescriptionModal();

        if (isClickBuyNow) {
            handleClickBuyNowButton();
        }
    };

    // State reset function
    const handleClosePrescriptionModal = () => {
        // console.log("hi", sizeList[0], data, sizeList[0]);
        setOpenPrescriptionModal(false);

        // setSelectedColor(data?.colorList?.[0]);
        setSelectedSize(sizeList[0]?.value);
        handleSizeChange(sizeList[0]);
        handleResetPriceAfterAddToCart();

        if (data?.colorList?.length > 0) {
            const activeColors = data?.colorList
                .filter((item) => item.color.active)
                .map((item) => item);

            setSelectedColor(activeColors[0]);
            handleSelectColor(activeColors[0]);
        }

        handleCurrentCount(1);
        setQuantity(1);

        setIsSelectPrescription(false);
        setIsCreatePrescriptionModal(false);
    };

    // if User login then this UI appear
    const wishListUI = isProductInWishlist(data?.id) ? (
        <div className="flex items-center justify-center gap-1">
            <button
                className="p-1"
                onClick={() => {
                    removeWishlist(data?.id);
                }}
            >
                <Image
                    src={Icons.active_wishlist}
                    alt="Add to Wishlist"
                    className="h-6 w-6"
                    height={1000}
                    width={1000}
                />
            </button>
            <p className=" text-red-500 font-medium">Wishlisted</p>
        </div>
    ) : (
        <div className="flex items-center justify-center gap-1">
            <button
                className="p-1"
                onClick={() => {
                    makeWishlist(data?.id);
                }}
            >
                <Image
                    src={Icons.inactive_wishlist}
                    alt="remove from Wishlist"
                    className="h-6 w-6"
                    height={1000}
                    width={1000}
                />
            </button>
            <p className="">Wishlist</p>
        </div>
    );

    return (
        <LoadingOverlay isLoading={sizeLoading || averageRatingLoading}>
            <div className={`${forModal ? "" : ""}  w-full `}>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                        {data?.categoryList?.length > 0 &&
                            data?.categoryList.map((category, index) => {
                                return (
                                    <Typography.BodyText
                                        color="text-font_color_one"
                                    key={index}
                                >
                                    {category?.name}
                                    {data?.categoryList?.length > 1
                                        ? data?.categoryList?.length !==
                                          index + 1
                                            ? ","
                                            : null
                                        : null}
                                </Typography.BodyText>
                            );
                        })}
                </div>

                <h2 className="text-xl font-medium">{data.name}</h2>
            </div>

            {/* Rating  info */}
            <div className="flex w-full justify-between">
                <div className="flex gap-x-2.5 items-center">
                    <StarRating
                        value={averageRatingValue?.averageRating}
                        disabled
                        allowHalf
                        size="w-3 h-3"
                    />

                    <Typography.BodyText
                        color="text-primary"
                        weight={"semibold"}
                    >
                        {averageRatingValue?.averageRating}
                    </Typography.BodyText>

                    <p className="text-gray-blue text-sm font-medium">.</p>

                    <Typography.BodyText
                        color="text-primary"
                        weight={"semibold"}
                    >
                        {averageRatingValue?.totalReviewCount}
                    </Typography.BodyText>
                    <Typography.BodyText
                        color="text-font_color_one"
                        weight={"normal"}
                    >
                        reviews
                    </Typography.BodyText>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {/* price info */}
                <div className="flex flex-row items-center justify-between text-center mt-3">
                    {data?.availableQty === 0 ? (
                        <p className="py-1 px-2 bg-red-400  text-white font-semibold rounded ">
                            Out of Stock
                        </p>
                    ) : (
                        <div className="flex gap-3 items-center justify-center">
                            <Typography.Title3>
                                ${formatNumber(calculatePriceForSingleProduct)}
                            </Typography.Title3>
                            {data?.priceAfterDiscount ? (
                                <p className={"line-through text-font_color_two text-18px md:text-xl2"}>
                                    ${formatNumber(basePriceWithoutDiscount)}
                                </p>
                            ) : null}

                            {data?.discount ? (
                                <p
                                    color="text-font_color_red"
                                    weight="semibold"
                                    className={
                                        "text-xs sm:text-sm md:text-2xl text-font_color_red font-semibold"
                                    }
                                >
                                    {data?.discount}% off
                                </p>
                            ) : null}
                        </div>
                    )}

                    {isAuthenticated ? wishListUI : null}
                </div>

                {/* Product overview */}
                <div className="flex flex-col">
                    <Typography.BodyText weight="semibold">
                        About the Product
                    </Typography.BodyText>

                    <Typography.BodyText color="text-font_color_three">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: data?.productOverview,
                            }}
                        />
                    </Typography.BodyText>
                </div>

                {/* color info */}
                {data?.colorList?.length > 0 ? (
                    <div className="flex flex-col gap-y-2">
                        <Typography.BodyText className="text-sm font-medium">
                            Select Color <span className="text-red-500">*</span>
                        </Typography.BodyText>

                        <div className="flex gap-x-3">
                            {data?.colorList?.map((color, colorIndex) => {
                                return color?.color?.active ? (
                                    <Popover key={`${color}-${colorIndex}`}>
                                        <PopoverTrigger asChild>
                                            <div
                                                className={`${
                                                    selectedColor?.id === color?.id
                                                          ? "border-gray-dark2 border-opacity-40"
                                                        : "border-transparent"
                                                } border-2 rounded-full cursor-pointer`}
                                            >
                                                <div
                                                    onClick={() => {
                                                        handleSelectColor(color);
                                                    }}
                                                    className={`w-9 h-9 rounded-full duration-300 bg-red-100`}
                                                    style={{
                                                        backgroundColor: `${color?.color?.value}`,
                                                    }}
                                                />
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-3">
                                            <div className="flex flex-col items-start justify-start gap-1">
                                                <p className="text-gray-dark text-base">
                                                    Color : {color?.color?.name}
                                                </p>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                ) : null;
                            })}
                        </div>
                    </div>
                ) : null}

                {/* Product Quantity and prescription , addToCart button */}
                <div className="flex flex-col gap-y-3 mt-4">
                    <div className="flex flex-col gap-2 pb-6">
                        <Typography.BodyText className="text-sm font-medium">
                            Select Quantity{" "}
                            <span className="text-red-500">*</span>
                        </Typography.BodyText>
                        <CounterBtn
                            maxLimit={maxLimit}
                            handleCurrentCount={handleCurrentCount}
                            disabled={false}
                            current={quantity}
                        />

                        <p className="mt-3 sm:text-sm md:text-18px font-medium">
                            Total: ${" "}
                            {(
                                formatNumber(calculatePriceForSingleProduct) *
                                quantity
                            ).toFixed(2)}
                        </p>
                    </div>

                    <div className="bg-light-blue-bg px-6 py-4">
                        <p className="font-medium text-base">
                            You can customize your lens by adding your
                            prescription here *
                        </p>
                    </div>

                    <div className={`w-full flex gap-3`}>
                        <Button
                            type="outline"
                            className={"w-full"}
                            onClick={() => {
                                setOpenPrescriptionModal(true);
                            }}
                            disabled={data?.availableQty === 0}
                        >
                            Add Your Prescription
                        </Button>
                        <Button
                            type="primary"
                            className={"w-full"}
                            onClick={() => {
                                // setOpenPrescriptionModal(true);
                                // setIsClickBuyNow(true);
                                handleSkipAddPrescription();
                            }}
                            disabled={data?.availableQty === 0}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>

            {openPrescriptionModal && (
                <PrescriptionModal
                    open={openPrescriptionModal}
                    mode={"create"}
                    prescriptionInfo={{}}
                    handleSetPrescriptionInfo={handleGetPrescriptionInfo}
                    handleModalOpenClose={handleClosePrescriptionModal}
                    handleSkipAddPrescription={handleSkipAddPrescription}
                />
            )}
            </div>
        </LoadingOverlay>
    );
};

export default ProductRightView;
