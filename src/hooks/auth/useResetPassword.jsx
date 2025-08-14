import { axiosPublic } from "@/configs/axios.publicInstance";
import { RESET_PASSWORD } from "@/constants/apiUrls";
import {
  IS_RESET_PASSWORD,
  STORE_OTP,
  VERIFY_EMAIL,
} from "@/constants/cookiesKeys";
import { deleteCookie, getCookie } from "cookies-next";
import { useState } from "react";
import useNotification from "../useNotification";
import { useRouter } from "next/navigation";

const useResetPassword = () => {
  const { openErrorNotification, openSuccessNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const resetPassword = async (passwords) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    const code = getCookie(STORE_OTP);
    const email = getCookie(VERIFY_EMAIL);

    try {
      const response = await axiosPublic.post(
        RESET_PASSWORD,
        {
          ...passwords,
        },
        {
          params: {
            code,
            email,
          },
        }
      );

      if (response?.status === 200) {
        deleteCookie(STORE_OTP);
        deleteCookie(VERIFY_EMAIL);
        deleteCookie(IS_RESET_PASSWORD);

        openSuccessNotification(
          "Success",
          response?.data || "Password reset successfully."
        );

        router.push("/login");
      }
    } catch (err) {
      openErrorNotification(
        "error",
        err.response?.data?.message || "An error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, success, error };
};

export default useResetPassword;
