"use client";

import { createContext, useState, useContext, useEffect } from "react";
import authService from "../services/authService";

const TOKEN_KEY = "econagro:token";
const USER_KEY = "econagro:user";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const persist = (tok, userData) => {
    localStorage.setItem(TOKEN_KEY, tok);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setToken(tok);
    setUser(userData);
  };

  const clear = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);

    const restore = storedToken
      ? authService.me().then((data) => ({ tok: storedToken, userData: data.data }))
      : Promise.resolve(null);

    restore
      .then((result) => {
        if (result) {
          setToken(result.tok);
          setUser(result.userData);
        }
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async ({ email, password }) => {
    const data = await authService.login({ email, password });
    persist(data.token, data.data);
    return data;
  };

  const register = async ({ name, email, password }) => {
    const data = await authService.register({ name, email, password });
    persist(data.token, data.data);
    return data;
  };

  const logout = () => {
    clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
