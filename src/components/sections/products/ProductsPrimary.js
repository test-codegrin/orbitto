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

  const {
    currentItems,
    currentpage,
    setCurrentpage,
    paginationItems,
    currentPaginationItems,
    showMore,
    totalPages,
    handleCurrentPage,
  } = usePagination(arrangedProducts, limit, 5);

  useEffect(() => {
    setCurrentpage(0);
  }, [arrangedProducts, setCurrentpage]);

  return (
    <div className="ltn__product-area ltn__product-gutter mb-120">
      <div className="container">
        <div className="row">
          <div
            className={`col-lg-12 ${
              isSidebar === "left" ? "order-lg-2" : ""
            }`}
          >
            {!totalPages && <Nodata text="No Product Found!" />}

            <div
              className={`ltn__Product-options ltn__product-topbar ${
                !totalPages ? "no-data" : ""
              }`}
            >
              <ProductCategories isDropdown />
              <SidebarSearch isCompact />
            </div>

            <div className="ltn__product-tab-content-inner ltn__product-grid-view">
              <div className="row products3-fixed-card-grid">
                {currentItems?.map((product, idx) => (
                  <div
                    className={`${
                      isSidebar === false ? "col-xl-3 col-lg-4" : "col-xl-4"
                    } col-sm-6 col-6`}
                    key={product?.id || idx}
                  >
                    <ProductCardPrimary product={product} />
                  </div>
                ))}
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
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPrimary;
