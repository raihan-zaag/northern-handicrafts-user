import { useState, useCallback, useEffect } from "react";
import { dummySizes, simulateApiDelay } from "@/data/dummyProductData";

// TODO: Uncomment when backend is ready
// import { GET_PRODUCT_SIZE } from "@/common/config/constants/apiUrls";
// import { axiosPublic } from "@/common/config/axios.publicInstance";

const useGetSize = () => {
  const [sizeList, setSizelist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSizelists = useCallback(async () => {
    try {
      setLoading(true);
      
      // TODO: Uncomment when backend is ready
      // const response = await axiosPublic.get(GET_PRODUCT_SIZE);
      // if (response?.status === 200) {
      //   const formatedSize = response?.data?.content?.map((size) => ({
      //     value: size?.value,
      //     label: size?.value,
      //     price: size?.price,
      //   }));
      //   setSizelist(formatedSize);
      // }

      // Using dummy data for now since backend is not ready
      await simulateApiDelay(300);
      setSizelist(dummySizes);

      return { status: 200, data: { content: dummySizes } };
    } catch (error) {
      console.error("Error fetching sizes:", error);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getSizelists();
  }, [getSizelists]);

  return { getSizelists, sizeList, loading, error };
};

export default useGetSize;
