"use client";

import React, { useState } from "react";
import { Divider, Drawer, Modal, Spin } from "antd";
import Image from "next/image";
import { TiStarFullOutline } from "react-icons/ti";
import ProductReviewForm from "./ProductReviewForm";
import { useMakeOrderReview } from "@/hooks/reviews/useMakeProductReview";
import { _checkIsPrescriptionEmpty } from "@/utils";
import PrescriptionForm from "@/sections/productDetails/prescriptionForm";
import { IoCloseOutline } from "react-icons/io5";
import { useUserContext } from "@/contextProviders/userContextProvider";

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
    <div className="flex items-start gap-4">
      <Spin spinning={loading} fullscreen />

      <Image
        src={data?.thumbnailImage}
        alt="product image"
        width={1000}
        height={1000}
        className="w-[90px] h-[110px]"
      />

      <div>
        <h3 className="text-sm font-medium text-[#2A2A2A]">
          {data?.productName}
        </h3>
        <div className="flex items-center gap-1 mt-0.5">
          <p className="text-sm font-semibold text-[#0F62FE]">
            {data?.sellQty} x
          </p>
          <p className="text-sm font-medium text-[#2A2A2A]">
            {data?.productPrice}
          </p>
        </div>

        {data?.returnQty > 0 && (
          <h3 className="text-sm font-medium text-[#2A2A2A]">
            Initial Qty : {data?.sellQty + data?.returnQty}
          </h3>
        )}

        <div className="flex items-center gap-3 mt-2">
          {data?.addOn?.color && (
            <p className="text-xs font-medium text-[#3A3A3A] py-2 px-3 bg-[#F2F2F2]">
              Color:{data?.addOn?.color}
            </p>
          )}

          {data?.returnQty > 0 && (
            <p className="text-xs text-center font-medium text-[#E91C24] py-2 px-3 bg-[#FFEFEF]">
              Returned : {data?.returnQty}
            </p>
          )}

          {/* <p className="text-xs font-medium text-[#3A3A3A] py-2 px-3 bg-[#F2F2F2]">
            Thick:{data?.addOn?.size}
          </p> */}
        </div>
        <div className="flex items-center gap-3 mt-3">
          {isEmpty ? (
            <button className="text-xs font-semibold text-[#6E6E6E] sm:no-underline cursor-not-allowed">
              <span className="sm:inline hidden">No</span> Prescription
            </button>
          ) : (
            <button
              className="text-xs font-semibold text-[#0F62FE] sm:no-underline"
              onClick={handleTogglePrescriptionDrawer}
            >
              <span className="sm:inline hidden">View</span> Prescription
            </button>
          )}
          <div className="border-r border-[#EBEDF0] h-3 w-0.5" />

          {isShowReviewButton ? (
            <button
              onClick={handleWriteReviewToggleModal}
              className={`text-xs font-semibold text-[#614017] flex items-center gap-1.5 sm:no-underline cursor-pointer`}
            >
              <TiStarFullOutline className="text-[#F08200] sm:inline hidden" />
              <span className="text-xs font-semibold text-[#F08200]">
                Give Review
              </span>
            </button>
          ) : null}
        </div>
      </div>

      {isWriteReview && (
        <Modal
          title={
            <h4 className="w-full flex justify-center pt-4">Write Review</h4>
          }
          open={isWriteReview}
          onCancel={handleWriteReviewToggleModal}
          footer={null}
          closeIcon={null}
          centered
        >
          <ProductReviewForm
            submit={handleMakeReview}
            productName={data?.productName}
            image={data?.thumbnailImage}
            data={data}
            closeModal={handleWriteReviewToggleModal}
          />
        </Modal>
      )}

      {showPrescriptionInfo && (
        <Drawer
          open={showPrescriptionInfo}
          centered
          footer={null}
          width={600}
          onCancel={() => {}}
          closeIcon={null}
          title={
            <div>
              <div className="flex items-center justify-between">
                <p>My Prescription</p>
                <button
                  onClick={() => {
                    handleTogglePrescriptionDrawer();
                  }}
                >
                  <IoCloseOutline className="h-8 w-8" />
                </button>
              </div>
              <Divider style={{ padding: 0, margin: "5px 0 0px 0" }} />
            </div>
          }
          styles={{ body: { padding: "0 24px" } }}
        >
          <div>
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
        </Drawer>
      )}
    </div>
  );
};

export default OrdersProductCard;
