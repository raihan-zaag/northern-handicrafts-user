// Reset password by email

import { useState } from "react";
import { setCookie } from "cookies-next";

import { axiosPublic } from "@/common/config/axios.publicInstance";
import { RESET_PASSWORD_BY_EMAIL } from "@/common/config/constants/apiUrls";
import useNotification from "../useNotification";
import { IS_RESET_PASSWORD, VERIFY_EMAIL } from "@/common/config/constants/cookiesKeys";
import { useRouter } from "next/navigation";

const useSendOTP = () => {
  const { openSuccessNotification, openErrorNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const sendOTP = async (email) => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await axiosPublic.post(
        RESET_PASSWORD_BY_EMAIL,
        {},
        { params: { email } }
      );

      if (response?.status === 200) {
        setCookie(IS_RESET_PASSWORD, true);
        setCookie(VERIFY_EMAIL, email);
        router.push("/email-verification");
      }

      // If the request is successful, update success state
      openSuccessNotification(
        "Send Otp",
        response.data.message || "OTP sent successfully."
      );
    } catch (err) {
      // If an error occurs, update error state
      openErrorNotification(
        "Error",
        err.response?.data?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return { sendOTP, loading, success, error };
};

export default useSendOTP;
