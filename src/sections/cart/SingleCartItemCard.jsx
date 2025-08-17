"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CounterBtn from "@/components/common/CounterButton";
import { useCart } from "@/contextProviders/useCartContext";
import { IoAddOutline } from "react-icons/io5";
import useNotification from "@/hooks/useNotification";
import PriceBreakdown from "../Checkout/PriceBreakdown";
import { Popover, Spin } from "antd";
import { MdOutlineEdit } from "react-icons/md";
import { formatNumber } from "@/utils";
import useGetSize from "@/hooks/singleProduct/useGetSizes";
import { useSingleCartProduct } from "@/contextProviders/useSingleCartProductProvider";
import { usePrescription } from "@/contextProviders/usePrescriptionProvider";
import { useUserContext } from "@/contextProviders/userContextProvider";
import Icons from "../../../public/icons";
import PrescriptionModal from "../productDetails/PrescriptionModal";

function SingleCartItemCard({
  cartInfo,
  pageCard = false,
  showButton = true,
  getUpdateedCalculation,
}) {
  const [quantity, setQuantity] = useState(cartInfo?.sellQty || 1);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [productPrice, setProductPrice] = useState(cartInfo?.productPrice);

  const { openSuccessNotification } = useNotification();

  const { loading: sizeLoading, sizeList } = useGetSize();

  const {
    removeFromCart,
    updateCartItem,
    handleGetPriceForSelectedPrescriptions,
    handleGetOrderCalculateData,
  } = useCart();
  const { setSelectedSize } = useSingleCartProduct();
  const {
    setIsCreatePrescriptionModal,
    isCreatePrescriptionModal,
    handleCreatePrescriptionForAuthUser,
  } = usePrescription();
  const { isAuthenticated } = useUserContext();

  const handleCurrentCount = async (val) => {
    setQuantity(val);

    // lense index price
    const lense_index_price = sizeList?.find(
      (size) => size?.value === cartInfo?.prescription?.productSize
    )?.price;

    // total prescription item price
    const prescriptionPrice = handleGetPriceForSelectedPrescriptions(
      cartInfo?.prescription
    );

    const _price =
      (cartInfo?.productBasePrice + lense_index_price + prescriptionPrice) *
      val;

    setProductPrice(_price);

    const _updateData = { productPrice: _price, sellQty: val };
    await updateCartItem(cartInfo?.uid, _updateData);

    if (pageCard) {
      await getUpdateedCalculation();
    }
  };

  const isPrescriptionEmpty = () => {
    return Object.keys(cartInfo?.prescription).length === 1;
  };

  const handleOpenClosePrescriptionModal = () => {
    setSelectedSize(sizeList[0]?.value);
    setIsPrescriptionModalOpen(!isPrescriptionModalOpen);
  };

  // Update local states when cartInfo changes
  useEffect(() => {
    if (cartInfo) {
      setQuantity(cartInfo?.sellQty || 1);
      setProductPrice(cartInfo?.productPrice || 0);
    }
  }, [cartInfo]);

  const handleUpdatePrescription = async (prescriptionInfo) => {
    const lense_index_price =
      sizeList?.find((size) => size?.value === prescriptionInfo?.productSize)
        ?.price || 0;

    const prescriptionPrice =
      handleGetPriceForSelectedPrescriptions(prescriptionInfo);

    const _updateData = {
      prescription: prescriptionInfo,
      productPrice: formatNumber(
        (cartInfo?.productBasePrice + prescriptionPrice + lense_index_price) *
          quantity
      ),
    };

    if (isAuthenticated && isCreatePrescriptionModal) {
      const prescriptionData = {
        ...prescriptionInfo,
        productSize: prescriptionInfo?.productSize,
      };

      const res = await handleCreatePrescriptionForAuthUser(prescriptionData);
      if (res?.status === 400) {
        return;
      }
    }

    await updateCartItem(cartInfo?.uid, _updateData);

    if (pageCard) {
      await handleGetOrderCalculateData("STANDARD");
      // await handleGetOrderCalculateData("STANDARD");
    }

    handleOpenClosePrescriptionModal();
    openSuccessNotification("success", "Product successfully updated.");
    setIsCreatePrescriptionModal(false);
    // setOpenCartDrawer(false);
  };

  // State reset function
  const handleClosePrescriptionModal = async () => {
    if (isPrescriptionEmpty()) {
      handleUpdatePrescription({
        productSize: cartInfo?.prescription?.productSize,
      });
    } else {
      handleUpdatePrescription(cartInfo?.prescription);
    }

    setIsCreatePrescriptionModal(false);
  };

  const handleDeletePrescription = async () => {
    handleUpdatePrescription({
      // make 1st size for default lens index
      // productSize: cartInfo?.prescription?.productSize,
      productSize: sizeList[0]?.value,
    });

    if (pageCard) {
      await handleGetOrderCalculateData("STANDARD");
    }

    setIsCreatePrescriptionModal(false);
  };

  return (
    <div className="flex gap-4 items-start ">
      <Spin spinning={sizeLoading} fullscreen />
      {/* Image */}
      <Image
        src={`${cartInfo?.thumbnailImage}`}
        alt="product image"
        height={1000}
        width={1000}
        quality={100}
        className={`${
          pageCard ? "w-[100px] h-[112px]" : "w-[120px] h-[153px]"
        }  object-fit bg-[#F6F6F6]`}
      />

      {/* cart details */}
      <div className="flex flex-col bg-red flex-1 gap-2">
        {/* Title and Price */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-0">
            {cartInfo?.productName}
          </h3>
          <div className="flex flex-row items-center  gap-3">
            <p className="text-base font-semibold text-gray-800">
              ${formatNumber(productPrice)}
            </p>
            <Popover
              title={null}
              content={<PriceBreakdown cartInfo={cartInfo} />}
              arrow={false}
              placement={"bottom"}
            >
              <p className="underline font-medium text-[10px] sm:text-xs cursor-pointer block md:block">
                Price Breakdown
              </p>
            </Popover>
          </div>
        </div>

        {/* Attributes */}
        <div className="flex items-center gap-2">
          {cartInfo?.productColorId && (
            <div className="bg-[#F7F8FA] px-1 md:px-2 py-1 text-xs md:text-sm rounded border whitespace-nowrap">
              Color :
              <span className={`font-medium `}>{cartInfo?.productColor}</span>
            </div>
          )}
          <div className="bg-[#F7F8FA] px-1 md:px-2 py-1 text-xs md:text-sm rounded border whitespace-nowrap">
            Lens Index :{" "}
            <span className="font-medium">
              {cartInfo?.prescription?.productSize}
            </span>
          </div>
        </div>

        {pageCard && showButton ? (
          <div>
            <div className="block md:hidden">
              <CounterBtn
                maxLimit={Number(cartInfo?.totalQuantity)}
                handleCurrentCount={handleCurrentCount}
                disabled={false}
                current={quantity}
                isCart={true}
              />
            </div>
          </div>
        ) : null}

        {/* Quantity Control */}
        {!pageCard && showButton ? (
          <CounterBtn
            maxLimit={cartInfo?.totalQuantity}
            handleCurrentCount={handleCurrentCount}
            disabled={false}
            current={quantity}
            isCart={true}
          />
        ) : null}

        {isPrescriptionEmpty() ? (
          <div className="">
            <button
              className="text-blue-500 text-sm font-medium flex items-center gap-1 "
              onClick={handleOpenClosePrescriptionModal}
            >
              <span>
                <IoAddOutline className="h-5 w-5 text-blue-500" />
              </span>
              Add Prescription
            </button>

            {pageCard && (
              <Popover
                title={null}
                content={<PriceBreakdown cartInfo={cartInfo} />}
                arrow={false}
                placement={"bottom"}
              >
                <p className="underline font-medium text-xs cursor-pointer block md:hidden">
                  See price Breakdown
                </p>
              </Popover>
            )}
          </div>
        ) : (
          <div className="">
            <button
              className="text-blue-500 text-sm font-medium flex items-center gap-1 "
              onClick={handleOpenClosePrescriptionModal}
            >
              <span>
                <MdOutlineEdit className="h-5 w-5 text-blue-500" />
              </span>
              Edit Prescription
            </button>

            {pageCard && (
              <Popover
                title={null}
                content={<PriceBreakdown cartInfo={cartInfo} />}
                arrow={false}
                placement={"bottom"}
              >
                <p className="underline font-medium text-xs cursor-pointer block md:hidden">
                  See price Breakdown
                </p>
              </Popover>
            )}
          </div>
        )}
      </div>

      {/* Product Details */}

      {/* delete and  quantity button */}
      {showButton ? (
        pageCard ? (
          <div className="flex gap-[50px]">
            <div className="hidden md:block">
              <CounterBtn
                maxLimit={Number(cartInfo?.totalQuantity)}
                handleCurrentCount={handleCurrentCount}
                disabled={false}
                current={quantity}
                isCart={true}
              />
            </div>

            <button
              className="flex-shrink-0 text-gray-500 hover:text-red-500"
              onClick={() => {
                removeFromCart(cartInfo?.uid);
                getUpdateedCalculation();
              }}
            >
              <Image
                src={Icons.deleteIcon}
                height={1000}
                width={1000}
                alt="Delete icon"
                className="h-4 w-[15px] text-[#4A4A4A]"
              />
            </button>
          </div>
        ) : (
          <button
            className="flex-shrink-0 text-gray-500 hover:text-red-500"
            onClick={() => {
              removeFromCart(cartInfo?.uid);
            }}
          >
            <Image
              src={Icons.deleteIcon}
              height={1000}
              width={1000}
              alt="Delete icon"
              className="h-4 w-[15px] text-[#4A4A4A]"
            />
          </button>
        )
      ) : null}

      {isPrescriptionModalOpen && (
        <PrescriptionModal
          open={isPrescriptionModalOpen}
          mode={isPrescriptionEmpty() ? "create" : "update"}
          prescriptionInfo={isPrescriptionEmpty() ? {} : cartInfo?.prescription}
          handleModalOpenClose={handleOpenClosePrescriptionModal}
          handleSetPrescriptionInfo={handleUpdatePrescription}
          handleSkipAddPrescription={handleClosePrescriptionModal}
          handleDeletePrescription={handleDeletePrescription}
          cartInfo={cartInfo}
        />
      )}
    </div>
  );
}

export default SingleCartItemCard;
