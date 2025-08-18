import {
  ENV_VARIABLE,
  ENV_VARIABLE_FOR_LOCAL,
  ENV_VARIABLE_FOR_IMAGE,
} from "./env";

const domain =
  ENV_VARIABLE ?? ENV_VARIABLE_FOR_LOCAL
    ? ENV_VARIABLE ?? ENV_VARIABLE_FOR_LOCAL
    : "";

// BaseURL
export let BASEURL = domain;

const imageBaseUrl = ENV_VARIABLE_FOR_IMAGE;

export const IMAGE_BASE_URL = `${imageBaseUrl}`;

// auth
export const LOGIN_URL = `${BASEURL}/auth/customer/login`;
export const SIGNUP_URL = `${BASEURL}/auth/customer/sign-up/by-email`;
export const SOCIAL_LOGIN_URL = `${BASEURL}/customer/social/login`;

// Customers
const CUSTOMERS = `${BASEURL}/customers`;
export const VERIFY_OTP_FOR_SIGNUP_USER = `${CUSTOMERS}/verify/email-verification`;
export const VERIFY_OTP_FOR_RESET_PASSWORD = `${CUSTOMERS}/verify/otp`;
export const SEND_OTP = `${CUSTOMERS}/request/reset-password-by-email`; // use also for resend OTP. (Previously use)
export const RESET_PASSWORD_BY_EMAIL = `${CUSTOMERS}/request/reset-password-by-email`;
export const RESET_PASSWORD = `${CUSTOMERS}/verify/reset-password-by-email`;
export const RESEND_OTP_ = `${CUSTOMERS}/request/resend-opt-by-email`; // use after sign-up resend otp (New)

export const USERS_URL = `${BASEURL}/users`;
export const CHANGE_PASSWORD = `${USERS_URL}/change-password`;
export const RESEND_OTP = `${USERS_URL}/resend-otp`;

// profile
export const PROFILE_UPDATE_URL = `${BASEURL}/secured/users/profile/update`;
export const GET_USER_PROFILE = `${BASEURL}/secured/users/profile`;

// comments
export const COMMENTS = `${BASEURL}/comments`;
export const COMMENTS_LIKES = `${BASEURL}/likes`;

// notification
export const NOTIFICATION = `${BASEURL}/notifications`;

// contact-us
export const CONTRACT_US = `${BASEURL}/users/contact-us`;

// Products
export const PRODUCT_LIST = `${BASEURL}/product/get-all`;
export const GET_PRODUCT_REVIEWS = `${BASEURL}/product-reviews/by-product-id`;

// Categories // need to change in future.
export const GET_CATEGORIES_URL = `${BASEURL}/categories`;

// wishlist
export const GET_WISH_LIST_URL = `${BASEURL}/secured/wishlists`;
export const CREATE_WISH_LIST_URL = `${BASEURL}/secured/wishlists/add`;
export const DELETE_WISH_LIST_URL = `${BASEURL}/secured/wishlists/remove`;

// Prescription
export const GET_PRESCRIPTION = `${BASEURL}/prescriptions`;

// single product
export const GET_PRODUCT_SIZE = `${BASEURL}/thickness/get-all`;

//address
export const GET_USER_ADDRESS = `${BASEURL}/secured/addresses`;
export const CREATE_USER_ADDRESS = `${BASEURL}/secured/addresses/create`;
export const UPDATE_USER_ADDRESS = `${BASEURL}/secured/addresses/update/id`;
export const DELETE_USER_ADDRESS = `${BASEURL}/secured/addresses/remove/id`;

// Cart
export const UPDATE_CART_URL = `${BASEURL}/secured/carts/update`;
export const GET_CART_ITEM_URL = `${BASEURL}/secured/carts/get-by/customer-id`;

// order
export const CREATE_ORDER_URL = `${BASEURL}/secured/orders/create`;
export const CREATE_GUEST_USER_ORDER_URL = `${BASEURL}/order/for-guest/create`;
export const GET_CALCULATE_URL = `${BASEURL}/order/for-guest/calculation`;
export const GET_ONGOING_ORDER_URL = `${BASEURL}/secured/orders/on-going`;
export const GET_ORDER_HISTORY_URL = `${BASEURL}/secured/orders/history`;
export const GET_ORDER_BY_ID_URL = `${BASEURL}/guest-customer/order/by-id`;
export const CHANGE_ORDER_STATUS_CHANGE = `${BASEURL}/public/order/refund`;

// Order review
export const CREATE_ORDER_REVIEW = `${BASEURL}/secured/product-reviews/create`;
export const GET_AVERAGE_RATING_VALUE = `${BASEURL}/public/avg-review-count`;
export const GET_REVIEW_COUNT = `${BASEURL}/public/review-count`;

// Config related
export const GET_CONFIG_URL = `${BASEURL}/settings/get-default`;

// image upload
export const UPLOAD_IMAGE = `${BASEURL}/secured/files/aws/upload/multiple-file`;

// Banner
export const GET_BANNER_URL = `${BASEURL}/banners`;

// Prescriptions data
export const CREATE_PRESCRIPTION_URL = `${BASEURL}/secured/prescriptions/create`;
export const GET_PRESCRIPTION_LIST_URL = `${BASEURL}/secured/prescriptions`;
export const UPDATE_PRESCRIPTION_URL = `${BASEURL}/secured/prescriptions/update/id`;
export const DELETE_PRESCRIPTION_URL = `${BASEURL}/secured/prescriptions/remove/id`;

// Contact US
export const CONTACT_US_URL = `${BASEURL}/contacts/create`;

// NewsLetter
export const NEWS_LETTER_URL = `${BASEURL}/secured/news-letters/create`;

// colors
export const GET_COLOR_LIST = `${BASEURL}/public/product-color/id`;

// static page url
export const STATIC_PAGE_URL = `${BASEURL}/public`;
