import { useState, useEffect } from "react";
import { dummyPrescriptions, simulateApiDelay } from "@/data/dummyProductData";
// TODO: Uncomment when backend is ready
// import { axiosPrivate } from "@/common/config/axios.publicInstance";
// import { GET_PRESCRIPTION_LIST_URL } from "@/common/config/constants/apiUrls";

const useGetPrescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Uncomment when backend is ready
      // const response = await axiosPrivate.get(GET_PRESCRIPTION_LIST_URL);
      // setPrescriptions(response.data?.data || []);

      // Using dummy data for now since backend is not ready
      await simulateApiDelay(500);
      setPrescriptions(dummyPrescriptions);
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

export default useGetPrescription;
