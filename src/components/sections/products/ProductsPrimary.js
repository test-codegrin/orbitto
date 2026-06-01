"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import Nodata from "@/components/shared/no-data/Nodata";
import Pagination from "@/components/shared/paginations/Pagination";
import ProductCategories from "@/components/shared/sidebars/widgets/ProductCategories";
import SidebarSearch from "@/components/shared/sidebars/widgets/SidebarSearch";

import usePagination from "@/hooks/usePagination";
import { isProductType, normalizeProductType } from "@/libs/productType";
import { useCommonContext } from "@/providers/CommonContext";

const powderNoteCategories = new Set([
  "fruitpowder",
  "vegetablepowder",
  "spices",
  "herbalpowder",
]);

const getProductKey = (product, fallback) =>
  product?.slug || product?.path || `${product?.type || "product"}-${product?.id || fallback}`;
const skeletonItems = Array.from({ length: 8 }, (_, index) => index);

const ProductsPrimary = ({ isSidebar }) => {
  const {
    filteredProducts,
    category,
    productPagination,
    productPage,
    setProductPage,
    isProductsLoading,
    productsError,
  } = useCommonContext();

  const limit = isSidebar === false ? 16 : 21;
  const pageJumpRef = useRef(null);
  const [isPageJumpOpen, setIsPageJumpOpen] = useState(false);
  const [areVisibleImagesReady, setAreVisibleImagesReady] = useState(false);
  const shouldShowPowderNote = powderNoteCategories.has(
    normalizeProductType(category)
  );
  const arrangedProducts = useMemo(
    () => filteredProducts || [],
    [filteredProducts]
  );
  const productListKey = useMemo(
    () =>
      arrangedProducts
        ?.map((product, idx) => getProductKey(product, idx))
        .join("|"),
    [arrangedProducts]
  );

  const clientPagination = usePagination(arrangedProducts, limit, 5);
  const {
    currentItems,
    currentpage,
    setCurrentpage,
    paginationItems,
    currentPaginationItems,
    showMore,
    totalPages,
    handleCurrentPage,
  } = clientPagination;
  const isApiPaginated = Boolean(productPagination);
  const visibleItems = isApiPaginated ? arrangedProducts : currentItems;
  const visibleItemsKey = useMemo(
    () =>
      (visibleItems || [])
        .map((item, idx) => getProductKey(item, idx))
        .join("|"),
    [visibleItems]
  );
  const visibleTotalPages = isApiPaginated
    ? productPagination.totalPages
    : totalPages;
  const visibleCurrentPage = isApiPaginated
    ? Math.max((productPagination.page || productPage || 1) - 1, 0)
    : currentpage;
  const visiblePaginationItems = isApiPaginated
    ? Array.from({ length: visibleTotalPages }, (_, index) => index)
    : paginationItems;
  const visibleCurrentPaginationItems = isApiPaginated
    ? visiblePaginationItems.slice(
        Math.max(visibleCurrentPage - 2, 0),
        Math.min(visibleCurrentPage + 3, visibleTotalPages)
      )
    : currentPaginationItems;
  const visibleShowMore = isApiPaginated
    ? visibleCurrentPage > 2
      ? "left"
      : visibleCurrentPage < visibleTotalPages - 3
      ? "right"
      : ""
    : showMore;

  const handleVisibleCurrentPage = (event, pageIndex, path) => {
    if (isApiPaginated) {
      event?.preventDefault();
      setProductPage(pageIndex + 1);
      document.querySelector(`#${path || "products"}`)?.scrollIntoView({
        behavior: "smooth",
      });
      return;
    }

    handleCurrentPage(event, pageIndex, path);
  };

  const pageJumpOptions = useMemo(
    () =>
      visiblePaginationItems?.map((item) => ({
        value: item,
        label: `${item + 1}`,
      })),
    [visiblePaginationItems]
  );

  useEffect(() => {
    setCurrentpage(0);
  }, [productListKey, setCurrentpage]);

  useEffect(() => {
    if (isProductsLoading) {
      setAreVisibleImagesReady(false);
      return;
    }

    const productsToPrepare = visibleItems || [];
    if (!productsToPrepare.length) {
      setAreVisibleImagesReady(true);
      return;
    }

    let isCancelled = false;
    const preloadImage = (src) =>
      new Promise((resolve) => {
        if (!src) {
          resolve();
          return;
        }
        const img = new window.Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
        if (img.complete) resolve();
      });

    setAreVisibleImagesReady(false);
    Promise.all(productsToPrepare.map((item) => preloadImage(item?.image))).finally(() => {
      if (!isCancelled) {
        setAreVisibleImagesReady(true);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [isProductsLoading, visibleItemsKey, visibleItems]);

  const isMainLoading = isProductsLoading || !areVisibleImagesReady;

  const handlePageJumpSelect = (pageIndex) => {
    setIsPageJumpOpen(false);
    handleVisibleCurrentPage(undefined, pageIndex, "products");
  };

  const isBoxProduct = (product) =>
    isProductType(product?.type, "Fruit") ||
    isProductType(product?.type, "Vegetable");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!pageJumpRef.current?.contains(event.target)) {
        setIsPageJumpOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      id="products"
      className="ltn__product-area ltn__product-gutter mb-120"
    >
      <div className="container">
        <div className="row">
          <div
            className={`col-lg-12 ${
              isSidebar === "left" ? "order-lg-2" : ""
            }`}
          >
            <div className="ltn__Product-options ltn__product-topbar">
              <ProductCategories isDropdown />
              <SidebarSearch isCompact />
              <div className="showing-product-number text-right">
                {visibleTotalPages > 1 && (
                  <div className="product-page-jump">
                    <span>Page</span>
                    <div className="product-page-select" ref={pageJumpRef}>
                      <button
                        type="button"
                        className={`product-page-select__toggle ${
                          isPageJumpOpen ? "active" : ""
                        }`}
                        aria-expanded={isPageJumpOpen}
                        aria-haspopup="listbox"
                        onClick={() =>
                          setIsPageJumpOpen((current) => !current)
                        }
                      >
                        {visibleCurrentPage + 1}
                        <i
                          className={`fas ${
                            isPageJumpOpen
                              ? "fa-chevron-up"
                              : "fa-chevron-down"
                          }`}
                        ></i>
                      </button>
                      {isPageJumpOpen ? (
                        <ul
                          className="product-page-select__list"
                          role="listbox"
                          aria-label="Select product page"
                        >
                          {pageJumpOptions?.map((option) => (
                            <li
                              key={option.value}
                              role="option"
                              aria-selected={option.value === visibleCurrentPage}
                            >
                              <button
                                type="button"
                              className={
                                  option.value === visibleCurrentPage ? "active" : ""
                                }
                                onClick={() =>
                                  handlePageJumpSelect(option.value)
                                }
                              >
                                {option.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    <span>of {visibleTotalPages}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="ltn__product-tab-content-inner ltn__product-grid-view">
              <div className="row products3-fixed-card-grid products-page-card-grid">
                {isMainLoading ? (
                  skeletonItems.map((item) => (
                    <div
                      className={`${
                        isSidebar === false ? "col-xl-3 col-lg-4" : "col-xl-4"
                      } col-sm-6 col-6`}
                      key={`product-skeleton-${item}`}
                    >
                      <div className="product-card-skeleton" aria-hidden="true">
                        <div className="product-card-skeleton__image" />
                        <div className="product-card-skeleton__title" />
                      </div>
                    </div>
                  ))
                ) : productsError ? (
                  <div className="col-12">
                    <Nodata text={productsError} className="empty-products" />
                  </div>
                ) : !visibleTotalPages ? (
                  <div className="col-12">
                    <Nodata text="No Product Found!" className="empty-products" />
                  </div>
                ) : (
                  visibleItems?.map((product, idx) => (
                    <div
                      className={`${
                        isSidebar === false ? "col-xl-3 col-lg-4" : "col-xl-4"
                      } col-sm-6 col-6`}
                      key={getProductKey(product, idx)}
                    >
                      <ProductCardPrimary
                        product={product}
                        imageFitVariant={isBoxProduct(product) ? "box" : undefined}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {visibleTotalPages > 1 && (
              <Pagination
                totalPages={visibleTotalPages}
                currentPaginationItems={visibleCurrentPaginationItems}
                showMore={visibleShowMore}
                items={visiblePaginationItems}
                currenIndex={visibleCurrentPage}
                handleCurrentPage={handleVisibleCurrentPage}
                path="products"
              />
            )}

            {shouldShowPowderNote ? (
              <div className="product-category-note">
                <div className="product-category-note__icon" aria-hidden="true">
                  <i className="fas fa-info"></i>
                </div>
                <p>
                  Apart from these, other powders can also be prepared according
                  to the trader&rsquo;s order and seasonal requirements.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPrimary;
