"use client";

import React, { useState } from "react";
import { Separator } from "@/common/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/common/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { LoadingOverlay } from "@/common/components/ui/loading-overlay";
import Image from "next/image";
import { TiStarFullOutline } from "react-icons/ti";
import ProductReviewForm from "./ProductReviewForm";
import { useMakeOrderReview } from "@/app/(public)/products/hooks/useMakeProductReview";
import PrescriptionForm from "@/sections/productDetails/PrescriptionForm";
import { IoCloseOutline } from "react-icons/io5";
import { useUserContext } from "@/contextProviders/userContextProvider";
import { _checkIsPrescriptionEmpty } from "@/common/lib/utils";

const OrdersProductCard = ({ data, orderId, orderStatus, allOrderInfo }) => {
  const [isWriteReview, setIsWriteReview] = useState(false);
  const [showPrescriptionInfo, setShowPrescription] = useState(false);
  const [isProductReview, setIsProductReview] = useState(data?.productReview);

  const { createProductReview, loading } = useMakeOrderReview();
  const { isAuthenticated } = useUserContext();

  const isEmpty = _checkIsPrescriptionEmpty(data?.prescription);

  const handleWriteReviewToggleModal = () => {
    setIsWriteReview(!isWriteReview);
  };

  const handleMakeReview = async (rating) => {
    const res = await createProductReview(rating, data?.product?.id, orderId);

    if (res?.status === 201) {
      setIsProductReview(true);
      setIsWriteReview(false);
    }
  };

  const handleTogglePrescriptionDrawer = () => {
    setShowPrescription(!showPrescriptionInfo);
  };

  const isOrderDelivered = allOrderInfo?.orderStatus === "ORDER_DELIVERED";
  // const isPartiallyReturned =
  //   allOrderInfo?.orderStatus === "PARTIALLY_RETURNED";
  // const isOrderReturned = allOrderInfo?.orderStatus === "ORDER_RETURNED";

  const isShowReviewButton =
    isAuthenticated && !isProductReview && isOrderDelivered;

  return (
    <LoadingOverlay isLoading={loading}>
      <div className="flex items-start gap-4">
        <Image
          src={data?.thumbnailImage}
          alt="product image"
          width={1000}
          height={1000}
          className="w-90px h-110px"
        />

      <div>
  <h3 className="text-sm font-medium text-gray-dark">
          {data?.productName}
        </h3>
        <div className="flex items-center gap-1 mt-0.5">
          <p className="text-sm font-semibold text-blue">
            {data?.sellQty} x
          </p>
          <p className="text-sm font-medium text-gray-dark">
            {data?.productPrice}
          </p>
        </div>

        {data?.returnQty > 0 && (
          <h3 className="text-sm font-medium text-gray-dark">
            Initial Qty : {data?.sellQty + data?.returnQty}
          </h3>
        )}

        <div className="flex items-center gap-3 mt-2">
          {data?.addOn?.color && (
            <p className="text-xs font-medium text-gray-dark2 py-2 px-3 bg-gray-light">
              Color:{data?.addOn?.color}
            </p>
          )}

          {data?.returnQty > 0 && (
            <p className="text-xs text-center font-medium text-red-variant2 py-2 px-3 bg-red/10">
              Returned : {data?.returnQty}
            </p>
          )}

          {/* <p className="text-xs font-medium text-[#3A3A3A] py-2 px-3 bg-[#F2F2F2]">
            Thick:{data?.addOn?.size}
          </p> */}
        </div>
        <div className="flex items-center gap-3 mt-3">
          {isEmpty ? (
            <button className="text-xs font-semibold text-light-gray sm:no-underline cursor-not-allowed">
              <span className="sm:inline hidden">No</span> Prescription
            </button>
          ) : (
            <button
              className="text-xs font-semibold text-blue sm:no-underline"
              onClick={handleTogglePrescriptionDrawer}
            >
              <span className="sm:inline hidden">View</span> Prescription
            </button>
          )}
          <div className="border-r border-border-gray h-3 w-0.5" />

          {isShowReviewButton ? (
            <button
              onClick={handleWriteReviewToggleModal}
              className={`text-xs font-semibold text-orange flex items-center gap-1.5 sm:no-underline cursor-pointer`}
            >
              <TiStarFullOutline className="text-orange sm:inline hidden" />
              <span className="text-xs font-semibold text-orange">
                Give Review
              </span>
            </button>
          ) : null}
        </div>
      </div>

      {isWriteReview && (
        <Dialog open={isWriteReview} onOpenChange={(open) => !open && handleWriteReviewToggleModal()}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="w-full flex justify-center pt-4">Write Review</DialogTitle>
            </DialogHeader>
            <ProductReviewForm
              submit={handleMakeReview}
              productName={data?.productName}
              image={data?.thumbnailImage}
              data={data}
              closeModal={handleWriteReviewToggleModal}
            />
          </DialogContent>
        </Dialog>
      )}

      {showPrescriptionInfo && (
        <Sheet open={showPrescriptionInfo} onOpenChange={(open) => !open && handleTogglePrescriptionDrawer()}>
          <SheetContent className="w-600px sm:max-w-600px">
            <SheetHeader>
              <div className="flex items-center justify-between">
                <SheetTitle>My Prescription</SheetTitle>
                <button
                  onClick={() => {
                    handleTogglePrescriptionDrawer();
                  }}
                >
                  <IoCloseOutline className="h-8 w-8" />
                </button>
              </div>
              <Separator />
            </SheetHeader>
            <div className="mt-4">
              <PrescriptionForm
                mode={"view"}
                onSubmit={() => {}}
                handleSkipAddPrescription={handleTogglePrescriptionDrawer}
                prescriptionInfo={data?.prescription || {}}
                onDelete={() => {}}
                showPriceBreakDown={false}
                showButtons={false}
                readOnly={true}
              />
            </div>
          </SheetContent>
        </Sheet>
      )}
      </div>
    </LoadingOverlay>
  );
};

export default OrdersProductCard;
