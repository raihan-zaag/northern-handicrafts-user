import useGetSize from "@/app/(public)/products/hooks/useGetSizes";
import { createContext, useContext, useEffect, useState } from "react";

const SingleCartProductContext = createContext();

export const SingleCartProductProvider = ({ children }) => {
    const [productData, setProductData] = useState("");

    const [totalPrice, setTotalPrice] = useState(
        productData?.priceAfterDiscount ?? productData?.regularPrice
    );
    const [calculatePriceForSingleProduct, setCalculatePriceForSingleProduct] =
        useState(productData?.priceAfterDiscount ?? productData?.regularPrice);
    const [basePriceWithoutDiscount, setBasePriceWithoutDiscount] = useState(
        productData?.regularPrice
    );

    const [selectedColor, setSelectedColor] = useState(
        productData?.colorList?.[0]?.id ? productData.colorList[0].id : ""
    );
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [maxLimit, setMaxLimit] = useState(0);

    const [prodBasePrice, setProdBasePrice] = useState(
        productData?.priceAfterDiscount ?? productData?.regularPrice
    );

    const { sizeList, loading: sizeLoading } = useGetSize();

    // quantity available then qantity button enable
    // Select some default Value
    useEffect(() => {
        if (productData?.productAvailabilityStatus === "ENABLE") {
            setMaxLimit(productData?.availableQty);
        }

        if (productData?.colorList?.length > 0) {
            const activeColors = productData?.colorList
                .filter((item) => item.color.active)
                .map((item) => item);

            setSelectedColor(activeColors[0]);
        }

        if (sizeList?.length > 0) {
            setSelectedSize(sizeList[0]?.value);
        }

        // Recalculate the total price with the new color price
        setTotalPrice(() => {
            const basePrice =
                productData?.priceAfterDiscount ?? productData?.regularPrice;
            const colorPrice = productData?.colorList?.[0]?.price || 0;
            const sizePrice = sizeList[0]?.price;

            return basePrice + sizePrice + colorPrice;
        });

        setCalculatePriceForSingleProduct(() => {
            const basePrice =
                productData?.priceAfterDiscount ?? productData?.regularPrice;
            const colorPrice = productData?.colorList?.[0]?.price || 0;
            const sizePrice = sizeList[0]?.price;

            //   console.log(sizeList);
            // sizeList?.find((size) => size.value === selectFirstSize[0]?.label)
            //   ?.price || 0;

            return basePrice + colorPrice + sizePrice;
        });

        setProdBasePrice(
            productData?.priceAfterDiscount ?? productData?.regularPrice
        );

        setBasePriceWithoutDiscount(() => {
            const basePrice = productData?.regularPrice;
            const colorPrice = productData?.colorList?.[0]?.price || 0;
            const sizePrice = sizeList[0]?.price;

            return (basePrice + sizePrice + colorPrice).toFixed(2);
        });

        if (!sizeLoading && sizeList.length > 0) {
            // Set default size to the first item in the list
            setSelectedSize(sizeList[0].value);
        }
    }, [productData, sizeList]);

    const handleResetPriceAfterAddToCart = () => {
        setTotalPrice(() => {
            const basePrice =
                productData?.priceAfterDiscount ?? productData?.regularPrice;
            const colorPrice = productData?.colorList?.[0]?.price || 0;
            const sizePrice = sizeList[0]?.price;

            return basePrice + sizePrice + colorPrice;
        });

        setCalculatePriceForSingleProduct(() => {
            const basePrice =
                productData?.priceAfterDiscount ?? productData?.regularPrice;
            const colorPrice = productData?.colorList?.[0]?.price || 0;
            const sizePrice = sizeList[0]?.price;

            //   console.log(sizeList);
            // sizeList?.find((size) => size.value === selectFirstSize[0]?.label)
            //   ?.price || 0;

            return basePrice + colorPrice + sizePrice;
        });
    };

    const handleCurrentCount = (val) => {
        setQuantity(val);

        const basePrice =
            productData?.priceAfterDiscount ?? productData?.regularPrice;

        const colorPrice =
            productData?.colorList?.find(
                (color) => color.id === selectedColor?.id
            )?.price || 0;
        const sizePrice =
            sizeList?.find((size) => size.value === selectedSize)?.price || 0;

        setTotalPrice((basePrice + colorPrice + sizePrice) * val);
    };

    const handleSelectColor = (item) => {
        setSelectedColor(item);

        setTotalPrice(() => {
            const basePrice =
                productData?.priceAfterDiscount ?? productData?.regularPrice;
            const colorPrice = item?.price || 0;
            const sizePrice =
                sizeList?.find((size) => size.value === selectedSize).price ||
                0;

            return (basePrice + colorPrice + sizePrice) * quantity;
        });

        setCalculatePriceForSingleProduct(() => {
            const basePrice =
                productData?.priceAfterDiscount ?? productData?.regularPrice;
            const colorPrice = item?.price || 0;
            const sizePrice =
                sizeList?.find((size) => size.value === selectedSize)?.price ||
                0;

            return basePrice + colorPrice + sizePrice;
        });
    };

    const handleSizeChange = (e) => {
        setSelectedSize(e?.value);

        setTotalPrice(() => {
            const basePrice =
                productData?.priceAfterDiscount ?? productData?.regularPrice;
            const sizePrice =
                sizeList?.find((size) => size.value === e?.value)?.price || 0;
            // const colorPrice =
            //   productData?.colorList?.find((color) => color.id === selectedColor?.id)
            //     ?.price || 0;
            const colorPrice = selectedColor?.price || 0;

            return (basePrice + sizePrice + colorPrice) * quantity;
        });

        setCalculatePriceForSingleProduct(() => {
            const basePrice =
                productData?.priceAfterDiscount ?? productData?.regularPrice;
            const sizePrice =
                sizeList?.find((size) => size.value === e?.value)?.price || 0;
            const colorPrice =
                productData?.colorList?.find(
                    (color) => color.id === selectedColor?.id
                )?.price || 0;

            return basePrice + sizePrice + colorPrice;
        });
    };

    return (
        <SingleCartProductContext.Provider
            value={{
                productData,
                totalPrice,
                calculatePriceForSingleProduct,
                selectedColor,
                quantity,
                maxLimit,
                selectedSize,
                prodBasePrice,
                basePriceWithoutDiscount,
                setSelectedSize,
                setProductData,
                setTotalPrice,
                setProdBasePrice,
                setSelectedColor,
                setQuantity,
                setMaxLimit,
                handleCurrentCount,
                handleSelectColor,
                setCalculatePriceForSingleProduct,
                handleSizeChange,
                handleResetPriceAfterAddToCart,
            }}
        >
            {children}
        </SingleCartProductContext.Provider>
    );
};

export const useSingleCartProduct = () => {
    const context = useContext(SingleCartProductContext);
    if (!context) {
        throw new Error(
            "useSingleCartProduct must be used within a SingleCartProductProvider"
        );
    }
    return context;
};
