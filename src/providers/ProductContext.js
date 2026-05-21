"use client";
import React, { createContext, useContext, useState } from "react";
const productContext = createContext(null);
const ProductContext = ({ children }) => {
  const [currentProduct, setCurrentProduct] = useState(null);
  return (
    <productContext.Provider value={{ currentProduct, setCurrentProduct }}>
      {children}
    </productContext.Provider>
  );
};
export const useProductContext = () => {
  return useContext(productContext);
};
export default ProductContext;
