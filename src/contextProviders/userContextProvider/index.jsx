import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

import { CHANGE_PASSWORD, SOCIAL_LOGIN_URL } from "@/common/config/constants/apiUrls";
import {
  USER_INFO,
  USER_PERMISSION,
  USER_TOKEN,
} from "@/common/config/constants/cookiesKeys";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { axiosPublic } from "@/common/config/axios.publicInstance";
import { socialAuth } from "@/common/config/firebase.config";

// Create the UserContext
const UserContext = createContext(null);

// Custom hook to use the UserContext easily
export const useUserContext = () => {
  return useContext(UserContext);
};

// UserProvider component to provide user state and login tracking
export const UserProvider = ({ children }) => {
  const _token = getCookie(USER_TOKEN);
  const _user = getCookie(USER_INFO);

  const [user, setUser] = useState(_user ? _user : null);
  const [token, setToken] = useState(_token ? _token : null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (_token) setToken(_token);
    if (_user) setUser(_user);

    if (_token && _user) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to get user info from cookies
  const fetchUserFromCookies = () => {
    const userInfo = getCookie(USER_INFO);
    if (userInfo) {
      try {
        return JSON.parse(userInfo);
      } catch (error) {
        console.error("Error parsing user cookie", error);
        return null;
      }
    }
    return null;
  };

  // Fetch user form api
  const fetchUserInfo = async () => {
    try {
      const res = await axios.get("Get profile", {
        headers: { Authorization: token },
      });

      if (res?.status === 200) {
        setUser(res?.data?.user);
        setCookie(USER_INFO, res?.data?.user);
      }
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const storedUser = fetchUserFromCookies();
    if (storedUser) {
      setUser(storedUser);
    }

    if (user && token) {
      // fetchUserInfo();
    }
  }, []);

  // Social Login Strategy
  const handlePageTransition = (response) => {
    const _token = response?.data?.token?.access;
    const _userInfo = response?.data?.user;
    const _roles = response?.data?.user?.roles;

    // set userInfo and token inside a state
    setToken(_token);
    setUser(_userInfo);
    setIsAuthenticated(true);

    // Set the token and userInfo set inside cookie
    setCookie(USER_TOKEN, _token);
    setCookie(USER_INFO, _userInfo);
    setCookie(USER_PERMISSION, _roles);
  };

  const handleSocialLogin = async (firebaseToken, apiEndPoint) => {
    try {
      const res = await axiosPublic({
        baseURL: apiEndPoint,
        method: "POST",
        headers: { "firebase-token": firebaseToken },
      });
      handlePageTransition(res);
      return res;
    } catch (error) {
      // console.error("Error in makeFacebookLogin:", error.message);
      throw new Error(error.message || "Something went wrong");
    }
  };

  const googleSingIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      if (socialAuth) {
        const result = await signInWithPopup(socialAuth, provider);
        const user = result.user;
        if (user) {
          const res = await handleSocialLogin(
            user?.accessToken,
            SOCIAL_LOGIN_URL
          );

          return res;

          // if(res.status === 200){
          //     toast.success(res.message)
          // }
        }
      }
    } catch (error) {
      throw new Error(error.message || "Something went wrong");
      // throw error;
    }
  };

  const facebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    provider.setCustomParameters({
      display: "popup",
    });

    try {
      if (socialAuth) {
        const result = await signInWithPopup(socialAuth, provider);
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const credential = FacebookAuthProvider.credentialFromResult(user?.accessToken);

        if (user) {
          const res = await handleSocialLogin(
            user?.accessToken,
            SOCIAL_LOGIN_URL
          );

          return res;
        }
      }
    } catch (error) {
      console.error("Error in facebookSignIn:", error);
      // toast.error(error?.message);
      throw error;
    }
  };

  // Function to handle user logout
  const logout = () => {
    deleteCookie(USER_INFO);
    deleteCookie(USER_TOKEN);
    deleteCookie(USER_PERMISSION);

    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  // User Image upload.
  const handleUserProfilePictureUpload = async (formData) => {
    showMessage("loading", "Please Wait, Your profile picture is uploading...");

    try {
      const response = await axios.post("update profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      // Close the loading message immediately after the response
      closeMessage();

      if (response?.data?.keys?.length > 0) {
        const imageKey = response.data.keys[0];
        return imageKey;
      }
    } catch (error) {
      console.log(error);
      // toast.error(error?.message);
      showMessage(
        "error",
        error?.message ||
          "Image can'nt upload now. Sorry for this inconvenient.  "
      );
    }
  };

  // User profile info Update.
  const handleUserProfileUpdate = async (data) => {
    showMessage("loading", "Uploading User Data...");

    try {
      const response = await axios.patch("user profile", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      // Close the loading message immediately after the response
      closeMessage();

      if (response?.status === 200) {
        showMessage("success", "Update Profile successfully.");
        // update user data.
        // setUser(response?.data?.user);
        setCookie(USER_INFO, response?.data?.user);

        await fetchUserInfo();
      }
      return response;
    } catch (e) {
      showMessage("error", e?.message || "Sorry! cannot update your data.");
    }
  };

  const changePassword = async (passwordData) => {
    showMessage("loading", "Changing your password. Please wait....");

    try {
      const res = await axios.patch(
        CHANGE_PASSWORD,
        { ...passwordData },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Close the loading message immediately after the response
      closeMessage();

      if (res?.status === 200) {
        showMessage(
          "success",
          res?.data?.message || "Password changes successfully."
        );
        return res;
      }
    } catch (e) {
      showMessage("error", e?.response?.data?.message || "Something is wrong.");
      return e;
    }
  };

  // Provide the user state and functions to the rest of the app
  const values = {
    user,
    token,
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    setToken,
    logout,
    handleUserProfilePictureUpload,
    handleUserProfileUpdate,
    changePassword,
    fetchUserInfo,
    googleSingIn,
    facebookSignIn,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
