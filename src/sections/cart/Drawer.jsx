"use client";

import React from "react";
import Button from "@/components/common/Button";
import { Divider, Drawer } from "antd";
import { MdClose } from "react-icons/md";
import { useCart } from "@/contextProviders/useCartContext";
import SingleCartItemCard from "./singleCartItemCard";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contextProviders/userContextProvider";
import useNotification from "@/hooks/useNotification";
import { formatNumber } from "@/utils";

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

  const drawerStyles = {
    mask: {
      backdropFilter: "blur(2px)",
    },
    content: {
      boxShadow: "-10px 0 10px #666",
    },
    header: {
      // borderBottom: `1px solid #515151`,
      padding: "10px 10px 15px 16px",
    },
    body: {
      fontSize: "10px",
      padding: "0px 24px 0px 24px",
    },
    footer: {
      // borderTop: `1px solid #515151`,
    },
  };

  const classNames = {
    body: { backgroundColor: "#000" },
    // mask: styles["my-drawer-mask"],
    // header: styles["my-drawer-header"],
    // footer: styles["my-drawer-footer"],
    // content: styles["my-drawer-content"],
  };

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
    <Drawer
      title={
        <div className="flex flex-row items-center justify-between">
          <h2>My Cart ({cart?.length})</h2>
          <button className="p-1" onClick={handleToggleCartDrawer}>
            <MdClose className="h-6 w-6" />
          </button>
        </div>
      }
      placement="right"
      footer={
        <div className="flex flex-col gap-6">
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
        </div>
      }
      onClose={handleToggleCartDrawer}
      open={openCartDrawer}
      classNames={classNames}
      styles={drawerStyles}
      closeIcon={null}
      width={500}
    >
      <div className="w-full flex flex-col">
        {/* PageCard props means this card component use in cart page or not. */}

        {cart?.map((singleCartItem, index) => {
          return (
            <div key={index} className="py-5  border-b">
              <SingleCartItemCard
                cartInfo={singleCartItem}
                pageCard={false}
                showButton={true}
              />
            </div>
          );
        })}
      </div>
    </Drawer>
  );
};

export default DrawerComponent;
