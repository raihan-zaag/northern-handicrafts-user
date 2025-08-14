import { axiosPublic } from "@/configs/axios.publicInstance";
import { PRODUCT_LIST } from "@/constants/apiUrls";

export const getProductFilterList = async (params) => {
  try {
    // Ensure params is an object and sanitize input
    params = params || {};

    // Build categoryId parameter based on whether it’s a string or an array
    const categoryIdParam = Array.isArray(params.category)
      ? params.category
      : params.category
      ? [params.category]
      : [];

    const queryParams = {};

    if (params?.sortBy) queryParams.sort = params.sortBy;
    if (categoryIdParam.length > 0) queryParams.category = categoryIdParam;
    if (params?.search) queryParams.searchKey = params.search;
    if (params?.page)
      queryParams.page = Number(params.page) > 0 ? Number(params.page) : 1;
    if (params?.size) {
      queryParams.size = Number(params.size) > 0 ? Number(params.size) : 1;
    } else {
      queryParams.size = Number(6);
    }
    // Always include priceFrom and priceTo if they exist
    if (params?.priceFrom !== undefined) {
      queryParams.priceFrom = params.priceFrom;
    }
    if (params?.priceTo !== undefined) {
      queryParams.priceTo = params.priceTo;
    }
    if (params.name) {
      queryParams.name = params.name;
    }

    const res = await axiosPublic.get(PRODUCT_LIST, {
      params: queryParams,

      paramsSerializer: (params) => {
        return Object.entries(params)
          .filter(([_, value]) => value !== undefined && value !== null)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return value
                .map((v) => `${key}=${encodeURIComponent(v)}`)
                .join("&");
            }
            return `${key}=${encodeURIComponent(value)}`;
          })
          .join("&");
      },
    });

    return res;
  } catch (e) {
    return {
      error: true,
      message:
        e?.message ||
        "An unexpected error occurred while fetching the product list.",
      data: [],
    };
  }
};

// Get single product

export async function productDetails(productId) {
  try {
    const response = await axiosPublic.get(`${PRODUCT_LIST}?id=${productId}`);
    return response.data;
  } catch (error) {
    // Log error and rethrow it for the calling function to handle
    console.error("Error fetching product details:", error);
    throw error;
  }
}

// import { axiosPublic } from "@/configs/axios.publicInstance";
// import { PRODUCT_LIST } from "@/constants/apiUrls";

// export const getProductFilterList = async (params) => {
//   try {
//     // Ensure params is an object and sanitize input
//     params = params || {};

//     // Build categoryId parameter based on whether it’s a string or an array
//     const categoryIdParam = Array.isArray(params.category) ? params.category : params.category ? [params.category] : []; // Default to an empty array if categoryId is missing

//     // Ensure all other parameters have defaults
//     const sort = params?.sortBy || ""; // Default sort to an empty string
//     const searchKey = params?.search || ""; // Default search to an empty string
//     const page = Number(params?.page) > 0 ? Number(params.page) : 1; // Default page to 1
//     const size = Number(params?.size) > 0 ? Number(params.size) : 5; // Default size to 5

//     // API request with validated and sanitized params
//     const res = await axiosPublic.get(PRODUCT_LIST, {
//       params: {
//         sort,
//         category: categoryIdParam,
//         searchKey,
//         page,
//         size,
//       },

//       paramsSerializer: (params) => {
//         // Serialize params to handle arrays and sanitize input
//         return Object.entries(params)
//           .filter(([_, value]) => value !== undefined && value !== null)
//           .map(([key, value]) => {
//             if (Array.isArray(value)) {
//               return value.map((v) => `${key}=${encodeURIComponent(v)}`).join("&");
//             }
//             return `${key}=${encodeURIComponent(value)}`;
//           })
//           .join("&");
//       },
//     });

//     // Return the response data
//     return res.data; // Assuming the API returns the data in `res.data`
//   } catch (e) {
//     // Log and return a meaningful error message
//     console.error("Error fetching product list:", e?.message);
//     return {
//       error: true,
//       message: e?.message || "An unexpected error occurred while fetching the product list.",
//       data: [],
//     };
//   }
// };
