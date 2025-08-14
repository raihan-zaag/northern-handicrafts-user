import { useState, useEffect } from "react";
import axiosPrivate from "@/configs/axios.publicInstance";
import { GET_USER_PROFILE } from "@/constants/apiUrls";

const useGetUserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    setLoading(true);

    try {
      const response = await axiosPrivate.get(GET_USER_PROFILE);
      setProfile(response?.data?.info);
    } catch (err) {
      setError(err.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return { profile, loading, error, fetchUserProfile };
};

export default useGetUserProfile;
