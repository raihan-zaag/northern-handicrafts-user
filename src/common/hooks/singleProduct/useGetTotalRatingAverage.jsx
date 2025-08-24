import { useState, useEffect } from "react";
import useNotification from "../useNotification";
import { axiosPublic } from "@/common/config";
import { GET_REVIEW_COUNT } from "@/common/config/constants/apiUrls";

// get data for bottom of the product details

const useGetTotalRatingAverage = (productId) => {
  const [averageRatingValue, setAverageRatingValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { openErrorNotification } = useNotification();

  const fetchAverageRating = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPublic.get(
        `${GET_REVIEW_COUNT}/${productId}`
      );
      console.log(response);
      setAverageRatingValue(response.data);
    } catch (err) {
      setAverageRatingValue(null);
      setError(err.message || "An error occurred");
      openErrorNotification("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAverageRating();
  }, []);

  return { averageRatingValue, loading, error };
};

export default useGetTotalRatingAverage;
