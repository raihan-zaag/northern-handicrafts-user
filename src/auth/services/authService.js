import { axiosPublic } from "@/configs/axios.publicInstance";
import { 
  LOGIN_URL, 
  SIGNUP_URL, 
  RESET_PASSWORD_BY_EMAIL as RESET_PASSWORD_OTP_URL, 
  RESET_PASSWORD,
  VERIFY_OTP_FOR_SIGNUP_USER as VERIFY_EMAIL_URL,
  RESEND_OTP_ as RESEND_OTP_URL
} from "@/constants/apiUrls";

/**
 * Authentication Service
 * Centralized service for all authentication-related API calls
 */

/**
 * Login user with email and password
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @param {boolean} credentials.remember - Remember me option
 * @returns {Promise<Object>} Login response
 */
export const login = async (credentials) => {
  try {
    const response = await axiosPublic.post(LOGIN_URL, credentials);
    return {
      success: true,
      data: response.data,
      message: "Login successful"
    };
  } catch (error) {
    throw {
      success: false,
      message: error.response?.data?.message || "Login failed",
      error: error.response?.data || error.message
    };
  }
};

/**
 * Register new user
 * @param {Object} userData - User registration data
 * @param {string} userData.fullName - User full name
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @param {string} userData.mobileNumber - User mobile number
 * @returns {Promise<Object>} Registration response
 */
export const register = async (userData) => {
  try {
    const response = await axiosPublic.post(SIGNUP_URL, userData);
    return {
      success: true,
      data: response.data,
      message: "Registration successful"
    };
  } catch (error) {
    throw {
      success: false,
      message: error.response?.data?.message || "Registration failed",
      error: error.response?.data || error.message
    };
  }
};

/**
 * Send OTP for password reset
 * @param {string} email - User email
 * @returns {Promise<Object>} OTP send response
 */
export const sendResetPasswordOTP = async (email) => {
  try {
    const response = await axiosPublic.post(RESET_PASSWORD_OTP_URL, { email });
    return {
      success: true,
      data: response.data,
      message: "OTP sent successfully"
    };
  } catch (error) {
    throw {
      success: false,
      message: error.response?.data?.message || "Failed to send OTP",
      error: error.response?.data || error.message
    };
  }
};

/**
 * Reset password with OTP
 * @param {Object} resetData - Password reset data
 * @param {string} resetData.newPassword - New password
 * @param {string} resetData.confirmNewPassword - Confirm new password
 * @returns {Promise<Object>} Password reset response
 */
export const resetPassword = async (resetData) => {
  try {
    const response = await axiosPublic.post(RESET_PASSWORD, resetData);
    return {
      success: true,
      data: response.data,
      message: "Password reset successfully"
    };
  } catch (error) {
    throw {
      success: false,
      message: error.response?.data?.message || "Password reset failed",
      error: error.response?.data || error.message
    };
  }
};

/**
 * Verify email with OTP
 * @param {string} code - Verification code
 * @returns {Promise<Object>} Email verification response
 */
export const verifyEmail = async (code) => {
  try {
    const response = await axiosPublic.post(VERIFY_EMAIL_URL, { code });
    return {
      success: true,
      data: response.data,
      message: "Email verified successfully"
    };
  } catch (error) {
    throw {
      success: false,
      message: error.response?.data?.message || "Email verification failed",
      error: error.response?.data || error.message
    };
  }
};

/**
 * Resend OTP
 * @param {string} email - User email
 * @returns {Promise<Object>} Resend OTP response
 */
export const resendOTP = async (email) => {
  try {
    const response = await axiosPublic.post(RESEND_OTP_URL, { email });
    return {
      success: true,
      data: response.data,
      message: "OTP resent successfully"
    };
  } catch (error) {
    throw {
      success: false,
      message: error.response?.data?.message || "Failed to resend OTP",
      error: error.response?.data || error.message
    };
  }
};

/**
 * Logout user (client-side cleanup)
 * @returns {Promise<Object>} Logout response
 */
export const logout = async () => {
  try {
    // Perform any server-side logout if needed
    // For now, we'll just return success for client-side cleanup
    return {
      success: true,
      message: "Logged out successfully"
    };
  } catch (error) {
    throw {
      success: false,
      message: "Logout failed",
      error: error.message
    };
  }
};