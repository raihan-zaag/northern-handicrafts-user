import { getProductFilterList } from "@/common/services/sampleProductService";
import { useState, useCallback, useEffect } from "react";


const useGetRecomendedProduct = () => {
  const [recommendedProduct, setRecommendedProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRecommendedProduct = useCallback(async () => {
    try {
      const response = await getProductFilterList({
        sortBy: "RECOMMENDED",
        size: 5,
      });

      if (response?.status === 200) {
        setRecommendedProduct(response?.data?.content);
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
    getRecommendedProduct();
  }, []);

  return { getRecommendedProduct, recommendedProduct, loading, error };
};

export default useGetRecomendedProduct;
