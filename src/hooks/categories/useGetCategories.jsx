import { useState, useEffect } from "react";

import { GET_CATEGORIES_URL } from "@/constants/apiUrls";
import { axiosPublic } from "@/configs/axios.publicInstance";

const useGetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get(GET_CATEGORIES_URL, {
          params: { page: 0, size: 100 },
        });

        setCategories(response.data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return { categories, loading, error };
};

export default useGetCategories;
