import axiosPrivate from "@/configs/axios.publicInstance";
import { useState } from "react";
import useNotification from "../useNotification";
import { CONTACT_US_URL } from "@/constants/apiUrls";

const useCreateContactInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { openSuccessNotification, openErrorNotification } = useNotification();

  const createContact = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosPrivate.post(`${CONTACT_US_URL}`, data);
      // console.log(res);
      openSuccessNotification(
        "success",
        "We appreciate your interest and will be in touch with you shortly."
      );
      return res;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      console.error("Error creating profile:", err.message);
      openErrorNotification(
        "error",
        err.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return { createContact, loading, error };
};

export default useCreateContactInfo;
