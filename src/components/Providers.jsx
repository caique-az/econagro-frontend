'use client';

import { CartProvider } from '../context/CartContext';
import { SearchProvider } from '../context/SearchContext';

export function Providers({ children }) {
  return (
    <SearchProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </SearchProvider>
  );
}
