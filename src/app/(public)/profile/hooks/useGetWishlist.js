import { useState, useCallback } from "react";

import { GET_WISH_LIST_URL } from "@/common/config/constants/apiUrls";
import { axiosPrivate } from "@/common/config/axios.publicInstance";

const useGetWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getWishlists = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(GET_WISH_LIST_URL);

      return response;
    } catch (error) {
      console.error("Error fetching wishlists:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getWishlists, wishlist, loading, error };
};

export default useGetWishlist;

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setLoading(true);
//         const response = await axiosPrivate.get(GET_WISH_LIST_URL);

//         setWishlist(response.data);
//       } catch (err) {
//         setError(err.message || "An error occurred");
//       } finally {
//       }
//     };

//     fetchCategories();
//   }, []);
