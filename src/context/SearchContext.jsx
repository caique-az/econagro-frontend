"use client";

import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearch = (term) => setSearchTerm(term);
  const clearSearch = () => setSearchTerm("");

  return (
    <SearchContext.Provider value={{ searchTerm, updateSearch, clearSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
