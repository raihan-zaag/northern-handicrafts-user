import { axiosPrivate } from '@/common/config/axios.publicInstance';
import { PROFILE_UPDATE_URL } from '@/common/config/constants/apiUrls';
import { USER_INFO } from '@/common/config/constants/cookiesKeys';
import useNotification from '@/common/hooks/useNotification';
import { setCookie } from 'cookies-next';
import { useState } from "react";

const useProfileUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { openSuccessNotification } = useNotification();

  const updateProfile = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosPrivate.put(`${PROFILE_UPDATE_URL}`, data);
      openSuccessNotification("success", "Profile successfully updated.");
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      console.error("Error creating profile:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error };
};

export default useProfileUpdate;
