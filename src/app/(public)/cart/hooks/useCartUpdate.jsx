import { useState } from "react";
import { axiosPrivate } from "@/common/config/axios.publicInstance";
import { UPDATE_CART_URL } from "@/common/config/constants/apiUrls";
import useNotification from "@/common/hooks/useNotification";

const useUpdateCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { openErrorNotification } = useNotification();

  const updateCart = async (cartData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosPrivate.post(UPDATE_CART_URL, cartData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccess(true);
      return response.data; // Return the response data for further handling
    } catch (err) {
      // console.error("Cart update error:", err);
      setError(err.response?.data?.message || "Failed to update the cart.");
      openErrorNotification("error", err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateCart, loading, error, success };
};

export default useUpdateCart;
