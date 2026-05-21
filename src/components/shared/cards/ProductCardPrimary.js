"use client";
import { useProductContext } from "@/providers/ProductContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProductCardPrimary = ({
  product,
  hideCardWhenImageUnavailable = false,
  onImageUnavailable,
  imageFitVariant,
}) => {
  const { title, image, id, slug, path } = product || {};
  const productPath = path || `/products/${slug || id || ""}`;
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
      className={`ltn__product-item ltn__product-item-3 text-center${
        imageFitVariant === "box" ? " product-card--box-image" : ""
      }`}
      onMouseEnter={() => product && setCurrentProduct(product)}
    >
      <div className="product-img">
        <Link href={productPath}>
          {image ? (
            <Image
              src={image}
              alt={title || "product image"}
              width={1000}
              height={1000}
              onError={handleImageError}
            />
          ) : (
            <span
              className="product-img-empty"
              aria-label="No product image"
            />
          )}
        </Link>
      </div>

      <div className="product-info">
        <h2 className="product-title">
          <Link href={productPath}>
            {title || "No Title"}
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default ProductCardPrimary;
