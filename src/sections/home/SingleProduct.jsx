'use client';

import { useUserContext } from '@/contextProviders/userContextProvider';
import { useWishlist } from '@/contextProviders/useWishListProvider';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PRODUCT_DETAILS_URL } from '@/common/config';
import Typography from '@/common/components/Typography';
import { Heart } from 'lucide-react';
import { Button } from '@/common/components';

const SingleProduct = ({ product, defaultSizePrice = 0 }) => {
  const { isAuthenticated } = useUserContext();
  const { isProductInWishlist, makeWishlist, removeWishlist } = useWishlist();

  const getDefaultColorPrice = () => {
    if (product?.colorList?.length > 0) {
      return product?.colorList[0]?.price;
    }
    return 0;
  };

  // Price calculation
  const productPrice = product?.priceAfterDiscount
    ? product?.priceAfterDiscount
    : product?.regularPrice;

  const calculatedPrice =
    productPrice + defaultSizePrice + getDefaultColorPrice();

  return (
    <div className="relative">
      {/* Product Image */}
      <div className="group relative">
        <Link href={`${PRODUCT_DETAILS_URL}/${product?.id}`}>
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center"
            alt={product?.name}
            className="w-full h-[350px] object-cover transition-transform duration-300 ease-in-out rounded-xl"
            height={1000}
            width={1000}
            quality={100}
            loading="lazy"
          />
        </Link>

        {/* Wishlist Button - shows on hover */}
        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          {isProductInWishlist(product?.id) ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                removeWishlist(product?.id);
              }}
              className="size-11 rounded-full bg-background flex items-center justify-center shadow hover:bg-muted transition"
            >
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                makeWishlist(product?.id);
              }}
              className="size-11 rounded-full bg-background flex items-center justify-center shadow hover:bg-muted transition"
            >
              <Heart className="w-6 h-6 text-gray-600" />
            </button>
          )}
        </div>

        {/* View Details Button - shows on hover */}
        <div className="absolute bottom-3.75 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 px-3.75">
          <Button variant="secondary" className="w-full">
            Add To Cart
          </Button>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-2">
        <Typography.Title3>{product?.name}</Typography.Title3>
        <div className="flex items-center gap-x-3">
          {product?.discount && (
            <Typography.Description className="font-medium line-through">
              ${product?.regularPrice}
            </Typography.Description>
          )}
          <Typography.Paragraph className="text-text-primary font-medium">
            ${calculatedPrice}
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
