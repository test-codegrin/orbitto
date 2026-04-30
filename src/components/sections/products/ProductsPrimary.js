"use client";

import React, { useEffect, useState } from "react";

import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import ProductCardPrimary2 from "@/components/shared/cards/ProductCardPrimary2";
import Nodata from "@/components/shared/no-data/Nodata";
import Pagination from "@/components/shared/paginations/Pagination";

import usePagination from "@/hooks/usePagination";
import filterItems from "@/libs/filterItems";
import { useCommonContext } from "@/providers/CommonContext";

const ProductsPrimary = ({ isSidebar, currentTapId }) => {
  const [arrangeInput, setArrangeInput] = useState("default");
  const [currentTab, setCurrentTab] = useState(currentTapId ?? 0);

  const { filteredProducts } = useCommonContext();

  const limit =
    currentTab === 1
      ? isSidebar === false
        ? 4
        : 7
      : isSidebar === false
      ? 16
      : 21;

  const arrangedProducts = filterItems(
    filteredProducts,
    arrangeInput,
    arrangeInput
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

  const tabControllers = ["fas fa-th-large", "fas fa-list"];

  useEffect(() => {
    setCurrentpage(0);
  }, [currentTab, setCurrentpage]);

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
              className={`ltn__Product-options ${
                !totalPages ? "no-data" : ""
              }`}
            >
              <ul>
                <li>
                  <div className="ltn__grid-list-tab-menu">
                    <div className="nav">
                      {tabControllers.map((iconName, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCurrentTab(idx)}
                          className={idx === currentTab ? "active" : ""}
                        >
                          <i className={iconName}></i>
                        </button>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="tab-content">
              {/* GRID VIEW */}
              <div
                className={`tab-pane fade ${
                  currentTab === 0 ? "active" : ""
                }`}
              >
                <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                  <div className="row">
                    {currentItems?.map((product, idx) => (
                      <div
                        className={`${
                          isSidebar === false
                            ? "col-xl-3 col-lg-4"
                            : "col-xl-4"
                        } col-sm-6 col-6`}
                        key={product?.id || idx}
                      >
                        <ProductCardPrimary product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* LIST VIEW */}
              <div
                className={`tab-pane fade ${
                  currentTab === 1 ? "active" : ""
                }`}
              >
                <div className="ltn__product-tab-content-inner ltn__product-list-view">
                  <div className="row">
                    {currentItems?.map((product, idx) => (
                      <div className="col-lg-12" key={product?.id || idx}>
                        <ProductCardPrimary2 product={product} />
                      </div>
                    ))}
                  </div>
                </div>
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
