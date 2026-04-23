"use client";
import { useProductContext } from "@/providers/ProductContext";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCardPrimary = ({ product }) => {
  const { title, image, id } = product
    ? product
    : {};
  const { setCurrentProduct } = useProductContext();
 

  return (
    <div
      className="ltn__product-item ltn__product-item-3 text-center"
      onMouseEnter={() => setCurrentProduct(product)}
    >
      <div className="product-img">
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt="#"
            width={1000}
            height={1000}
          />
        </Link>
       
       
      </div>
      <div className="product-info">
     
        <h2 className="product-title">
          <Link href={`/products/${id}`}>{title}</Link>
        </h2>
        
      </div>
    </div>
  );
};

export default ProductCardPrimary;
