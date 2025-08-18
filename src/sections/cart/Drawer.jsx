"use client";

import React from "react";
import Button from "@/components/common/Button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { MdClose } from "react-icons/md";
import { useCart } from "@/contextProviders/useCartContext";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contextProviders/userContextProvider";
import useNotification from "@/hooks/useNotification";
import { formatNumber } from "@/utils";
import SingleCartItemCard from "./SingleCartItemCard";

const DrawerComponent = () => {
  const router = useRouter();
  const {
    openCartDrawer,
    handleToggleCartDrawer,
    cart,
    calculateTotalPrice,
    setOpenCartDrawer,
    // handleUpdateCartInBackend,
  } = useCart();
  const { isAuthenticated } = useUserContext();
  const { openInfoNotification } = useNotification();

  // fire user request for goto my-cart page
  // For this action user need to authenticate
  const handleViewCart = () => {
    if (cart?.length > 0) {
      if (isAuthenticated) {
        // handleUpdateCartInBackend();
        router.push("/my-cart");
      } else {
        router.push("/login?redirect=/my-cart");
      }
    } else {
      openInfoNotification(
        "Info",
        "You have to add some product in cart list for this operation."
      );
    }

    setOpenCartDrawer(false);
  };

  const handleCheckoutPage = () => {
    if (cart?.length > 0) {
      if (isAuthenticated) {
        // handleUpdateCartInBackend();
        router.push("/checkout");
      } else {
        router.push("/login?redirect=/checkout");
      }
    } else {
      openInfoNotification(
        "Info",
        "You have to add some product in cart list for this operation."
      );
    }

    setOpenCartDrawer(false);
  };

  return (
    <Sheet open={openCartDrawer} onOpenChange={setOpenCartDrawer}>
      <SheetContent side="right" className="w-[500px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex flex-row items-center justify-between">
            <h2>My Cart ({cart?.length})</h2>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="w-full flex flex-col">
            {/* PageCard props means this card component use in cart page or not. */}
            {cart?.map((singleCartItem, index) => {
              return (
                <div key={index} className="py-5 border-b">
                  <SingleCartItemCard
                    cartInfo={singleCartItem}
                    pageCard={false}
                    showButton={true}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <SheetFooter className="flex flex-col gap-6 mt-4">
          <div className="flex flex-row items-center justify-between p-4 bg-[#F7F8FA]">
            <p className="font-semibold">Subtotal</p>
            <p className="font-semibold">
              $ {formatNumber(calculateTotalPrice())}
            </p>
          </div>

          {/* Buttons */}
          <div className="w-full flex flex-row gap-2">
            {isAuthenticated && (
              <Button
                className={"w-full"}
                type="outline"
                onClick={handleViewCart}
              >
                View Cart
              </Button>
            )}
            <Button
              className={"w-full"}
              type="primary"
              onClick={handleCheckoutPage}
            >
              Checkout
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DrawerComponent;
