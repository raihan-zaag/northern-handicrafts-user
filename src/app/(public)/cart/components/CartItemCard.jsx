"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MdOutlineEdit } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";

import { useCart } from "@/contextProviders/useCartContext";
import { useSingleCartProduct } from "@/contextProviders/useSingleCartProductProvider";
import useGetSize from "@/hooks/singleProduct/useGetSizes";

import { Popover, PopoverContent, PopoverTrigger } from "@/common/components/ui/popover";
import { LoadingOverlay } from "@/common/components/ui/loading-overlay";
import PriceBreakdown from "@/sections/Checkout/PriceBreakdown";
import QuantityControl from "./QuantityControl";
import Icons from "@/public/icons";
import { formatNumber, cn } from "@/common/lib/utils";

const CartItemCard = ({
  cartInfo,
  onQuantityChange,
  onRemove,
  className,
}) => {
  const [quantity, setQuantity] = useState(cartInfo?.sellQty || 1);
  const [productPrice, setProductPrice] = useState(cartInfo?.productPrice);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  const { loading: sizeLoading, sizeList } = useGetSize();

  const {
    updateCartItem,
    handleGetPriceForSelectedPrescriptions,
  } = useCart();

  const { setSelectedSize } = useSingleCartProduct();

  // Update local states when cartInfo changes
  useEffect(() => {
    if (cartInfo) {
      setQuantity(cartInfo?.sellQty || 1);
      setProductPrice(cartInfo?.productPrice || 0);
    }
  }, [cartInfo]);

  const handleQuantityChange = async (newQuantity) => {
    setQuantity(newQuantity);

    // Calculate lense index price
    const lenseIndexPrice = sizeList?.find(
      (size) => size?.value === cartInfo?.prescription?.productSize
    )?.price || 0;

    // Calculate total prescription item price
    const prescriptionPrice = handleGetPriceForSelectedPrescriptions(
      cartInfo?.prescription
    );

    const newPrice =
      (cartInfo?.productBasePrice + lenseIndexPrice + prescriptionPrice) *
      newQuantity;

    setProductPrice(newPrice);

    const updateData = { productPrice: newPrice, sellQty: newQuantity };
    await updateCartItem(cartInfo?.uid, updateData);

    // Notify parent component
    if (onQuantityChange) {
      onQuantityChange();
    }
  };

  const handleRemoveItem = () => {
    if (onRemove) {
      onRemove(cartInfo?.uid);
    }
  };

  const isPrescriptionEmpty = () => {
    return Object.keys(cartInfo?.prescription || {}).length <= 1;
  };

  const handlePrescriptionModal = () => {
    setSelectedSize(sizeList[0]?.value);
    setIsPrescriptionModalOpen(!isPrescriptionModalOpen);
  };

  return (
    <LoadingOverlay isLoading={sizeLoading}>
      <div className={cn("bg-white border-b border-gray-100 py-5", className)}>
        <div className="flex gap-4 items-start">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <Image
              src={cartInfo?.thumbnailImage}
              alt={cartInfo?.productName}
              height={110}
              width={100}
              quality={100}
              className="w-[100px] h-[110px] object-cover bg-gray-50 rounded-xl"
            />
          </div>

          {/* Product Content */}
          <div className="flex-1 space-y-3">
            {/* Product Info */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900 leading-tight">
                {cartInfo?.productName}
              </h3>
              
              <div className="flex items-center gap-3">
                <span className="text-base font-medium text-gray-900">
                  ${formatNumber(productPrice)}
                </span>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-xs font-medium text-gray-500 underline hover:text-gray-700 transition-colors">
                      Price Breakdown
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <PriceBreakdown cartInfo={cartInfo} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Product Options */}
            <div className="flex flex-wrap gap-2">
              {cartInfo?.productColorId && (
                <div className="bg-gray-50 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-700 border">
                  Color: <span className="text-gray-900">{cartInfo?.productColor}</span>
                </div>
              )}
              <div className="bg-gray-50 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-700 border">
                Size: <span className="text-gray-900">{cartInfo?.prescription?.productSize}</span>
              </div>
            </div>

            {/* Prescription Actions */}
            <div>
              {isPrescriptionEmpty() ? (
                <button
                  onClick={handlePrescriptionModal}
                  className="flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                >
                  <IoAddOutline className="h-4 w-4" />
                  Edit Item
                </button>
              ) : (
                <button
                  onClick={handlePrescriptionModal}
                  className="flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                >
                  <MdOutlineEdit className="h-4 w-4" />
                  Edit Item
                </button>
              )}
            </div>

            {/* Mobile Quantity and Remove (visible on small screens) */}
            <div className="flex lg:hidden items-center justify-between pt-2">
              <QuantityControl
                quantity={quantity}
                maxQuantity={Number(cartInfo?.totalQuantity)}
                onQuantityChange={handleQuantityChange}
                disabled={false}
                className="scale-90"
              />
              
              <button
                onClick={handleRemoveItem}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove item"
              >
                <Image
                  src={Icons.deleteIcon}
                  height={20}
                  width={20}
                  alt="Delete"
                  className="h-5 w-5"
                />
              </button>
            </div>
          </div>

          {/* Desktop Quantity and Actions (hidden on small screens) */}
          <div className="hidden lg:flex items-center gap-12">
            <QuantityControl
              quantity={quantity}
              maxQuantity={Number(cartInfo?.totalQuantity)}
              onQuantityChange={handleQuantityChange}
              disabled={false}
            />

            <button
              onClick={handleRemoveItem}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <Image
                src={Icons.deleteIcon}
                height={20}
                width={20}
                alt="Delete"
                className="h-5 w-5"
              />
            </button>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default CartItemCard;
