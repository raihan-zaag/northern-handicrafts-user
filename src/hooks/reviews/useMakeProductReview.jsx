import { useState } from "react";
import axiosPrivate from "@/configs/axios.publicInstance";
import { CREATE_ORDER_REVIEW } from "@/constants/apiUrls";
import useNotification from "../useNotification";

// Hook for Creating an Order
export const useMakeOrderReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  const { openSuccessNotification, openErrorNotification } = useNotification();

  const createProductReview = async (orderData, productId, orderId) => {
    setLoading(true);
    try {
      const response = await axiosPrivate.post(
        `${CREATE_ORDER_REVIEW}/${productId}/${orderId}`,
        orderData
      );
      setOrder(response.data);
      openSuccessNotification("success", "Order review successfully given.");
      setError(null);
      return response;
    } catch (err) {
      openErrorNotification(
        "error",
        err?.response?.data?.message || "Review can not create."
      );
    } finally {
      setLoading(false);
    }
  };

  return { createProductReview, loading, error, order };
};
