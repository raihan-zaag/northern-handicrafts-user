"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/contextProviders/useCartContext";
import { useUserContext } from "@/contextProviders/userContextProvider";
import Container from "@/common/components/shared/Container";
import { 
  CartItemCard, 
  OrderSummaryCard, 
  EmptyCartState 
} from "./components";

const MyCart = () => {
  const { isAuthenticated } = useUserContext();
  const {
    cart,
    handleGetOrderCalculateData,
    calculatedData,
    getCartListForAuthUser,
    handleUpdateCartInBackend,
    removeFromCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        const res = await getCartListForAuthUser();

        if (res?.promo?.code) {
          setPromoCode(res?.promo?.code);
        } else {
          setPromoCode("");
        }

        // Execute calculation after a small delay
        setTimeout(() => {
          handleGetOrderCalculateData(
            "STANDARD",
            res?.promo?.code ? res?.promo?.code : null
          );
        }, 10);
      }
    };
    fetchData();
  }, [isAuthenticated, getCartListForAuthUser, handleGetOrderCalculateData]);

  const handleUpdateCalculation = async () => {
    const res = await handleGetOrderCalculateData("STANDARD", promoCode || null);
    
    if (res?.status === 201 && promoCode) {
      handleUpdateCartInBackend(promoCode);
    }
  };

  const handlePromoCodeChange = (newPromoCode) => {
    setPromoCode(newPromoCode);
    
    if (!newPromoCode) {
      handleGetOrderCalculateData("STANDARD");
      handleUpdateCartInBackend();
    }
  };

  const handleApplyPromoCode = async () => {
    if (promoCode.trim()) {
      const res = await handleGetOrderCalculateData("STANDARD", promoCode);

      if (res?.status === 201) {
        handleUpdateCartInBackend(promoCode);
      }
    }
  };

  const handleRemoveItem = (uid) => {
    removeFromCart(uid);
    handleUpdateCalculation();
  };

  const hasItems = cart?.length > 0;

  return (
    <Container>
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-2xl font-semibold text-gray-900">
          Shopping Cart
        </h1>
      </div>

      {hasItems ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-24">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-100">
              {cart.map((cartItem, index) => (
                <CartItemCard
                  key={cartItem.uid || index}
                  cartInfo={cartItem}
                  onQuantityChange={handleUpdateCalculation}
                  onRemove={handleRemoveItem}
                  className={index === cart.length - 1 ? "border-b-0" : ""}
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummaryCard
              total={calculatedData?.totalProductPriceAfterPromo || 0}
              subTotal={
                (calculatedData?.totalProductPrice || 0) +
                (calculatedData?.totalExtraCharge || 0)
              }
              taxPercentage={calculatedData?.taxPercentage}
              taxAmount={calculatedData?.taxAmount}
              shippingCost={calculatedData?.shippingCost}
              discount={calculatedData?.promoDiscountAmount || 0}
              promoCode={promoCode}
              onPromoCodeChange={handlePromoCodeChange}
              onApplyPromoCode={handleApplyPromoCode}
              fromCartPage={true}
            />
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <EmptyCartState />
        </div>
      )}
    </Container>
  );
};

export default MyCart;
