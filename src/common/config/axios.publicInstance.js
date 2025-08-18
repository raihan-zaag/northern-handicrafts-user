import axios from "axios";
import { getCookie } from "cookies-next";

import { BASEURL } from "@/common/config/constants/apiUrls";
import { USER_TOKEN } from "@/common/config/constants/cookiesKeys";

// Public Axios Instance (no token)
export const axiosPublic = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Private Axios Instance (with token)
export const axiosPrivate = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add token to the private axios instance
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = getCookie(USER_TOKEN);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle token refresh
axiosPrivate.interceptors.response.use(
  (response) => response, // Return response if it's successful
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // Make a request to refresh the token
        // const refreshToken = getCookie("refreshToken");
        // const refreshResponse = await axios.post("/refresh-token", {
        //   refreshToken,
        // });

        // const { accessToken } = refreshResponse.data;
        // setCookie("accessToken", accessToken); // Update the access token in cookies

        // Retry the failed request with the new token
        error.config.headers["Authorization"] = `Bearer ${accessToken}`;
        return axios(error.config); // Retry the original request
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
