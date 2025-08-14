import { useState, useCallback } from "react";
import { CHANGE_ORDER_STATUS_CHANGE } from "@/constants/apiUrls";
import useNotification from "../useNotification";
import axiosPrivate, { axiosPublic } from "@/configs/axios.publicInstance";

const useUpdateOrderStatus = (baseUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { openErrorNotification, openSuccessNotification } = useNotification();

  const updateOrderStatus = useCallback(
    async (id, status) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const response = await axiosPublic.post(
          `${CHANGE_ORDER_STATUS_CHANGE}`,
          {},
          { params: { id } }
        );

        if (response.status === 200 || response.status === 204) {
          setSuccess(true);
          openSuccessNotification("success", "Your order successfully cancel.");
        }

        return response;
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong.");
        openErrorNotification(
          "error",
          err.response?.data?.message || "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    },
    [baseUrl]
  );

  return { updateOrderStatus, loading, error, success };
};

export default useUpdateOrderStatus;
