import { useState, useCallback } from 'react';
import { useCart } from '@/contextProviders/useCartContext';

export const useCartManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    cart,
    removeFromCart: removeFromCartContext,
    updateCartItem,
    handleGetOrderCalculateData,
    handleUpdateCartInBackend,
    calculatedData,
  } = useCart();

  // Optimistic update for quantity changes
  const updateQuantity = useCallback(async (itemUid, newQuantity, itemData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Calculate new price based on base price and quantity
      const newPrice = itemData.productBasePrice * newQuantity;
      
      const updateData = {
        sellQty: newQuantity,
        productPrice: newPrice,
      };

      await updateCartItem(itemUid, updateData);
      
      // Recalculate order totals
      await handleGetOrderCalculateData("STANDARD");
      
    } catch (err) {
      setError(err.message || 'Failed to update quantity');
      console.error('Error updating quantity:', err);
    } finally {
      setIsLoading(false);
    }
  }, [updateCartItem, handleGetOrderCalculateData]);

  // Remove item with optimistic update
  const removeItem = useCallback(async (itemUid) => {
    setIsLoading(true);
    setError(null);

    try {
      removeFromCartContext(itemUid);
      
      // Recalculate order totals
      await handleGetOrderCalculateData("STANDARD");
      
    } catch (err) {
      setError(err.message || 'Failed to remove item');
      console.error('Error removing item:', err);
    } finally {
      setIsLoading(false);
    }
  }, [removeFromCartContext, handleGetOrderCalculateData]);

  // Apply promo code
  const applyPromoCode = useCallback(async (promoCode) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await handleGetOrderCalculateData("STANDARD", promoCode);
      
      if (res?.status === 201) {
        await handleUpdateCartInBackend(promoCode);
        return { success: true };
      } else {
        throw new Error('Invalid promo code');
      }
    } catch (err) {
      setError(err.message || 'Failed to apply promo code');
      console.error('Error applying promo code:', err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [handleGetOrderCalculateData, handleUpdateCartInBackend]);

  // Clear promo code
  const clearPromoCode = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await handleGetOrderCalculateData("STANDARD");
      await handleUpdateCartInBackend();
    } catch (err) {
      setError(err.message || 'Failed to clear promo code');
      console.error('Error clearing promo code:', err);
    } finally {
      setIsLoading(false);
    }
  }, [handleGetOrderCalculateData, handleUpdateCartInBackend]);

  return {
    cart,
    calculatedData,
    isLoading,
    error,
    updateQuantity,
    removeItem,
    applyPromoCode,
    clearPromoCode,
  };
};
