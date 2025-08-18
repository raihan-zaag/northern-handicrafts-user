// hooks/useVerifyEmail.js
import { useState } from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

import axiosPublic from "@/configs/axios.publicInstance";
import {
  VERIFY_OTP_FOR_RESET_PASSWORD,
  VERIFY_OTP_FOR_SIGNUP_USER,
} from "@/constants/apiUrls";
import {
  VERIFY_EMAIL,
  IS_RESET_PASSWORD,
  STORE_OTP,
} from "@/constants/cookiesKeys";
import useNotification from "../useNotification";
import { useRouter } from "next/navigation";

const useVerifyEmail = () => {
  const router = useRouter();
  const { openErrorNotification, openSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // Get cookies related to email verification
  const isResetPasswordCookie = getCookie(IS_RESET_PASSWORD);
  const isResetPassword = isResetPasswordCookie ? JSON.parse(isResetPasswordCookie) : false;
  const email = getCookie(VERIFY_EMAIL);

  // Function to verify email
  const verifyEmail = async (code) => {
    // Set loading state to true and reset previous states
    setLoading(true);
    setSuccess(null);

    // Determine the appropriate API URL based on the reset password flag
    const url = Boolean(isResetPassword)
      ? VERIFY_OTP_FOR_RESET_PASSWORD
      : VERIFY_OTP_FOR_SIGNUP_USER;

    try {
      // Make the API call with the email and OTP code
      const response = await axiosPublic.post(
        url,
        {},
        {
          params: {
            email,
            code,
          },
        }
      );

      if (response?.status === 200) {
        openSuccessNotification("Success", "Successfully verified your email.");
        if (isResetPassword) {
          router.push("/reset-password");

          setCookie(VERIFY_EMAIL, email);
          setCookie(STORE_OTP, code);
        } else {
          deleteCookie(VERIFY_EMAIL);
          router.push("/login");
        }
      }

      // Handle successful response
      setSuccess(response.data.message);

      // Return the response data for further use
      return response.data;
    } catch (err) {
      // Handle error response
      const errorMessage = err?.response?.data?.message || "An error occurred";
      openErrorNotification("Error", errorMessage);

      // Return null to indicate failure
      return null;
    } finally {
      // Set loading to false after the request completes
      setLoading(false);
    }
  };

  // Return hook states and the verifyEmail function
  return {
    loading,
    success,
    verifyEmail,
  };
};

export default useVerifyEmail;
