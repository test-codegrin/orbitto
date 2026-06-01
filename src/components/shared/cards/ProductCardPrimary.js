"use client";
import { useProductContext } from "@/providers/ProductContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FALLBACK_IMAGE_SRC =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='1000'><rect width='100%25' height='100%25' fill='%23f3f3f3'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='42' font-family='Arial'>Image unavailable</text></svg>";

const ProductCardPrimary = ({
  product,
  hideCardWhenImageUnavailable = false,
  onImageUnavailable,
  imageFitVariant,
  onProductClick,
  onImageReady,
}) => {
  const { title, image, id, slug, path } = product || {};
  const normalizedPath = typeof path === "string" ? path.trim() : "";
  const isUnsafePath =
    normalizedPath === "#" ||
    normalizedPath.toLowerCase().startsWith("javascript:");
  const productPath =
    normalizedPath && !isUnsafePath
      ? normalizedPath
      : `/products/${slug || id || ""}`;
  const { setCurrentProduct } = useProductContext();
  const [isImageUnavailable, setIsImageUnavailable] = useState(
    hideCardWhenImageUnavailable && !image
  );
  const [resolvedImage, setResolvedImage] = useState(image || FALLBACK_IMAGE_SRC);

  useEffect(() => {
    setIsImageUnavailable(hideCardWhenImageUnavailable && !image);
    setResolvedImage(image || FALLBACK_IMAGE_SRC);
  }, [hideCardWhenImageUnavailable, image, id]);

  const handleImageError = () => {
    setResolvedImage(FALLBACK_IMAGE_SRC);
    if (onImageReady) onImageReady(id);
    if (!hideCardWhenImageUnavailable) return;
    setIsImageUnavailable(true);
    if (onImageUnavailable && id) {
      onImageUnavailable(id);
    }
  };

  const handleImageLoad = () => {
    if (onImageReady) onImageReady(id);
  };

  const handleProductClick = (event) => {
    if (!onProductClick) return;
    event.preventDefault();
    onProductClick(product);
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
        <Link href={productPath} prefetch={!onProductClick} onClick={handleProductClick}>
          <span className="product-img-state-wrap" style={{ display: "block", position: "relative" }}>
            <Image
              src={resolvedImage}
              alt={title || "product image"}
              width={1000}
              height={1000}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            {!image ? (
            <span
              className="product-img-empty"
              aria-label="No product image"
              style={{ display: "none" }}
            />
            ) : null}
          </span>
        </Link>
      </div>

      <div className="product-info">
        <h2 className="product-title">
          <Link href={productPath} prefetch={!onProductClick} onClick={handleProductClick}>
            {title || "No Title"}
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default ProductCardPrimary;
