import { useState, useEffect } from "react";
import { axiosPrivate } from "@/common/config/axios.publicInstance";
import { GET_PRESCRIPTION_LIST_URL } from "@/common/config/constants/apiUrls";

const useGetPrescriptionsList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosPrivate.get(GET_PRESCRIPTION_LIST_URL);
      setPrescriptions(response.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch prescriptions");
      console.error("Error fetching prescriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return {
    prescriptions,
    loading,
    error,
    refetch: fetchPrescriptions,
  };
};

export default useGetPrescriptionsList;
