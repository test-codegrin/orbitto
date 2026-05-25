"use client";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import ProductsPrimary from "@/components/sections/products/ProductsPrimary";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import useCategories from "@/hooks/useCategories";
import useProducts from "@/hooks/useProducts";
import useSearch from "@/hooks/useSearch";
import filterItems from "@/libs/filterItems";
import getRangeValue from "@/libs/getRangeValue";
import makeText from "@/libs/makeText";
import CommonContext from "@/providers/CommonContext";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const ProductMain = ({
  title,
  isSidebar,
  text,
  categoryOverride,
  faqSection,
}) => {
  const productLimit = isSidebar === false ? 16 : 21;
  const searchParams = useSearchParams();
  const category = categoryOverride || searchParams?.get("category");
  const brand = useSearchParams()?.get("brand");
  const tag = useSearchParams()?.get("tag");
  const size = useSearchParams()?.get("size");
  const color = useSearchParams()?.get("color");
  const search = searchParams?.get("search");
  const currentPath = usePathname();
  const [productPage, setProductPage] = useState(1);
  const [rangeValue, setRangeValue] = useState(null);
  const maxSize = 5000;
  const intLowerLimit = 50;
  const intUpperLimit = 1500;
  const {
    products: allProducts,
    pagination: productPagination,
    isLoading: isProductsLoading,
    error: productsError,
  } = useProducts({
    category,
    search,
    page: productPage,
    limit: productLimit,
  });
  const {
    categories: productCategories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useCategories();

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

  const productsBeforePriceFilter = useMemo(
    () => {
      return filterItems(
        allProducts,
        brand
          ? "brand"
          : tag
          ? "tags"
          : size
          ? "size"
          : color
          ? "color"
          : "",
        brand ? brand : tag ? tag : size ? size : color ? color : "",
        true
      );
    },
    [allProducts, brand, tag, size, color]
  );

  const filteredProducts = useMemo(
    () =>
      filterItems(
        productsBeforePriceFilter,
        rangeValue ? "range" : "",
        rangeValue ? rangeValue : ""
      ),
    [productsBeforePriceFilter, rangeValue]
  );

  useEffect(() => {
    getRangeValue(setRangeValue, maxSize, intLowerLimit, intUpperLimit, true);
    setRangeValue(null);
    setProductPage(1);
  }, [category, brand, tag, size, color, search, intLowerLimit, maxSize, intUpperLimit]);

  useEffect(() => {
    getRangeValue(setRangeValue, maxSize, intLowerLimit, intUpperLimit);
  }, [intLowerLimit, intUpperLimit, maxSize]);

  return (
    <main>
      <HeroPrimary
        title={
          category
            ? `${makeText(category)} Export Products`
            : brand
            ? `Brand: ${makeText(brand)}`
            : size
            ? `Product Size: ${makeText(size)}`
            : tag
            ? `Tag: ${makeText(tag)}`
            : color
            ? `Product Color: ${makeText(color)}`
            : search
            ? `Search Results for ${makeText(search)}`
            : title
            ? title
            : "Export Product Catalog"
        }
        text={
          category
            ? makeText(category)
            : search
            ? "Product Search"
            : text
            ? text
            : "Products"
        }
        type={isSidebar === "primary" ? 2 : 3}
        isCapitalize={Boolean(brand)}
      />
      <CommonContext
        value={{
          filteredProducts,
          productCategories,
          isCategoriesLoading,
          categoriesError,
          productPagination,
          productPage,
          setProductPage,
          isProductsLoading,
          productsError,
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
        <ProductsPrimary isSidebar={isSidebar} />
      </CommonContext>
      {faqSection?.items?.length ? (
        <SeoFaqSection
          id={faqSection.id}
          title={faqSection.title}
          intro={faqSection.intro}
          items={faqSection.items}
          eyebrow={faqSection.eyebrow}
        />
      ) : null}
      <Features4 />
    </main>
  );
};

export default ProductMain;
