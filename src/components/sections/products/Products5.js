"use client";

import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import useProducts from "@/hooks/useProducts";
import React from "react";

const Products5 = ({ isRelated, pt, pb }) => {
  const { products } = useProducts({ limit: 6 });

  return (
    <div
      className={`ltn__product-slider-area ltn__product-gutter ${
        pb ? pb : ""
      }  ${pt ? pt : isRelated ? "pb-70" : "pt-115 pb-70"}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className={` ${
                isRelated ? "mt-20" : "text-center"
              }`}
            >
              {/* ✅ h1 moved here, inside container */}
              <h1 className="section-title">Related Products</h1>
            </div>
          </div>
        </div>
        <div className="row ltn__product-slider-item-four-active slick-arrow-1">
          {products?.map((product, idx) => (
            <div key={idx} className="col-lg-12">
              <ProductCardPrimary product={product} isShowDisc={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products5;
