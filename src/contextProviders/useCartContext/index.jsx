"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCookie } from "cookies-next";

import { CART_INFO, USER_INFO } from "@/common/config/constants/cookiesKeys";
import useUpdateCart from "@/app/(public)/cart/hooks/useCartUpdate";
import useGetOrderCalculatedData from "@/app/(public)/orders/hooks/useGetCalculation";
import useCreateGuestUserOrder from "@/app/(public)/orders/hooks/useMakeGuestUserOrder";
import useGetPrescription from "@/app/(public)/profile/hooks/useGetPrescription";
import { GET_CART_ITEM_URL } from "@/common/config/constants/apiUrls";
import axiosPrivate from "@/common/config/axios.publicInstance";
import { useUserContext } from "../userContextProvider";
import { formatNumber } from "@/utils";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState();
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const [loading, setLoading] = useState(false);

  const { updateCart } = useUpdateCart();
  const {
    getCalculatedData,
    calculatedData,
    loading: getCalculationLoading,
  } = useGetOrderCalculatedData();
  const { createGuestOrder, createGuestOrderLoading } =
    useCreateGuestUserOrder();
  const { prescription, loading: prescriptionGetLoading } =
    useGetPrescription();
  const { user, isAuthenticated } = useUserContext();

  // Load cart from localStorage only on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem(CART_INFO);
      try {
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("Failed to parse cart data from localStorage:", error);
        setCart();
      }
    }
  }, []);

  // Sync cart with localStorage whenever it changes
  useEffect(() => {
    if (cart) {
      localStorage.setItem(CART_INFO, JSON.stringify(cart));
    }
  }, [cart]);

  const handleToggleCartDrawer = () => {
    setOpenCartDrawer(!openCartDrawer);
  };

  const syncCartWithBackend = () => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        handleUpdateCartInBackend();
      }, 10);

      return () => clearTimeout(timer); // Return a cleanup function
    }
  };

  // Add product to cart (allow duplicates)
  const addToCart = (product) => {
    const isArray = Array.isArray(cart);
    if (isArray) {
      setCart((prevCart) => [
        ...prevCart,
        product,
        // { ...product, quantity: product.quantity || 1 },
      ]);
    } else {
      setCart([product]);
    }

    syncCartWithBackend();
  };

  // Remove a specific cart item by its unique ID
  const removeFromCart = (uid) => {
    setCart((prevCart) => prevCart.filter((item) => item.uid !== uid));

    syncCartWithBackend();
  };

  // Update an existing cart item's quantity or details
  const updateCartItem = (uid, updatedFields) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.uid === uid ? { ...item, ...updatedFields } : item
      )
    );

    syncCartWithBackend();
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_INFO);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const total = cart?.reduce((total, item) => total + item.productPrice, 0);
    return total;
  };

  // This function use for transform the update cart response like my cart list data
  const transformCartResponse = (response) => {
    // Extract prescription fields, excluding price fields
    const transformedCart = response?.cartDetailsList?.map((item) => {
      const prescriptionData = Object.fromEntries(
        Object.entries(item.prescription || {}).filter(
          ([key, value]) =>
            value !== null && !key.toLowerCase().includes("price")
        )
      );

      // console.log(prescriptionData);

      return {
        product: {
          id: item.product?.id,
        },
        // productColorId: item.productColorId,
        // prescription:item.prescription,
        ...(item?.productColorId && {
          productColorId: Number(item?.productColorId),
        }),
        productColor: item.productColor,
        productSize: item.productSize,
        sellQty: Number(item.sellQty),
        thumbnailImage: item.thumbnailImage,
        prescription: prescriptionData || {},
        productName: item.productName,
        productPrice: item.totalFinalProductPrice,
        singleProductPrice: item.totalPrice / item.sellQty,
        productBasePrice:
          item?.product?.priceAfterDiscount ?? item?.product?.regularPrice,
        totalQuantity: item?.currentStockQty,
        uid: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      };
    });

    setCart(transformedCart);

    return transformedCart;
  };

  // call this fuction for cart drawer component and after login user
  const handleUpdateCartInBackend = async (promoCode = null) => {
    let _cartInfo = null;
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem(CART_INFO);
      try {
        if (storedCart) {
          _cartInfo = JSON.parse(storedCart);
        }
      } catch (error) {
        console.error("Failed to parse cart data from localStorage:", error);
      }
    }

    // Retrieve user info from cookies
    const _user = getCookie(USER_INFO);

    // Check if the cookie exists and parse it safely
    let user_info = null;
    if (_user) {
      try {
        user_info = JSON.parse(_user);
      } catch (error) {
        console.error("Failed to parse user info from cookies:", error);
        user_info = null;
      }
    }

    setLoading(true);

    const productMap = _cartInfo?.map((product) => ({
      product: { id: product.product.id },
      ...(product.productColorId && { productColorId: product.productColorId }),
      sellQty: product.sellQty,
      thumbnailImage: product.thumbnailImage,
      prescription: product?.prescription,
    }));

    const cartData = {
      customer: {
        id: user_info?.id,
        email: user_info?.email,
      },
      cartDetailsList: [...productMap],
      ...(promoCode && { promo: { code: promoCode } }),
    };

    const response = await updateCart(cartData);

    const res = transformCartResponse(response);

    setLoading(false);
  };

  const handleGetPriceForSelectedPrescriptions = (prescriptionInput) => {
    const structureData = {
      cyl: prescription?.cyl?.content,
      axis: prescription?.axis?.content,
      pd: prescription?.pd?.content,
      sph: prescription?.sph?.content,
    };

    // Function to get price for a prescription value
    const getPrice = (value, category) => {
      const item = structureData[category]?.find(
        (entry) => entry.value === value
      );
      return item ? item.price : 0;
    };

    // Extract prices for each input prescription value
    const totalPrescriptedValuePrice =
      getPrice(prescriptionInput.rightEyeSPH, "sph") +
      getPrice(prescriptionInput.rightEyeCYL, "cyl") +
      getPrice(prescriptionInput.rightEyeAxis, "axis") +
      getPrice(prescriptionInput.leftEyeSPH, "sph") +
      getPrice(prescriptionInput.leftEyeCYL, "cyl") +
      getPrice(prescriptionInput.leftEyeAxis, "axis") +
      getPrice(prescriptionInput.pdDistance, "pd") +
      getPrice(prescriptionInput.leftPdDistance, "pd") +
      getPrice(prescriptionInput.rightPdDistance, "pd");

    return totalPrescriptedValuePrice;
  };

  const handleGetOrderCalculateData = async (deliveryMethod, promoCode) => {
    // cart info
    let _cartInfo = null;
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem(CART_INFO);
      try {
        if (storedCart) {
          _cartInfo = JSON.parse(storedCart);
        }
      } catch (error) {
        console.error("Failed to parse cart data from localStorage:", error);
      }
    }

    const productMap = _cartInfo?.map((product) => ({
      product: { id: product.product.id },
      ...(product.productColorId && {
        productColorId: Number(product.productColorId),
      }),
      productSize: product.productSize,
      sellQty: product.sellQty,
      thumbnailImage: product.thumbnailImage,
      prescription: product?.prescription,
    }));

    const data = {
      cartDetailsList: [...productMap],
      ...(promoCode && { promo: { code: promoCode } }),
      deliveryMethod,
      ...(user
        ? { customer: { id: user.id, email: user.email } }
        : { customer: null }),
    };

    const res = await getCalculatedData(data);

    return res;
  };

  // Order for guest
  const handleMakeOrderForGuestUser = async (data) => {
    const response = await createGuestOrder(data);
    return response;
  };

  // Get Cart Item for auth user.
  const getCartListForAuthUser = async () => {
    setLoading(true);
    // Retrieve user info from cookies
    const _user = getCookie(USER_INFO);

    let user_info = null;
    if (_user) {
      try {
        user_info = JSON.parse(_user);
      } catch (error) {
        console.error("Failed to parse user info from cookies:", error);
        user_info = null;
      }
    }

    try {
      const response = await axiosPrivate.get(
        `${GET_CART_ITEM_URL}/${user_info?.id}`
      );
      // console.log(response?.data);
      transformCartResponse(response?.data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch cart items"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        openCartDrawer,
        calculatedData,
        getCalculationLoading,
        setOpenCartDrawer,
        handleToggleCartDrawer,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        calculateTotalPrice,
        handleUpdateCartInBackend,
        handleGetOrderCalculateData,
        handleMakeOrderForGuestUser,
        handleGetPriceForSelectedPrescriptions,
        getCartListForAuthUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use CartContext
export const useCart = () => useContext(CartContext);
