import { useState, useCallback } from "react";
import { UPDATE_PRESCRIPTION_URL } from "@/constants/apiUrls";
import axiosPrivate from "@/configs/axios.publicInstance";
import useNotification from "../useNotification";

const usePrescriptionUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const { openErrorNotification, openSuccessNotification } = useNotification();

  const updatePrescription = useCallback(async (id, updatedData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPrivate.put(
        `${UPDATE_PRESCRIPTION_URL}/${id}`,
        updatedData
      );
      setData(response.data);
      openSuccessNotification("success", "Prescription update successfully.");
      return response;
    } catch (err) {
      setError(err.response ? err.response.data : "Something went wrong");
      openErrorNotification("error", err?.response?.data?.message);
      return err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updatePrescription, loading, error, data };
};

export default usePrescriptionUpdate;
