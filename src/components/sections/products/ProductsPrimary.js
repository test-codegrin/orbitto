"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import Nodata from "@/components/shared/no-data/Nodata";
import Pagination from "@/components/shared/paginations/Pagination";
import ProductCategories from "@/components/shared/sidebars/widgets/ProductCategories";
import SidebarSearch from "@/components/shared/sidebars/widgets/SidebarSearch";

import usePagination from "@/hooks/usePagination";
import { normalizeProductType } from "@/libs/productType";
import { useCommonContext } from "@/providers/CommonContext";

const powderNoteCategories = new Set([
  "fruit",
  "vegetable",
  "fruitpowder",
  "vegetablepowder",
  "spices",
  "herbalpowder",
]);

const ProductsPrimary = ({ isSidebar }) => {
  const { filteredProducts, category } = useCommonContext();

  const limit = isSidebar === false ? 16 : 21;
  const pageJumpRef = useRef(null);
  const [isPageJumpOpen, setIsPageJumpOpen] = useState(false);
  const shouldShowPowderNote = powderNoteCategories.has(
    normalizeProductType(category)
  );
  const arrangedProducts = useMemo(
    () => filteredProducts || [],
    [filteredProducts]
  );
  const productListKey = useMemo(
    () => arrangedProducts?.map(({ id }) => id).join("|"),
    [arrangedProducts]
  );

  const {
    currentItems,
    totalItems,
    currentpage,
    setCurrentpage,
    paginationItems,
    currentPaginationItems,
    showMore,
    totalPages,
    handleCurrentPage,
  } = usePagination(arrangedProducts, limit, 5);

  const pageJumpOptions = useMemo(
    () =>
      paginationItems?.map((item) => ({
        value: item,
        label: `${item + 1}`,
      })),
    [paginationItems]
  );

  useEffect(() => {
    setCurrentpage(0);
  }, [productListKey, setCurrentpage]);

  const handlePageJumpSelect = (pageIndex) => {
    setIsPageJumpOpen(false);
    handleCurrentPage(undefined, pageIndex, "products");
  };

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
                {totalPages > 1 && (
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
                        {currentpage + 1}
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
                              aria-selected={option.value === currentpage}
                            >
                              <button
                                type="button"
                                className={
                                  option.value === currentpage ? "active" : ""
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
                    <span>of {totalPages}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="ltn__product-tab-content-inner ltn__product-grid-view">
              <div className="row products3-fixed-card-grid">
                {!totalPages ? (
                  <div className="col-12">
                    <Nodata text="No Product Found!" className="empty-products" />
                  </div>
                ) : (
                  currentItems?.map((product, idx) => (
                    <div
                      className={`${
                        isSidebar === false ? "col-xl-3 col-lg-4" : "col-xl-4"
                      } col-sm-6 col-6`}
                      key={product?.id || idx}
                    >
                      <ProductCardPrimary product={product} />
                    </div>
                  ))
                )}
              </div>
            </div>

            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPaginationItems={currentPaginationItems}
                showMore={showMore}
                items={paginationItems}
                currenIndex={currentpage}
                handleCurrentPage={handleCurrentPage}
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
