import { useEffect, useState } from "react";
import useGetSize from "../singleProduct/useGetSizes";

export const useManageSingleCartProduct = (productData) => {
  const [totalPrice, setTotalPrice] = useState(
    productData?.priceAfterDiscount ?? productData?.regularPrice
  );
  const [calculatePriceForSingleProduct, setCalculatePriceForSingleProduct] =
    useState(productData?.priceAfterDiscount ?? productData?.regularPrice);

  const [selectedColor, setSelectedColor] = useState(
    productData?.colorList?.[0]?.name ? productData.colorList[0].name : ""
  );
  const [selectedSize, setSelectedSize] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [maxLimit, setMaxLimit] = useState(0);

  const { sizeList } = useGetSize();

  // quantity available then qantity button enable
  // useEffect(() => {
  //   if (productData?.productAvailabilityStatus === "ENABLE") {
  //     setMaxLimit(productData?.availableQty);
  //   }
  // }, [productData]);

  // responsible for change quantity
  const handleCurrentCount = (val) => {
    setQuantity(val);

    // Recalculate the total price based on new quantity
    const basePrice =
      productData?.priceAfterDiscount ?? productData?.regularPrice;

    // const sizePrice =
    //   sizeList?.find((size) => size.value === selectedSize)?.price || 0;

    const colorPrice =
      productData?.colorList?.find((color) => color.name === selectedColor)
        ?.price || 0;

    // Set the updated total price
    setTotalPrice((basePrice + colorPrice) * val);
  };

  const handleSelectColor = (item) => {
    // Update selected color
    setSelectedColor(item?.name);

    // Recalculate the total price with the new color price
    setTotalPrice(() => {
      const basePrice = productData?.priceAfterDiscount ?? productData?.regularPrice;
      //   const sizePrice =
      //     sizeList?.find((size) => size.value === selectedSize)?.price || 0;
      const colorPrice = item?.price || 0;

      return basePrice + colorPrice;
    });

    setCalculatePriceForSingleProduct(() => {
      const basePrice = productData?.priceAfterDiscount ?? productData?.regularPrice;
      //   const sizePrice =
      //     sizeList?.find((size) => size.value === selectedSize)?.price || 0;
      const colorPrice = item?.price || 0;

      return basePrice + colorPrice;
    });
  };

  const handleSizeChange = (e) => {
    // Update selected size
    setSelectedSize(e);

    // Recalculate the total price with the new size price
    setTotalPrice(() => {
      const basePrice =
        productData?.priceAfterDiscount ?? productData?.regularPrice;
      //   const colorPrice = selectedColor?.price || 0;
      const sizePrice = sizeList?.find((size) => size.value === e)?.price || 0;

      return basePrice + sizePrice;
    });

    setCalculatePriceForSingleProduct(() => {
      const basePrice =
        productData?.priceAfterDiscount ?? productData?.regularPrice;
      //   const colorPrice = selectedColor?.price || 0;
      const sizePrice = sizeList?.find((size) => size.value === e)?.price || 0;

      return basePrice + sizePrice;
    });
  };

  return {
    productData,
    totalPrice,
    calculatePriceForSingleProduct,
    selectedColor,
    quantity,
    maxLimit,
    selectedSize,
    setTotalPrice,
    setSelectedColor,
    setQuantity,
    setMaxLimit,
    handleCurrentCount,
    handleSelectColor,
    setCalculatePriceForSingleProduct,
    handleSizeChange,
  };
};
