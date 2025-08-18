import { useState, useEffect, useCallback } from "react";

import { GET_USER_ADDRESS } from "@/common/config/constants/apiUrls";
import { axiosPrivate } from "@/common/config/axios.publicInstance";

const useGetAddress = () => {
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const fetchAddress = async (page = 0, size = 10) => {
  //   console.log("call api.");
  //   try {
  //     setLoading(true);
  //     const response = await axiosPrivate.get(GET_USER_ADDRESS, {
  //       params: { page, size },
  //     });

  //     setAddress(response.data);
  //   } catch (err) {
  //     setError(err.message || "An error occurred");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Memoize the fetchAddress function
  const fetchAddress = useCallback(async (page = 0, size = 10) => {
    console.log("Fetching address data...");
    try {
      setLoading(true);
      const response = await axiosPrivate.get(GET_USER_ADDRESS, {
        params: { page, size },
      });
      setAddress(response.data); // Update address state
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   fetchAddress();
  // }, [fetchAddress]);

  return { address, loading, error, fetchAddress };
};

export default useGetAddress;
