"use client";

import React from "react";
import { UserProvider } from "./userContextProvider";
import { CartProvider } from "./useCartContext";
import { WishlistProvider } from "./useWishListProvider";
import { SingleCartProductProvider } from "./useSingleCartProductProvider";
import { PrescriptionProvider } from "./usePrescriptionProvider";

const ContextWrapper = ({ children }) => {
  return (
    <React.Suspense fallback={<h1>Loading....</h1>}>
      <UserProvider>
        <WishlistProvider>
          <CartProvider>
            <PrescriptionProvider>
              <SingleCartProductProvider>{children}</SingleCartProductProvider>
            </PrescriptionProvider>
          </CartProvider>
        </WishlistProvider>
      </UserProvider>
    </React.Suspense>
  );
};

export default ContextWrapper;
