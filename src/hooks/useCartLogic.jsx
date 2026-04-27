import { useState, useCallback } from "react";
import { parsePrice } from "../utils/priceUtils";

export const useCartLogic = () => {
  const [shipping, setShipping] = useState(5);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const applyPromoCode = useCallback(() => {
    setPromoError("");
    setPromoSuccess("");

    if (!promoCode.trim()) {
      setPromoError("Digite um código promocional.");
      return;
    }

    // TODO: POST /discounts/validate { code: promoCode }
    setPromoError("Código inválido ou expirado.");
  }, [promoCode]);

  const calculateTotal = useCallback(
    (cart) => {
      const subtotal = cart.reduce((sum, item) => {
        return sum + parsePrice(item.price) * item.quantity;
      }, 0);

      const discount = promoDiscount;
      const total = Math.max(0, subtotal - discount) + shipping;

      return { subtotal, discount, total };
    },
    [shipping, promoDiscount],
  );

  return {
    shipping,
    setShipping,
    promoCode,
    setPromoCode,
    promoDiscount,
    promoError,
    promoSuccess,
    applyPromoCode,
    calculateTotal,
  };
};
