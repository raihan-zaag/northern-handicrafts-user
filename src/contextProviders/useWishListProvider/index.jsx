import React, { createContext, useContext, useState, useEffect } from "react";

import useGetWishlist from "@/hooks/wishlist/useGetWishlist";
import useCreateWishlist from "@/hooks/wishlist/useCreateWishlist";
import useRemoveWishlist from "@/hooks/wishlist/useDeleteWishlist";

import { useUserContext } from "../userContextProvider";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { token, user } = useUserContext();

  const [wishlists, setWishlists] = useState([]);

  const { getWishlists: getWishList } = useGetWishlist();
  const { addWishlist } = useCreateWishlist();
  const { deleteWishlist } = useRemoveWishlist();

  // Load wishlists on mount
  const loadWishlists = async () => {
    try {
      const response = await getWishList();
      setWishlists(response?.data?.content);
    } catch (error) {
      console.error("Error loading wishlists:", error);
    }
  };

  useEffect(() => {
    if (user || token) {
      loadWishlists();
    }
  }, [token]);

  // Actions
  const handleGetWishlists = async () => {
    try {
      const data = await getWishList();

      setWishlists(data?.data?.content);
    } catch (error) {
      console.error("Error fetching wishlists:", error);
    }
  };

  const makeWishlist = async (product) => {
    try {
      const newWishlist = await addWishlist(product);

      setWishlists((prevWishlists) => [...prevWishlists, newWishlist]);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeWishlist = async (wishlistId) => {
    try {
      const res = await deleteWishlist(wishlistId);

      if (res?.status === 200) {
        setWishlists((prevWishlists) =>
          prevWishlists.filter((item) => item.product.id !== wishlistId)
        );
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  // Check if a product exists in the wishlist
  const isProductInWishlist = (productId) => {
    return wishlists?.some((item) => item.product.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlists,
        setWishlists,
        handleGetWishlists,
        makeWishlist,
        removeWishlist,
        isProductInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Hook to use WishlistContext
export const useWishlist = () => useContext(WishlistContext);
