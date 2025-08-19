"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import PrescriptionForm from "@/sections/productDetails/PrescriptionForm";
import { Separator } from "@/common/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/common/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
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
          pageCard ? "w-100px h-112px" : "w-110px h-123px"
        }  object-fit bg-bg-light-gray`}
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

            <Popover>
              <PopoverTrigger asChild>
                <p className="underline font-medium text-xs cursor-pointer">
                  See price Breakdown
                </p>
              </PopoverTrigger>
              <PopoverContent>
                <PriceBreakdown cartInfo={cartInfo} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Attributes */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          {cartInfo?.productColor && (
            <div className="bg-border-gray/40 px-1 md:px-2 py-1 text-sm border whitespace-nowrap">
              Color :
              <span className="font-medium"> {cartInfo?.productColor}</span>
            </div>
          )}
          <div className="bg-border-gray/40 px-1 md:px-2 py-1 text-sm border whitespace-nowrap">
            Lens Index :{" "}
            <span className="font-medium">
              {cartInfo?.prescription?.productSize}
            </span>
          </div>
        </div>

        {/* <div className="flex items-center gap-2 mt-4 border"></div> */}
        {isPrescriptionEmpty() ? (
          <div className="">
            <button className="text-light-gray text-sm font-medium flex items-center gap-1 cursor-not-allowed">
              No Prescription
            </button>
          </div>
        ) : (
          <div className="">
            <button
              className="text-blue text-sm font-medium flex items-center gap-1 "
              onClick={handleOpenClosePrescriptionModal}
            >
              View Prescription
            </button>
          </div>
        )}
      </div>

      {isPrescriptionModalOpen && (
        <Sheet open={isPrescriptionModalOpen} onOpenChange={(open) => !open && handleOpenClosePrescriptionModal()}>
          <SheetContent className="w-full sm:max-w-600px">
            <SheetHeader>
              <div className="flex items-center justify-between">
                <SheetTitle>My Prescription</SheetTitle>
                <button
                  onClick={() => {
                    handleOpenClosePrescriptionModal();
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
                handleSkipAddPrescription={handleOpenClosePrescriptionModal}
                prescriptionInfo={cartInfo?.prescription || {}}
                onDelete={() => {}}
                showPriceBreakDown={false}
                showButtons={false}
                readOnly={true}
                cartInfo={cartInfo}
              />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}

export default CheckoutProductCard;
