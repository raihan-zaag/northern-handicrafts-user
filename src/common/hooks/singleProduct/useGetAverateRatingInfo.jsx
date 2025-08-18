import { useState, useEffect } from "react";
import useNotification from "../useNotification";
import { axiosPublic } from "@/configs/axios.publicInstance";
import { GET_AVERAGE_RATING_VALUE } from "@/constants/apiUrls";

// get data for top of the product details

const useGetAverageRating = (productId) => {
  const [averageRatingValue, setAverageRatingValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { openErrorNotification } = useNotification();

  const fetchAverageRating = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPublic.get(
        `${GET_AVERAGE_RATING_VALUE}/${productId}`
      );

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

export default useGetAverageRating;
