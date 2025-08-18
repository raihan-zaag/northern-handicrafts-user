import axiosPrivate from "@/common/config/axios.publicInstance";
import { DELETE_WISH_LIST_URL } from "@/common/config/constants/apiUrls";
import { useState } from "react";
import useNotification from "../useNotification";

const useRemoveWishlist = () => {
  const [loading, setLoading] = useState();

  const { openSuccessNotification } = useNotification();

  const deleteWishlist = async (wishlistId) => {
    setLoading(true);

    try {
      const response = await axiosPrivate.delete(
        `${DELETE_WISH_LIST_URL}/${wishlistId}`
      );

      openSuccessNotification("Success", "Successfully remove from wishlist.");

      return response;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteWishlist, loading };
};

export default useRemoveWishlist;
