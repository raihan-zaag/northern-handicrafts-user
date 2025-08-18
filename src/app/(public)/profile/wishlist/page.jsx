"use client";

import EmptyDataSkeleton from "@/common/components/common/EmptyDataSkeleton";
import RowSkeleton from "@/common/components/common/RowSkeleton";
import { useWishlist } from "@/contextProviders/useWishListProvider";
import useRemoveWishlist from "@/app/(public)/profile/hooks/useDeleteWishlist";
import useGetWishlist from "@/app/(public)/profile/hooks/useGetWishlist";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BsCart3 } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

const MyWishlistPage = () => {
  const { getWishlists, loading } = useGetWishlist();
  const { deleteWishlist } = useRemoveWishlist();
  const [wishlist, setWishlist] = React.useState([]);
  const { setWishlists } = useWishlist();

  React.useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await getWishlists();
      setWishlist(response.data.content);
      setWishlists(response.data.content);
    } catch (error) {
      console.error("Error fetching wishlists:", error);
    }
  };

  const handleRemoveWishlist = async (wishlistId) => {
    const response = await deleteWishlist(wishlistId);
    if (response.status === 200) {
      fetchWishlist();
    }
  };

  return (
    <div>
      <h2 className="text-[#2A2A2A] font-semibold text-2xl">My Wishlist</h2>
      <div className="mt-6">
        {loading ? (
          <RowSkeleton count={3} />
        ) : (
          <>
            {wishlist.length > 0 ? (
              wishlist.map((item, index) => (
                <WishlistCard
                  item={item}
                  key={index}
                  handleRemoveWishlist={handleRemoveWishlist}
                />
              ))
            ) : (
              <EmptyDataSkeleton title={"No Wishlist found"} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyWishlistPage;

const WishlistCard = ({ item, handleRemoveWishlist }) => {
  const router = useRouter();

  const goToPageDetails = () => {
    router.push(`/product-details/${item?.product?.id}`);
  };

  return (
    <div className="py-5 flex items-start justify-between">
      <div className="flex items-start gap-5">
        <Image
          src={item?.product?.thumbnailImage}
          alt={item?.product?.name}
          width={1000}
          height={1000}
          className="w-[70px] h-[80px] object-cover"
        />
        <div>
          <p className="text-sm font-medium text-[#2A2A2A]">
            {item?.product?.name}
          </p>
          <p className="text-base font-medium text-[#2A2A2A]">
            $
            {item?.product?.priceAfterDiscount
              ? item?.product?.priceAfterDiscount
              : item?.product?.regularPrice}
          </p>
          <button
            className="flex items-center gap-1.5 mt-[18px]"
            onClick={goToPageDetails}
          >
            <BsCart3 className="text-lg text-[#0F62FE]" />
            <span className="text-[#0F62FE] text-sm font-semibold">
              Buy Now
            </span>
          </button>
        </div>
      </div>
      <button
        className="flex items-center gap-1.5 duration-300 sm:mt-[20px] text-[#EF4444] sm:text-[#4A4A4A] hover:text-[#EF4444]"
        onClick={() => handleRemoveWishlist(item.product.id)}
      >
        <RiDeleteBin6Line className="text-base " />
        <span className=" text-base font-medium sm:inline hidden">Remove</span>
      </button>
    </div>
  );
};
