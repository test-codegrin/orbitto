"use client";

import makePath from "@/libs/makePath";
import { useRouter } from "next/navigation";
import React from "react";

const HeaderSearch = () => {
  const router = useRouter();

  const handleProductSearch = (event) => {
    event.preventDefault();
    const searchValue = event.currentTarget.search.value.trim();

    if (!searchValue) return;

    router.push(`/products?search=${makePath(searchValue)}`);
    event.currentTarget.reset();
  };

  return (
    <div className="col header-contact-serarch-column d-none d-lg-block">
      <div className="header-contact-search">
        {/* <!-- header-feature-item --> */}
        <div className="header-feature-item">
          <div className="header-feature-icon">
            <i className="icon-call"></i>
          </div>
          <div className="header-feature-info">
            <h6>Phone</h6>
            <p>
              <a href="tel:0123456789">+0123-456-789</a>
            </p>
          </div>
        </div>
        {/* <!-- header-search-2 --> */}
        <div className="header-search-2">
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
    </div>
  );
};

export default HeaderSearch;
