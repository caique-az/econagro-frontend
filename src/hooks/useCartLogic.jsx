import { useState, useCallback } from "react";
import { parsePrice } from "../utils/priceUtils";

export const useCartLogic = () => {
  const [shipping, setShipping] = useState(5);

  const calculateTotal = useCallback(
    (cart) => {
      const subtotal = cart.reduce((sum, item) => {
        return sum + parsePrice(item.price) * item.cartQuantity;
      }, 0);

      const total = subtotal + shipping;

      return { subtotal, total };
    },
    [shipping],
  );

  return {
    shipping,
    setShipping,
    calculateTotal,
  };
};
