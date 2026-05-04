"use client";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import ProductsPrimary from "@/components/sections/products/ProductsPrimary";
import useSearch from "@/hooks/useSearch";
import filterItems from "@/libs/filterItems";
import getAllProducts from "@/libs/getAllProducts";
import getRangeValue from "@/libs/getRangeValue";
import makeText from "@/libs/makeText";
import CommonContext from "@/providers/CommonContext";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductMain = ({ title, isSidebar, text, currentTapId }) => {
  const allProducts = getAllProducts();
  const category = useSearchParams()?.get("category");
  const brand = useSearchParams()?.get("brand");
  const tag = useSearchParams()?.get("tag");
  const size = useSearchParams()?.get("size");
  const color = useSearchParams()?.get("color");
  const search = useSearchParams()?.get("search");
  const currentPath = usePathname();
  const [rangeValue, setRangeValue] = useState(null);
  const maxSize = 5000;
  const intLowerLimit = 50;
  const intUpperLimit = 1500;

  const {
    searchedItems,
    isShowSearch,
    handleSearch,
    handleSearchString,
    startSearch,
    closeSearch,
    isShowQuickSearchResult,
    setIsShowQuickSearchResult,
  } = useSearch(allProducts, currentPath);

  const productsBeforePriceFilter = filterItems(
    allProducts,
    category
      ? "category"
      : brand
      ? "brand"
      : tag
      ? "tags"
      : size
      ? "size"
      : color
      ? "color"
      : search
      ? "search"
      : "",
    category
      ? category
      : brand
      ? brand
      : tag
      ? tag
      : size
      ? size
      : color
      ? color
      : search
      ? search
      : "",
    true
  );

  const filteredProducts = filterItems(
    productsBeforePriceFilter,
    rangeValue ? "range" : "",
    rangeValue ? rangeValue : ""
  );

  useEffect(() => {
    getRangeValue(setRangeValue, maxSize, intLowerLimit, intUpperLimit, true);
    setRangeValue(null);
  }, [category, brand, tag, size, color, search, intLowerLimit, maxSize, intUpperLimit]);

  useEffect(() => {
    getRangeValue(setRangeValue, maxSize, intLowerLimit, intUpperLimit);
  }, [intLowerLimit, intUpperLimit, maxSize]);

  return (
    <main>
      <HeroPrimary
        title={
          category
            ? `Category: ${makeText(category)}`
            : brand
            ? `Brand: ${makeText(brand)}`
            : size
            ? `Product Size: ${makeText(size)}`
            : tag
            ? `Tag: ${makeText(tag)}`
            : color
            ? `Product Color: ${makeText(color)}`
            : search
            ? `Search: ${makeText(search)}`
            : title
            ? title
            : "Product"
        }
        text={text ? text : "Product"}
        type={isSidebar === "primary" ? 2 : 3}
        isCapitalize={Boolean(brand)}
      />
      <CommonContext
        value={{
          filteredProducts,
          searchedItems,
          handleSearch,
          handleSearchString,
          startSearch,
          closeSearch,
          isShowSearch,
          isShowQuickSearchResult,
          setIsShowQuickSearchResult,
          isProduct: true,
          currentPath,
          category,
          brand,
          tag,
          size,
        }}
      >
        <ProductsPrimary isSidebar={isSidebar} currentTapId={currentTapId} />
      </CommonContext>
      <Features4 />
    </main>
  );
};

export default ProductMain;
