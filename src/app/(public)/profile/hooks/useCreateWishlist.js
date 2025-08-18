import { useState } from "react";

import { CREATE_WISH_LIST_URL } from "@/common/config/constants/apiUrls";
import { axiosPrivate } from "@/common/config/axios.publicInstance";
import useNotification from "../useNotification";

const useCreateWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openSuccessNotification, openErrorNotification } = useNotification();

  const addWishlist = async (productId) => {
    setLoading(true);
    try {
      const response = await axiosPrivate.post(
        `${CREATE_WISH_LIST_URL}/${productId}`,
        {}
      );

      openSuccessNotification(
        "success",
        "Product Successfully add in wishlist."
      );

      return response.data;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { addWishlist, loading };
};

export default useCreateWishlist;
