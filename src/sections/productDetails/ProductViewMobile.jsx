"use client";

import { Carousel } from "antd";
import { StarRating } from "@/components/ui/star-rating";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { getCookie, hasCookie } from "cookies-next";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Icons from "../../../public/icons";
import Typography from "@/components/Typography";
import Button from "@/components/common/Button";
import CounterBtn from "@/components/common/CounterButton";
import { useWishlist } from "@/contextProviders/useWishListProvider";
import { useUserContext } from "@/contextProviders/userContextProvider";
import { useCart } from "@/contextProviders/useCartContext";
import { useSingleCartProduct } from "@/contextProviders/useSingleCartProductProvider";
import { usePrescription } from "@/contextProviders/usePrescriptionProvider";
import PrescriptionModal from "./PrescriptionModal";
import useGetSize from "@/hooks/singleProduct/useGetSizes";
import useNotification from "@/hooks/useNotification";
import { formatNumber } from "@/utils";
import useGetAverageRating from "@/hooks/singleProduct/useGetAverateRatingInfo";

const ProductViewMobile = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const carouselRef = useRef();

  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);
  const [isClickBuyNow, setIsClickBuyNow] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const {
    addToCart,
    handleUpdateCartInBackend,
    handleGetPriceForSelectedPrescriptions,
  } = useCart();
  const {
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

  const { sizeList, loading: sizeLoading } = useGetSize();
  const { openSuccessNotification } = useNotification();
  const { loading: averageRatingLoading, averageRatingValue } =
    useGetAverageRating(data?.id);

  // const {
  //   checkProductInWishList,
  //   createProductWishlist,
  //   deleteWishlist,
  //   getProductWishlist,
  // } = useWishlistContext();

  const { isAuthenticated } = useUserContext();
  const { isProductInWishlist, makeWishlist, removeWishlist } = useWishlist();
  const searchParams = useSearchParams();

  const images = data?.images?.map((image) => image.image);

  const buildProductStructure = (prescriptionData, prescriptionPrice = 0) => ({
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
  const handleGetPrescriptionInfo = (info) => {
    // auth user and create prescription.
    if (isAuthenticated && isCreatePrescriptionModal) {
      const prescriptionData = { ...info, productSize: selectedSize };

      handleCreatePrescriptionForAuthUser(prescriptionData);
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
      "Product successfully add to cart list."
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

  const handleNextClick = (type) => {
    if (carouselRef && carouselRef.current) {
      if (type === "next") {
        carouselRef.current.next();
      } else {
        carouselRef.current.prev();
      }
    }
  };

  const handleSmallImageClick = (index) => {
    if (carouselRef && carouselRef.current) {
      carouselRef.current.goTo(index);
    }
    setSelectedImageIndex(index);
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
    </div>
  );

  return (
    <LoadingOverlay isLoading={sizeLoading || averageRatingLoading}>
      <div className="w-full py-1">
        <div className="relative w-full">
          <Carousel dots={true} ref={carouselRef}>
            {[data.thumbnailImage, ...images].map((item, index) => (
              <div key={index} className="flex justify-center items-center">
                <Image
                  src={`${item}`}
                  alt="value"
                  width={1000}
                  height={1000}
                  className="xs:w-full h-[408px] sm:h-[500px] md:h-[600px] rounded-sm object-fit"
                />
              </div>
            ))}
          </Carousel>

        <button
          onClick={() => handleNextClick("prev")}
          className="absolute top-1/2 -left-2 p-4 bg-transparent transform -translate-y-1/2"
        >
          <Image
            src={Icons.right_arrow}
            alt="value"
            className="w-8 h-8 rotate-180"
          />
        </button>
        <button
          onClick={() => handleNextClick("next")}
          className="absolute top-1/2 -right-2 p-4 bg-transparent transform -translate-y-1/2"
        >
          <Image src={Icons.right_arrow} alt="value" className="w-8 h-8" />
        </button>
      </div>

      <div
        className={`grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:flex-wrap sm:gap-[13px]`}
      >
        {[data?.thumbnailImage, ...images].map((item, index) => (
          <div
            key={index}
            className={`flex justify-center items-center duration-300 cursor-pointer border ${
              index === selectedImageIndex
                ? "border-magenta-600"
                : "border-neutral-30"
            } p-`}
            onClick={() => handleSmallImageClick(index)}
          >
            <div
              className={`flex items-center justify-center
                 w-full h-full sm:w-[100px] sm:h-[70px] xl:w-[120px] xl:h-[120px]
              `}
            >
              <Image
                src={`${item}`}
                alt="value"
                width={1000}
                height={1000}
                className={`w-full h-full sm:w-[100px] sm:h-[70px] xl:w-full xl:h-full rounded-sm object-fit`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="py-4">
        <div className="flex gap-1">
          {data?.categoryList?.length > 0 &&
            data?.categoryList.map((category, index) => {
              return (
                <Typography.BodyText color="text-font_color_one" key={index}>
                  {category?.name}
                  {data?.categoryList?.length > 1
                    ? data?.categoryList?.length !== index + 1
                      ? ","
                      : null
                    : null}
                </Typography.BodyText>
              );
            })}
        </div>
        <h2 className="text-xl font-medium">{data.name}</h2>

        <div className="flex w-full justify-between">
          <div className="flex gap-x-2.5 items-center">
            <StarRating
              value={averageRatingValue?.averageRating}
              disabled
              allowHalf
              size="w-3 h-3"
            />

            <Typography.BodyText color="text-font_color_one">
              {averageRatingValue?.averageRating}
            </Typography.BodyText>

            <p className="text-[#8790AB] text-sm font-medium">.</p>

            <Typography.BodyText>
              {averageRatingValue?.totalReviewCount}
            </Typography.BodyText>
            <Typography.BodyText color="text-font_color_one">
              reviews
            </Typography.BodyText>
          </div>
        </div>

        <div className="flex flex-col items-start text-center gap-x-2">
          {data?.availableQty === 0 ? (
            <p className="py-1 px-2 bg-red-400 mt-2 text-white font-semibold rounded">
              Out of Stock
            </p>
          ) : (
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex gap-3 items-center justify-center">
                <Typography.Title3>
                  ${formatNumber(calculatePriceForSingleProduct)}
                </Typography.Title3>
                {data?.priceAfterDiscount ? (
                  <Typography.BodyText
                    color="text-font_color_two"
                    className={"line-through"}
                  >
                    ${formatNumber(basePriceWithoutDiscount)}
                  </Typography.BodyText>
                ) : null}

                {data?.discount ? (
                  <Typography.BodyText
                    color="text-font_color_red"
                    weight="semibold"
                  >
                    {data?.discount}% off
                  </Typography.BodyText>
                ) : null}
              </div>

              {/* Wishlist */}
              {isAuthenticated ? wishListUI : null}
            </div>
          )}
        </div>

        {/* Product overview */}
        <div className="flex flex-col mt-6">
          <Typography.BodyText weight="semibold">
            About the Product
          </Typography.BodyText>

          <Typography.BodyText color="text-font_color_three">
            <div dangerouslySetInnerHTML={{ __html: data?.productOverview }} />
          </Typography.BodyText>
        </div>
      </div>

      {/* color and variation select */}
      {data?.colorList?.length > 0 ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col order-2 md:order-1 gap-2">
            <Typography.BodyText className="text-sm font-medium">
              Select Color <span className="text-red-500">*</span>
            </Typography.BodyText>

            <div className="flex gap-x-3">
              {data?.colorList?.map((color, colorIndex) => {
                return color?.color?.active ? (
                  <Popover
                    key={colorIndex}
                    title={null}
                    content={
                      <div className="flex flex-col items-start justify-start gap-1">
                        <p className="text-[#2A2A2A] text-base">
                          Color : {color?.color?.name}
                        </p>
                        <p className="text-red-500">$ ({color?.price})</p>
                      </div>
                    }
                    arrow={false}
                    placement={"bottom"}
                  >
                    <div
                      key={`${color}-${colorIndex}`}
                      className={`${
                        selectedColor?.id === color?.id
                          ? "border-[#3A3A3A] border-opacity-40"
                          : "border-transparent"
                      } border-[3px] rounded-full cursor-pointer`}
                    >
                      <div
                        onClick={() => {
                          handleSelectColor(color);
                        }}
                        className={`w-9 h-9 rounded-full duration-300 bg-red-100`}
                        style={{ backgroundColor: `${color?.color?.value}` }}
                      />
                    </div>
                  </Popover>
                ) : null;
              })}
            </div>
          </div>
        </div>
      ) : null}

      {/* Buttons */}
      <div className="space-y-3 order-2 md:order-1 ">
        <div className="flex flex-col gap-y-3">
          <div className="">
            <CounterBtn
              maxLimit={maxLimit}
              handleCurrentCount={handleCurrentCount}
              disabled={false}
              current={quantity}
            />
            <p className="mt-3 sm:text-sm md:text-[18px] font-medium">
              Total: $ {formatNumber(totalPrice)}
            </p>
          </div>

          <div className="bg-[#EFF5FF] px-6 py-4">
            <p className="font-medium text-[15px]">
              You can customize your lens by adding your prescription here *
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              type="outline"
              onClick={() => {
                setOpenPrescriptionModal(true);
              }}
              disabled={data?.availableQty === 0}
            >
              Add Your Prescription
            </Button>
            <Button
              className={"border"}
              type="primary"
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

export default ProductViewMobile;
