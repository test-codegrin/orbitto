"use client";
import ButtonOpenMobileMenu from "@/components/shared/buttons/ButtonOpenMobileMenu";
import makePath from "@/libs/makePath";
import { useHeaderContex } from "@/providers/HeaderContex";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const HeaderRight = () => {
  const { headerStyle } = useHeaderContex();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const handleSearchToggle = (event) => {
    event.preventDefault();
    setIsSearchOpen((current) => !current);
  };

  const handleProductSearch = (event) => {
    event.preventDefault();
    const searchValue = event.currentTarget.search.value.trim();

    if (!searchValue) return;

    router.push(`/products?search=${makePath(searchValue)}`);
    setIsSearchOpen(false);
    event.currentTarget.reset();
  };
 
  return (
    <div
      className={`ltn__header-options header-actions-column ${
        headerStyle === 3 ? "" : "ltn__header-options-2"
      }`}
    >
      {/* <!-- header-search-1 --> */}{" "}
      <div className="header-search-wrap">
        <div
          className={`header-search-1 ${isSearchOpen ? "search-open" : ""}`}
          onClick={handleSearchToggle}
        >
          <div className="search-icon">
            <i className="icon-search for-search-show"></i>
            <i className="icon-cancel  for-search-close"></i>
          </div>
        </div>
        <div
          className={`header-search-1-form ${
            isSearchOpen ? "search-open" : ""
          }`}
        >
          <form onSubmit={handleProductSearch}>
            <input type="text" name="search" placeholder="Search here..." />
            <button type="submit">
              <span>
                <i className="icon-search"></i>
              </span>
            </button>
          </form>
        </div>
      </div>
      <ButtonOpenMobileMenu />
    </div>
  );
};

export default HeaderRight;
