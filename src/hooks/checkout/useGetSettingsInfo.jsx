import { axiosPublic } from "@/configs/axios.publicInstance";
import { GET_CONFIG_URL } from "@/constants/apiUrls";
import { useState, useEffect, useCallback } from "react";

const useGetDefaultSettings = () => {
  const [configData, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPublic.get(GET_CONFIG_URL);
      setData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.response?.data?.message || err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { configData, loading, error, fetchData };
};

export default useGetDefaultSettings;
