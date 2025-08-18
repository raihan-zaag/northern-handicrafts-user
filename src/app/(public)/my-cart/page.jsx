"use client";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import OrderSummary from "@/components/orderSummary";
import { useCart } from "@/contextProviders/useCartContext";
import { useUserContext } from "@/contextProviders/userContextProvider";
import SingleCartItemCard from "@/sections/cart/SingleCartItemCard";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MyCart = () => {
  const { isAuthenticated } = useUserContext();
  const {
    cart,
    handleGetOrderCalculateData,
    calculatedData,
    getCartListForAuthUser,
    handleUpdateCartInBackend,
  } = useCart();

  const [promoCode, setPromoCode] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        const res = await getCartListForAuthUser();
        // console.log({ res });

        if (res?.promo?.code) {
          setPromoCode(res?.promo?.code);
          // console.log(res?.promo?.code);
        } else {
          setPromoCode(null);
        }

        // Execute after a 10ms delay
        setTimeout(() => {
          handleGetOrderCalculateData(
            "STANDARD",
            res?.promo?.code ? res?.promo?.code : null
          );
        }, 10);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  const handleGetPromoCode = async () => {
    if (promoCode) {
      const res = await handleGetOrderCalculateData("STANDARD", promoCode);

      if (res?.status === 201) {
        handleUpdateCartInBackend(promoCode);
      }
    } else {
      const res = await handleGetOrderCalculateData("STANDARD");

      // if (res?.status === 201) {
      //   handleUpdateCartInBackend();
      // }
    }
  };

  const handleChangePromoCode = async (e) => {
    e.preventDefault();
    setPromoCode(e.target.value);

    if (!e.target.value) {
      const res = await handleGetOrderCalculateData("STANDARD");

      if (res?.status === 201) {
        handleUpdateCartInBackend();
      }
    }

    if (cart?.length < 0) {
      setPromoCode("");
    }
  };

  const promoCodeUI = (
    <div className="flex flex-col items-start gap-1 mb-4">
      <p>Discount code</p>
      <div className="flex flex-col md:flex-row items-center w-full gap-4 md:gap-2">
        <Input
          className="h-14 w-full flex-1"
          placeholder="Enter a promo code"
          onChange={handleChangePromoCode}
          value={cart?.length > 0 && promoCode ? promoCode : ""}
        />

        <Button
          type="outline"
          className={"w-full md:w-[30%]"}
          onClick={handleGetPromoCode}
          disabled={!promoCode}
        >
          Apply
        </Button>
      </div>
    </div>
  );

  return (
    <Container>
      <h2 className="text-center font-semibold text-base md:text-base lg:text-2xl">
        Shopping Cart
      </h2>

      <div className="grid grid-cols-3 gap-6 md:gap-[100px] mt-[50px]">
        {/* Cart List */}
        <div className="col-span-3 md:col-span-3 lg:col-span-2">
          {cart?.length > 0 ? (
            <div className="mt- ">
              {cart?.map((singleCartItem, index) => {
                return (
                  <div key={index} className="py-5 border-b">
                    <SingleCartItemCard
                      cartInfo={singleCartItem}
                      pageCard={true}
                      showButton={true}
                      // promoCode={promoCode}
                      getUpdateedCalculation={handleGetPromoCode}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white h-[400px] flex flex-col items-center justify-center gap-6">
              <h1 className="font-medium text-xl text-slate-500">
                No items added
              </h1>
              <Link href={"/"}>
                <Button
                  className={
                    " md:py-3 py-2 md:px-9 px-6 bg-magenta-600 rounded-sm text-black-500 md:text-base text-sm font-semibold"
                  }
                >
                  START SHOPPING
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="col-span-3 md:col-span-3 lg:col-span-1">
          <OrderSummary
            total={
              cart?.length > 0 ? calculatedData?.totalProductPriceAfterPromo : 0
            }
            subTotal={
              cart?.length > 0
                ? calculatedData?.totalProductPrice +
                  calculatedData?.totalExtraCharge
                : 0
            }
            taxPercentage={calculatedData?.taxPercentage}
            taxAmount={calculatedData?.taxAmount}
            shippingCost={calculatedData?.shippingCost}
            discount={
              cart?.length > 0 ? calculatedData?.promoDiscountAmount : 0
            }
            fromCartPage={true}
            promoCodeUi={promoCodeUI}
          />
        </div>
      </div>
    </Container>
  );
};

export default MyCart;
