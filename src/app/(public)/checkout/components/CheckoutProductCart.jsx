"use client";

import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Separator } from "@/common/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/common/components/ui/sheet";
import { useSingleCartProduct } from "@/contextProviders/useSingleCartProductProvider";
import { formatNumber } from "@/common/lib/utils";

function CheckoutProductCard({ cartInfo }) {
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  const { setProdBasePrice } = useSingleCartProduct();

  useEffect(() => {
    setProdBasePrice(cartInfo?.productBasePrice);
  }, [cartInfo?.productBasePrice, setProdBasePrice]);

  const handleOpenClosePrescriptionModal = () => {
    setIsPrescriptionModalOpen(!isPrescriptionModalOpen);
  };

  return (
    <div className="flex gap-4 items-start">
      {/* Product Details */}
      <div className="flex flex-col flex-1 gap-2">
        {/* Title and Quantity/Price */}
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-medium text-[var(--color-text-primary)] flex-1">
            {cartInfo?.productName}
          </h3>
          <div className="text-sm font-medium text-[var(--color-text-primary)] ml-4">
            {cartInfo?.sellQty || 1} x $ {formatNumber(cartInfo?.singleProductPrice)}
          </div>
        </div>

        {/* Product Options */}
        <div className="flex gap-3">
          {cartInfo?.productColor && (
            <div className="bg-[#F2F2F2] px-3 py-2 rounded-xl text-xs font-medium text-[var(--color-text-primary)]">
              Color: {cartInfo?.productColor}
            </div>
          )}
          {cartInfo?.prescription?.productSize && (
            <div className="bg-[#F2F2F2] px-3 py-2 rounded-xl text-xs font-medium text-[var(--color-text-primary)]">
              Size: {cartInfo?.prescription?.productSize}
            </div>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="text-sm font-medium text-[var(--color-text-primary)]">
        $ {formatNumber(
          (cartInfo?.singleProductPrice || 0) * (cartInfo?.sellQty || 1)
        )}
      </div>

      {/* Prescription Modal */}
      {isPrescriptionModalOpen && (
        <Sheet 
          open={isPrescriptionModalOpen} 
          onOpenChange={(open) => !open && handleOpenClosePrescriptionModal()}
        >
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
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}

export default CheckoutProductCard;
