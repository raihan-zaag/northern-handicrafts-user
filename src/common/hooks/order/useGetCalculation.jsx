import { useState } from "react";
import { axiosPublic } from "@/configs/axios.publicInstance";
import { GET_CALCULATE_URL } from "@/constants/apiUrls";
import useNotification from "../useNotification";

const useGetOrderCalculatedData = () => {
  const [calculatedData, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { openErrorNotification } = useNotification();

  const getCalculatedData = async (payload = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPublic.post(GET_CALCULATE_URL, payload);
      setData(response.data);
      return response;
    } catch (err) {
      console.error("Error in POST request:", err);
      setError(err.response?.data?.message || err.message || "Unknown error");
      openErrorNotification(
        "error",
        err.response?.data?.message || err.message || "Unknown error"
      );
      return err;
    } finally {
      setLoading(false);
    }
  };

  return { calculatedData, loading, error, getCalculatedData };
};

export default useGetOrderCalculatedData;
