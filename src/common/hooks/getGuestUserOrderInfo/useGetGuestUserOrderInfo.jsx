import { useState, useCallback } from "react";
import axios from "axios";
import { GET_ORDER_BY_ID_URL } from "@/constants/apiUrls";
import useNotification from "../useNotification";

const useGetGuestUserOrderInfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { openErrorNotification } = useNotification();

  const getGuestUserOrderInformation = useCallback(async (orderId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${GET_ORDER_BY_ID_URL}/${orderId}`);
      setData(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : "Failed to fetch data");

      openErrorNotification("error", err.response.data.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, getGuestUserOrderInformation };
};

export default useGetGuestUserOrderInfo;
