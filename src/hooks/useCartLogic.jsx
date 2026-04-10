import { useState, useCallback } from 'react';
import { parsePrice } from '../utils/priceUtils';

/**
 * Encapsulates cart calculation logic: shipping selection, promo code
 * validation and order total computation.
 *
 * Promo code application is a client-side stub — integrate with the
 * discount endpoint once the backend exposes it.
 *
 * @returns {{
 *   shipping: number,
 *   setShipping: Function,
 *   promoCode: string,
 *   setPromoCode: Function,
 *   promoDiscount: number,
 *   promoError: string,
 *   promoSuccess: string,
 *   applyPromoCode: Function,
 *   calculateTotal: Function,
 * }}
 */
export const useCartLogic = () => {
  const [shipping, setShipping] = useState(5);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  /** Validates and applies a promo code. Stub — replace with API call. */
  const applyPromoCode = useCallback(() => {
    setPromoError('');
    setPromoSuccess('');

    if (!promoCode.trim()) {
      setPromoError('Digite um código promocional.');
      return;
    }

    // TODO: POST /discounts/validate { code: promoCode }
    setPromoError('Código inválido ou expirado.');
  }, [promoCode]);

  /**
   * Calculates order totals for the given cart items.
   *
   * @param {Array<{price: string|number, quantity: number}>} cart
   * @returns {{ subtotal: number, discount: number, shipping: number, total: number }}
   */
  const calculateTotal = useCallback((cart) => {
    const subtotal = cart.reduce((sum, item) => {
      return sum + parsePrice(item.price) * item.quantity;
    }, 0);

    const discount = promoDiscount;
    const total = Math.max(0, subtotal - discount) + shipping;

    return { subtotal, discount, shipping, total };
  }, [shipping, promoDiscount]);

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
