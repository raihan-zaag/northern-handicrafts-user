import { useState } from "react";
import { axiosPublic } from "@/common/config/axios.publicInstance";
import { CREATE_GUEST_USER_ORDER_URL } from "@/common/config/constants/apiUrls";
import useNotification from "../useNotification";

const useCreateGuestUserOrder = () => {
  const [createGuestOrderLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const { openSuccessNotification, openErrorNotification } = useNotification();

  const createGuestOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axiosPublic.post(
        CREATE_GUEST_USER_ORDER_URL,
        orderData
      );
      setResponse(res.data);

      openSuccessNotification("success", "Successfully create order.");
      return res?.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order");

      openErrorNotification("error", error);
      console.error("Error creating order:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createGuestOrder, createGuestOrderLoading, error, response };
};

export default useCreateGuestUserOrder;
