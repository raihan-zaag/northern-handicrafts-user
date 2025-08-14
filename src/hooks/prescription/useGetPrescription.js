import { useState, useEffect } from "react";

import { GET_PRESCRIPTION } from "@/constants/apiUrls";
import { axiosPublic } from "@/configs/axios.publicInstance";

const useGetPrescription = () => {
  const [prescription, setPrescription] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get(GET_PRESCRIPTION);

        setPrescription(response.data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return { prescription, loading, error };
};

export default useGetPrescription;
