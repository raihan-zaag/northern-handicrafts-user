"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import PrescriptionForm from "@/sections/productDetails/prescriptionForm";
import { Divider, Drawer, Popover } from "antd";
import { useSingleCartProduct } from "@/contextProviders/useSingleCartProductProvider";
import PriceBreakdown from "@/sections/Checkout/PriceBreakdown";
import { formatNumber } from "@/utils";

function CheckoutProductCard({ cartInfo, pageCard = false }) {
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  const { setProdBasePrice } = useSingleCartProduct();

  useEffect(() => {
    setProdBasePrice(cartInfo?.productBasePrice);
  }, []);

  const isPrescriptionEmpty = () => {
    return Object.keys(cartInfo?.prescription).length === 1;
  };

  const handleOpenClosePrescriptionModal = () => {
    setIsPrescriptionModalOpen(!isPrescriptionModalOpen);
  };

  return (
    <div className="flex gap-4 items-start ">
      {/* Image */}
      <Image
        src={`${cartInfo?.thumbnailImage}`}
        alt="product image"
        height={1000}
        width={1000}
        quality={100}
        className={`${
          pageCard ? "w-[100px] h-[112px]" : "w-[110px] h-[123px]"
        }  object-fit bg-[#F6F6F6]`}
      />

      {/* cart details */}
      <div className="flex flex-col bg-red flex-1 gap-2">
        {/* Title and Price */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-0">
            {cartInfo?.productName}
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-3">
            <p className="text-sm sm:text-base md:text-lg font-normal text-gray-800">
              <span className="font-semibold text-blue-500">
                {cartInfo?.sellQty || 1} X{" "}
              </span>
              ${formatNumber(cartInfo?.singleProductPrice)}
            </p>

            <Popover
              title={null}
              content={<PriceBreakdown cartInfo={cartInfo} />}
              arrow={false}
              placement={"bottom"}
            >
              <p className="underline font-medium text-xs cursor-pointer">
                See price Breakdown
              </p>
            </Popover>
          </div>
        </div>

        {/* Attributes */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          {cartInfo?.productColor && (
            <div className="bg-[#F2F2F2] px-1 md:px-2 py-1 text-sm border whitespace-nowrap">
              Color :
              <span className={`font-medium]`}> {cartInfo?.productColor}</span>
            </div>
          )}
          <div className="bg-[#F2F2F2] px-1 md:px-2 py-1 text-sm border whitespace-nowrap">
            Lens Index :{" "}
            <span className="font-medium">
              {cartInfo?.prescription?.productSize}
            </span>
          </div>
        </div>

        {/* <div className="flex items-center gap-2 mt-4 border"></div> */}
        {isPrescriptionEmpty() ? (
          <div className="">
            <button className="text-[#6E6E6E] text-sm font-medium flex items-center gap-1 cursor-not-allowed">
              No Prescription
            </button>
          </div>
        ) : (
          <div className="">
            <button
              className="text-blue-500 text-sm font-medium flex items-center gap-1 "
              onClick={handleOpenClosePrescriptionModal}
            >
              View Prescription
            </button>
          </div>
        )}
      </div>

      {isPrescriptionModalOpen && (
        <Drawer
          open={isPrescriptionModalOpen}
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
                    handleOpenClosePrescriptionModal();
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
              handleSkipAddPrescription={handleOpenClosePrescriptionModal}
              prescriptionInfo={cartInfo?.prescription || {}}
              onDelete={() => {}}
              showPriceBreakDown={false}
              showButtons={false}
              readOnly={true}
              cartInfo={cartInfo}
            />
          </div>
        </Drawer>
      )}
    </div>
  );
}

export default CheckoutProductCard;
