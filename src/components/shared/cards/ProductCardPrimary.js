"use client";
import { useProductContext } from "@/providers/ProductContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProductCardPrimary = ({
  product,
  hideCardWhenImageUnavailable = false,
  onImageUnavailable,
}) => {
  const { title, image, id } = product || {};
  const { setCurrentProduct } = useProductContext();
  const [isImageUnavailable, setIsImageUnavailable] = useState(
    hideCardWhenImageUnavailable && !image
  );

  useEffect(() => {
    setIsImageUnavailable(hideCardWhenImageUnavailable && !image);
  }, [hideCardWhenImageUnavailable, image, id]);

  const handleImageError = () => {
    if (!hideCardWhenImageUnavailable) return;
    setIsImageUnavailable(true);
    if (onImageUnavailable && id) {
      onImageUnavailable(id);
    }
  };

  if (hideCardWhenImageUnavailable && isImageUnavailable) {
    return null;
  }

  return (
    <div
      className="ltn__product-item ltn__product-item-3 text-center"
      onMouseEnter={() => product && setCurrentProduct(product)}
    >
      <div className="product-img">
        <Link href={`/products/${id || ""}`}>
          <Image
            src={hideCardWhenImageUnavailable ? image : image || "/placeholder.png"}
            alt={title || "product image"}
            width={1000}
            height={1000}
            onError={handleImageError}
          />
        </Link>
      </div>

      <div className="product-info">
        <h2 className="product-title">
          <Link href={`/products/${id || ""}`}>
            {title || "No Title"}
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default ProductCardPrimary;
