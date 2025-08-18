import { useState } from "react";
import { axiosPublic } from "@/common/config/axios.publicInstance"; // Adjust import based on your file structure
import { SIGNUP_URL } from "@/common/config/constants/apiUrls";
import useNotification from "../useNotification";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { IS_RESET_PASSWORD, VERIFY_EMAIL } from "@/common/config/constants/cookiesKeys";

const useSignUp = () => {
  // States for loading, error, and response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const { openErrorNotification, openSuccessNotification } = useNotification();
  const router = useRouter();

  // The function to handle the sign-up API call
  const signUp = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPublic.post(SIGNUP_URL, { ...data });

      if (response?.status === 200) {
        openSuccessNotification(
          "Success",
          response?.message ||
            "User successfully sign up. Now verify your email address."
        );

        setCookie(VERIFY_EMAIL, response?.data?.email);
        setCookie(IS_RESET_PASSWORD, false);
        router.refresh();
        router.push("/email-verification");
      }
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
      openErrorNotification("Error", err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // Return the states and the sign-up function
  return {
    signUp,
    loading,
    error,
    responseData,
  };
};

export default useSignUp;
