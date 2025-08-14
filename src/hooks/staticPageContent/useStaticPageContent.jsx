import { useState } from "react";
import axios from "axios";
import { STATIC_PAGE_URL } from "@/constants/apiUrls";

const useFetchStaticContent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (endpoint) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${STATIC_PAGE_URL}/${endpoint}`);
      setData(response.data);
      return response;
    } catch (err) {
      setError(err.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, data, loading, error };
};

export default useFetchStaticContent;
