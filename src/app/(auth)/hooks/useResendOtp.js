// hooks/useResendOTP.js
import { useState } from "react";

import axiosPublic from "@/common/config/axios.publicInstance";
import { RESEND_OTP_, SEND_OTP } from "@/common/config/constants/apiUrls";
import useNotification from "@/common/hooks/useNotification";

const useResendOTP = () => {
  const { openSuccessNotification, openErrorNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const resendOTP = async (email) => {
    setLoading(true);
    setSuccess(null);

    // Determine the appropriate API URL based on the reset password flag
    const url = RESEND_OTP_;

    try {
      // Make the API call to resend OTP
      const response = await axiosPublic.post(url, {}, { params: { email } });

      // If successful, update state and show notification
      setSuccess(response.data.message);
      openSuccessNotification("OTP Resent", "OTP has been successfully sent.");
    } catch (err) {
      console.error("Error resending OTP:", err);

      const errorMessage = err?.response?.data?.message || "An error occurred";
      openErrorNotification("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    success,
    resendOTP,
  };
};

export default useResendOTP;
