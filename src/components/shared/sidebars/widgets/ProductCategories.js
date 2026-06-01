"use client";
import useCategories from "@/hooks/useCategories";
import { normalizeProductType } from "@/libs/productType";
import { useCommonContext } from "@/providers/CommonContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const buildProductsFilterPath = (categorySlug) =>
  categorySlug ? `/products?category=${encodeURIComponent(categorySlug)}` : "/products";

const ProductCategories = ({ className = "", isDropdown = false }) => {
  const {
    category: currentCategory,
    productCategories,
    isCategoriesLoading: isCategoriesLoadingFromContext,
  } = useCommonContext();
  const {
    categories: apiCategories,
    isLoading: isCategoriesLoadingFromHook,
  } = useCategories({ enabled: !productCategories });
  const apiCategoryList = productCategories || apiCategories;
  const isCategoriesLoading =
    typeof isCategoriesLoadingFromContext === "boolean"
      ? isCategoriesLoadingFromContext
      : isCategoriesLoadingFromHook;
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const categoryOptions = (apiCategoryList || []).map((category) => ({
    label: category.name,
    value: category.slug,
  }));
  const categories = [
    { label: "All Products", value: "" },
    ...categoryOptions,
  ];
  const selectedCategory = normalizeProductType(currentCategory) || "";
  const selectedCategoryLabel =
    categories.find(
      ({ value }) => normalizeProductType(value) === selectedCategory
    )?.label ||
    categories[0].label;
  const handleCategorySelect = (categoryPath) => {
    setIsOpen(false);
    router.push(buildProductsFilterPath(categoryPath), { scroll: false });
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
          onClick={() => setIsOpen((current) => !current)}
        >
          <span>{selectedCategoryLabel}</span>
          <i className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
        </button>
        <ul className={`ltn__product-category-dropdown ${isOpen ? "active" : ""}`}>
          {isCategoriesLoading ? (
            <li className="product-category-skeleton-wrap" aria-hidden="true">
              <span className="product-category-skeleton" />
              <span className="product-category-skeleton" />
              <span className="product-category-skeleton" />
            </li>
          ) : null}
          {categories?.map(({ label, value }) => {
            const isActive = selectedCategory === normalizeProductType(value);

            return (
              <li key={value || "all-products"}>
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
                href={buildProductsFilterPath(value)}
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
