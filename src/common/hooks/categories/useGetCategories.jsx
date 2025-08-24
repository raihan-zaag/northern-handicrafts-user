import { useState, useEffect } from "react";
import { dummyCategories, simulateApiDelay } from "@/data/dummyProductData";

// TODO: Uncomment when backend is ready
// import { GET_CATEGORIES_URL } from "@/common/config/constants/apiUrls";
// import { axiosPublic } from "@/common/config/axios.publicInstance";

const useGetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        
        // TODO: Uncomment when backend is ready
        // const response = await axiosPublic.get(GET_CATEGORIES_URL, {
        //   params: { page: 0, size: 100 },
        // });
        // setCategories(response.data);

        // Using dummy data for now since backend is not ready
        await simulateApiDelay(500);
        setCategories(dummyCategories);
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
