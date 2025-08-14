import { useState, useCallback, useEffect } from "react";

import { GET_PRODUCT_SIZE } from "@/constants/apiUrls";
import { axiosPublic } from "@/configs/axios.publicInstance";

const useGetSize = () => {
  const [sizeList, setSizelist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSizelists = useCallback(async () => {
    try {
      const response = await axiosPublic.get(GET_PRODUCT_SIZE);

      if (response?.status === 200) {
        const formatedSize = response?.data?.content?.map((size) => ({
          value: size?.value,
          label: size?.value,
          price: size?.price,
        }));

        setSizelist(formatedSize);
      }

      return response;
    } catch (error) {
      console.error("Error fetching wishlists:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getSizelists();
  }, []);

  return { getSizelists, sizeList, loading, error };
};

export default useGetSize;
