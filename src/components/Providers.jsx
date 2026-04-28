"use client";

import { CartProvider } from "../context/CartContext";
import { SearchProvider } from "../context/SearchContext";
import { AuthProvider } from "../context/AuthContext";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <SearchProvider>
        <CartProvider>{children}</CartProvider>
      </SearchProvider>
    </AuthProvider>
  );
}
