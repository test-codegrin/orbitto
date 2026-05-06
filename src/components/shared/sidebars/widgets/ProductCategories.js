"use client";
import makePath from "@/libs/makePath";
import { useCommonContext } from "@/providers/CommonContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const ProductCategories = ({ className = "", isDropdown = false }) => {
  const { currentPath, category: currentCategory } = useCommonContext();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
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
  const selectedCategoryLabel =
    categories.find((category, idx) => {
      const categoryPath = idx === 0 ? "" : makePath(category);
      return categoryPath === selectedCategory;
    }) || categories[0];
  const handleCategorySelect = (categoryPath) => {
    setIsOpen(false);
    router.push(
      categoryPath ? `${productPath}?category=${categoryPath}` : productPath
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isDropdown) {
    return (
      <div
        className={`widget ltn__menu-widget ltn__product-category-select ${className}`}
        ref={dropdownRef}
      >
        <button
          type="button"
          className={`ltn__product-category-toggle ${
            isOpen ? "active" : ""
          }`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span>{selectedCategoryLabel}</span>
          <i className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
        </button>
        <ul
          className={`ltn__product-category-dropdown ${isOpen ? "active" : ""}`}
          role="listbox"
        >
          {categories?.map((category, idx) => {
            const categoryPath = idx === 0 ? "" : makePath(category);

            return (
              <li
                key={categoryPath || "all-products"}
                role="option"
                aria-selected={selectedCategory === categoryPath}
              >
                <button
                  type="button"
                  className={
                    selectedCategory === categoryPath ? "active" : ""
                  }
                  onClick={() => handleCategorySelect(categoryPath)}
                >
                  {category}
                </button>
              </li>
            );
          })}
        </ul>
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
                className={
                  (categoryPath && currentCategory === categoryPath) ||
                  (!categoryPath && !currentCategory)
                    ? "active"
                    : ""
                }
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
