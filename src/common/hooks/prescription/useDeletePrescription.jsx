import { useState, useCallback } from "react";
import axiosPrivate from "@/common/config/axios.publicInstance";
import { DELETE_PRESCRIPTION_URL } from "@/common/config/constants/apiUrls";
import useNotification from "../useNotification";

const useDeletePrescription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { openSuccessNotification, openErrorNotification } = useNotification();

  const deletePrescription = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPrivate.delete(
        `${DELETE_PRESCRIPTION_URL}/${id}`
      );

      if (response?.status === 200) {
        openSuccessNotification(
          "success",
          "Prescription Successfully deleted."
        );
      }
      return response;
    } catch (err) {
      setError(err.response ? err.response.data : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  return { deletePrescription, loading, error };
};

export default useDeletePrescription;
