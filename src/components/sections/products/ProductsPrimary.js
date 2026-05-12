"use client";

import React, { useEffect, useMemo } from "react";

import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import Nodata from "@/components/shared/no-data/Nodata";
import Pagination from "@/components/shared/paginations/Pagination";
import ProductCategories from "@/components/shared/sidebars/widgets/ProductCategories";
import SidebarSearch from "@/components/shared/sidebars/widgets/SidebarSearch";

import usePagination from "@/hooks/usePagination";
import { useCommonContext } from "@/providers/CommonContext";

const ProductsPrimary = ({ isSidebar }) => {
  const { filteredProducts } = useCommonContext();

  const limit = isSidebar === false ? 16 : 21;
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
    firstItem,
    lastItem,
  } = usePagination(arrangedProducts, limit, 5);

  const pageJumpOptions = useMemo(() => {
    const options = [];

    if (currentpage > 0) {
      options.push({
        value: currentpage - 1,
        label: "<<",
      });
    }

    if (showMore === "left") {
      options.push({
        value: 0,
        label: "1",
      });
      options.push({
        value: currentpage - 1,
        label: "...",
      });
    }

    currentPaginationItems?.forEach((item) => {
      options.push({
        value: item,
        label: `${item + 1}`,
      });
    });

    if (showMore === "right") {
      options.push({
        value: currentpage + 1,
        label: "...",
      });
      options.push({
        value: totalPages - 1,
        label: `${totalPages}`,
      });
    }

    if (currentpage < totalPages - 1) {
      options.push({
        value: currentpage + 1,
        label: ">>",
      });
    }

    return options;
  }, [currentpage, currentPaginationItems, showMore, totalPages]);

  useEffect(() => {
    setCurrentpage(0);
  }, [productListKey, setCurrentpage]);

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
                <span>
                  Showing{" "}
                  {totalItems === 0
                    ? 0
                    : firstItem === lastItem || totalItems <= limit
                    ? lastItem
                    : `${firstItem}-${lastItem}`}{" "}
                  of {totalItems} results
                </span>
                {totalPages > 1 && (
                  <div className="product-page-jump">
                    <label htmlFor="product-page-select">Page</label>
                    <select
                      id="product-page-select"
                      value={currentpage}
                      onChange={(e) =>
                        handleCurrentPage(
                          undefined,
                          Number(e.target.value),
                          "products"
                        )
                      }
                    >
                      {pageJumpOptions?.map((option, idx) => (
                        <option
                          key={`${option.label}-${option.value}-${idx}`}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPrimary;
