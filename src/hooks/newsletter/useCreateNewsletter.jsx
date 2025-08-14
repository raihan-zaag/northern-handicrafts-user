import axiosPrivate from "@/configs/axios.publicInstance";
import { useState } from "react";
import useNotification from "../useNotification";
import { NEWS_LETTER_URL } from "@/constants/apiUrls";

const useCreateNewsletter = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { openSuccessNotification, openErrorNotification } = useNotification();

  const createContact = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosPrivate.post(`${NEWS_LETTER_URL}`, data);
      openSuccessNotification(
        "success",
        "Thank you for subscribing to our newsletter! We're excited to keep you updated with the latest news and special offers."
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

export default useCreateNewsletter;
