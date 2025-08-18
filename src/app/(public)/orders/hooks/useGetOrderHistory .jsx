import { useState } from "react";
import axiosPrivate from "@/common/config/axios.publicInstance";
import { GET_ORDER_HISTORY_URL } from "@/common/config/constants/apiUrls";
import { useNotification } from "@/common/hooks";

const useGetOrderHistory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderHistoryPageSize, setOrderHistoryPageSize] = useState(0);

  const { openErrorNotification } = useNotification();

  const getOrderHistory = async (page, size, id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPrivate.get(GET_ORDER_HISTORY_URL, {
        params: { page, size, id },
      });
      setOrderHistoryPageSize(response?.data?.totalElements);
      return response.data.content;
    } catch (err) {
      console.error("Error in POST request:", err);
      setError(err.response?.data?.message || err.message || "Unknown error");
      openErrorNotification(
        "error",
        err.response?.data?.message || err.message || "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, orderHistoryPageSize, getOrderHistory };
};

export default useGetOrderHistory;
