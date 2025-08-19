// =============================================================================
// CENTRALIZED ROUTE CONSTANTS
// =============================================================================
// This file contains all route constants used throughout the application.
// Use these constants instead of hardcoding paths in your components.

// =============================================================================
// STATIC ROUTES
// =============================================================================

// Auth Routes
export const LOGIN_URL = "/login";
export const SIGN_UP_URL = "/sign-up";
export const EMAIL_VERIFICATION_URL = "/email-verification";
export const FORGOT_PASSWORD_URL = "/forgot-password";
export const RESET_PASSWORD_URL = "/reset-password";

// Public Routes
export const HOME_URL = "/";
export const LANDING_URL = "/landing";
export const PRODUCTS_URL = "/products";
export const PRODUCT_DETAILS_URL = "/product-details";
export const CART_URL = "/cart";
export const CHECKOUT_URL = "/checkout";
export const TRACK_ORDER_URL = "/track-order";

// Order Routes
export const ORDER_SUCCESS_URL = "/orders/success";
export const ORDER_FAILED_URL = "/orders/failed";

// Profile Routes
export const PROFILE_BASE_URL = "/profile";
export const PROFILE_MY_ACCOUNT_URL = "/profile/my-account";
export const PROFILE_ADDRESS_URL = "/profile/address";
export const PROFILE_WISHLIST_URL = "/profile/wishlist";
export const PROFILE_MY_ORDERS_URL = "/profile/my-orders";
export const PROFILE_MY_PRESCRIPTIONS_URL = "/profile/my-prescriptions";
export const PROFILE_ORDER_HISTORY_URL = "/profile/order-history";
export const PROFILE_TRACK_ORDER_URL = "/profile/track-order";
export const PROFILE_MY_ORDERS_TRACK_ORDER_URL = "/profile/my-orders/track-order";

// Legal Routes
export const TERMS_AND_CONDITION_URL = "/terms-and-condition";
export const PRIVACY_POLICY_URL = "/privacy-policy";
export const SHIPPING_POLICY_URL = "/shipping-policy";
export const REFUND_POLICY_URL = "/refund-policy";
export const COOKIE_POLICY_URL = "/cookie-policy";
export const ACCESSIBILITY_STATEMENT_URL = "/accessibility-statement";

// Support Routes
export const CUSTOMER_SUPPORT_URL = "/customer-support";

// =============================================================================
// DYNAMIC ROUTES (Functions)
// =============================================================================

// Product Routes
export const PRODUCT_DETAILS_DYNAMIC_URL = (id) => `/product-details/${id}`;

// Category Routes
export const CATEGORY_URL = (categoryId) => `/?category=${categoryId}`;
export const SEARCH_URL = (searchQuery) => `/?name=${searchQuery}`;

// Order Routes
export const ORDER_FAILED_DYNAMIC_URL = (orderId) => `/orders/failed/${orderId}`;
export const PROFILE_TRACK_ORDER_DYNAMIC_URL = (orderId) => `/profile/my-orders/track-order/${orderId}`;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get a home URL with optional category filter
 * @param {string} categoryId - Optional category ID to filter by
 * @returns {string} - Home URL with or without category filter
 */
export const getHomeUrlWithCategory = (categoryId) => {
  return categoryId ? CATEGORY_URL(categoryId) : HOME_URL;
};

/**
 * Get profile URL based on user authentication status
 * @param {boolean} isAuthenticated - Whether user is authenticated
 * @returns {string} - Profile URL or login URL
 */
export const getProfileUrl = (isAuthenticated) => {
  return isAuthenticated ? PROFILE_MY_ACCOUNT_URL : LOGIN_URL;
};

/**
 * Get checkout URL with optional redirect parameter
 * @param {string} redirectUrl - Optional redirect URL after login
 * @returns {string} - Checkout URL with or without redirect
 */
export const getCheckoutUrl = (redirectUrl) => {
  return redirectUrl ? `${CHECKOUT_URL}?redirect=${encodeURIComponent(redirectUrl)}` : CHECKOUT_URL;
};
