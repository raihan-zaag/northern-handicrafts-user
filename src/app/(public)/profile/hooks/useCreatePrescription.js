import { useState } from "react";
import { axiosPrivate } from "@/common/config/axios.publicInstance";
import { CREATE_PRESCRIPTION_URL } from "@/common/config/constants/apiUrls";
import useNotification from "@/common/hooks/useNotification";

const useCreatePrescription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { openSuccessNotification, openErrorNotification } = useNotification();

  const createPrescription = async (prescriptionData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosPrivate.post(CREATE_PRESCRIPTION_URL, prescriptionData);
      
      if (response.data?.success) {
        openSuccessNotification("Prescription created successfully");
        return response.data;
      } else {
        throw new Error(response.data?.message || "Failed to create prescription");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create prescription";
      setError(errorMessage);
      openErrorNotification(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createPrescription,
    loading,
    error,
  };
};

export default useCreatePrescription;
