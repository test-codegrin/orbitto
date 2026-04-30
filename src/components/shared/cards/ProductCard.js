"use client";
import { useProductContext } from "@/providers/productContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  const { title, desc, image, id, status } = product;
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
            alt={title}
            loading="lazy"
            width={1000}
            height={1000}
          />
        </Link>
        {status && (
          <div className="product-badge">
            <ul>
              <li className="soldout-badge">{status}</li>
            </ul>
          </div>
        )}
      </div>
      <div className="product-info">
        <h2 className="product-title">
          <Link href={`/products/${id}`}>{title}</Link>
        </h2>
        <p className="product-desc">{desc}</p>
      </div>
    </div>
  );
};

export default ProductCard;