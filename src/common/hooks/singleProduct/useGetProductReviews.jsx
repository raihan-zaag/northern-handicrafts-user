import { useState, useEffect } from "react";
import { axiosPublic } from "@/configs/axios.publicInstance";
import { GET_PRODUCT_REVIEWS } from "@/constants/apiUrls";

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
