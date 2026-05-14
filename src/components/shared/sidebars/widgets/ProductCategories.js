"use client";
import { normalizeProductType } from "@/libs/productType";
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
    { label: "All Products", value: "" },
    { label: "Fruit", value: "fruit" },
    { label: "Vegetable", value: "vegetable" },
    { label: "Fruit Powder", value: "fruit_powder" },
    { label: "Vegetable Powder", value: "vegetable_powder" },
    { label: "Honey", value: "honey" },
    { label: "Spices", value: "spices" },
    { label: "Herbal Powder", value: "herbal_powder" },
  ];
  const productPath = currentPath ? currentPath : "/shop";
  const selectedCategory = normalizeProductType(currentCategory) || "";
  const selectedCategoryLabel =
    categories.find(
      ({ value }) => normalizeProductType(value) === selectedCategory
    )?.label ||
    categories[0].label;
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
          {categories?.map(({ label, value }) => {
            const isActive = selectedCategory === normalizeProductType(value);

            return (
              <li
                key={value || "all-products"}
                role="option"
                aria-selected={isActive}
              >
                <button
                  type="button"
                  className={isActive ? "active" : ""}
                  onClick={() => handleCategorySelect(value)}
                >
                  {label}
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
        {categories?.map(({ label, value }) => {
          return (
            <li key={value || "all-products"}>
              <Link
                href={value ? `${productPath}?category=${value}` : productPath}
                className={
                  (value && selectedCategory === normalizeProductType(value)) ||
                  (!value && !currentCategory)
                    ? "active"
                    : ""
                }
              >
                {label}{" "}
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
