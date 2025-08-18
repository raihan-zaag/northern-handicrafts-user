import { useState } from "react";
import axios from "axios";
import { CREATE_PRESCRIPTION_URL } from "@/common/config/constants/apiUrls";
import axiosPrivate from "@/common/config/axios.publicInstance";
import useNotification from "../useNotification";

const useCreatePrescription = () => {
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { openErrorNotification, openSuccessNotification } = useNotification();

  const createPrescription = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPrivate.post(
        `${CREATE_PRESCRIPTION_URL}`,
        data
      );
      setPrescriptionData(response.data);

      openSuccessNotification("success", "Prescription created successfully.");
      return response;
    } catch (err) {
      setError(err);
      // console.log(err);
      openErrorNotification("error", err?.response?.data?.message);
      // throw err; // Rethrow error for caller to handle
      return err;
    } finally {
      setLoading(false);
    }
  };

  return {
    prescriptionData,
    loading,
    error,
    createPrescription,
  };
};

export default useCreatePrescription;
