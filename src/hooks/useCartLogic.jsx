import { useState, useCallback } from 'react';

export const useCartLogic = () => {
  const [shipping, setShipping] = useState(5);
  const [promoCode, setPromoCode] = useState('');

  const calculateTotal = useCallback((cart) => {
    const subtotal = cart.reduce((sum, item) => {
      // Se o preço for string, converte para número
      // Se já for número, usa diretamente
      const price = typeof item.price === 'string' 
        ? parseFloat(item.price.replace('R$ ', '').replace(',', '.'))
        : Number(item.price);
      
      return sum + (price * item.quantity);
    }, 0);
    
    return {
      subtotal,
      shipping,
      total: subtotal + shipping
    };
  }, [shipping]);

  return {
    shipping,
    setShipping,
    promoCode,
    setPromoCode,
    calculateTotal
  };
};