"use client";
import makePath from "@/libs/makePath";
import { useCommonContext } from "@/providers/CommonContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ProductCategories = ({ className = "", isDropdown = false }) => {
  const { currentPath, category: currentCategory } = useCommonContext();
  const router = useRouter();
  const categories = [
    "All Products",
    "Fruit Powder",
    "Vegetable Powder",
    "Honey",
    "Spices",
    "Herbal Powder",
  ];
  const productPath = currentPath ? currentPath : "/shop";
  const selectedCategory = currentCategory || "";
  const handleCategoryChange = (event) => {
    const categoryPath = event.target.value;

    router.push(
      categoryPath ? `${productPath}?category=${categoryPath}` : productPath
    );
  };

  if (isDropdown) {
    return (
      <div className={`widget ltn__menu-widget ltn__product-category-select ${className}`}>
        <label htmlFor="product-category-filter"></label>
        <select
          id="product-category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories?.map((category, idx) => {
            const categoryPath = idx === 0 ? "" : makePath(category);

            return (
              <option value={categoryPath} key={categoryPath || "all-products"}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

  return (
    <div className={`widget ltn__menu-widget ${className}`}>
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Product categories
      </h4>
      <ul>
        {categories?.map((category, idx) => {
          const categoryPath = idx === 0 ? "" : makePath(category);

          return (
            <li key={categoryPath || "all-products"}>
              <Link
                href={
                  categoryPath
                    ? `${productPath}?category=${categoryPath}`
                    : productPath
                }
                className={currentCategory === categoryPath ? "active" : ""}
              >
                {category}{" "}
                <span>
                  <i className="fas fa-long-arrow-alt-right"></i>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductCategories;
