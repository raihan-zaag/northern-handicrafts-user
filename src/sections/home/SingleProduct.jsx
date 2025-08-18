"use client";

import { PRODUCT_DETAILS_URL } from "@/constants/pageRoutersUrl";
import { useUserContext } from "@/contextProviders/userContextProvider";
import { useWishlist } from "@/contextProviders/useWishListProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Icons from "../../../public/icons";

const SingleProduct = ({ product, defaultSizePrice = 0 }) => {
    const [showWishListIcon, setShowWishListIcon] = useState(false);

    const { user, isAuthenticated } = useUserContext();
    const {
        wishlists,
        handleGetWishlists,
        makeWishlist,
        isProductInWishlist,
        removeWishlist,
    } = useWishlist();

    const handleShowWishlistIcon = () => {
        if (isAuthenticated) {
            setShowWishListIcon(true);
        }
    };

    const handleHideWishlistIcon = () => {
        if (isAuthenticated) {
            setShowWishListIcon(false);
        }
    };

    const getDefaultColorPrice = () => {
        if (product?.colorList?.length > 0) {
            return product?.colorList[0]?.price;
        } else {
            return 0;
        }
    };

    // Price calculation
    const productPrice = product?.priceAfterDiscount
        ? product?.priceAfterDiscount
        : product?.regularPrice;

    const calculatedPrice =
        productPrice + defaultSizePrice + getDefaultColorPrice();

    return (
        <div>
            {/* Product Image */}
            <div
                className="group"
                onMouseEnter={handleShowWishlistIcon}
                onMouseLeave={handleHideWishlistIcon}
            >
                <Link href={`${PRODUCT_DETAILS_URL}/${product?.id}`}>
                    {/* Image size : 310 X 370 */}
                    <Image
                        src={product.thumbnailImage} // Adjust the image URL based on your data
                        alt={product.name}
                        className="w-full h-[369px] object-cover transition-transform duration-300 ease-in-out bg-[#F6F6F6]"
                        height={1000}
                        width={1000}
                        quality={100}
                        // priority={10}
                        loading="lazy"
                    />
                </Link>

                {/* Wishlist Button - Positioned on the Right */}
                {user ? (
                    <div className="absolute right-4 top-4 transition-opacity duration-300 ease-in-out">
                        {isProductInWishlist(product?.id) ? (
                            <button
                                className="p-1"
                                onClick={(e) => {
                                    e.preventDefault();
                                    removeWishlist(product?.id);
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
                        ) : (
                            showWishListIcon && (
                                <button
                                    className="p-1"
                                    onClick={(e) => {
                                        e?.preventDefault();
                                        makeWishlist(product?.id);
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
                            )
                        )}
                    </div>
                ) : null}

                {/* Overlay div that shows up on hover */}
                <div className="absolute inset-0 top-[330px] opacity-0 group-hover:opacity-70 transition-opacity duration-300 ease-in-out w-full">
                    <button className="text-white font-semibold px-6 py-2 bg-black transition-al w-full bg-opacity-100 group-hover:bg-opacity-50">
                        <Link href={`${PRODUCT_DETAILS_URL}/${product?.id}`}>
                            <h1 className=" text-white  text-[15px]">
                                View Details
                            </h1>
                        </Link>
                    </button>
                </div>
            </div>

            {/* Product Details */}
            <div className="mt-2">
                <h3 className="text-base font-normal text-primary leading-5">
                    {product?.name}
                </h3>
                <div className="flex items-center gap-x-3">
                    <p className="text-[18px] font-medium text-primary leading-5">
                        ${calculatedPrice}
                    </p>
                    {product?.discount && (
                        <p className="text-[18px] font-normal text-gray-500 leading-5 line-through">
                            ${product?.regularPrice}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
