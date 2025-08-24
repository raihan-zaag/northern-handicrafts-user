import { axiosPublic } from "@/common/config";
import { GET_PRODUCT_REVIEWS } from "@/common/config/constants/apiUrls";
import { useState, useEffect } from "react";


const useGetProductReviews = (productId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPublic.get(
        `${GET_PRODUCT_REVIEWS}/${productId}`
      );

      setReviews(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!productId) return;

    fetchReviews();
  }, [productId]);

  return { reviews, loading, error, fetchReviews };
};

export default useGetProductReviews;
