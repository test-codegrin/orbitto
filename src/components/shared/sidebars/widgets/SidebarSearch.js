import { useCommonContext } from "@/providers/CommonContext";
import React from "react";
import QuickSearchItems from "../../others/QuickSearchItems";

const SidebarSearch = ({ className = "", isCompact = false }) => {
  const {
    handleSearch,
    handleSearchString,
    startSearch,
    closeSearch,
    setIsShowQuickSearchResult,
  } = useCommonContext();

  return (
    <div
      className={`widget ltn__search-widget ${
        isCompact ? "ltn__product-topbar-search" : ""
      } ${className}`}
    >
      {!isCompact && (
        <h4 className="ltn__widget-title ltn__widget-title-border">
          Search Objects
        </h4>
      )}
      <form style={{ position: "relative" }} onSubmit={(e) => handleSearch(e)}>
        <input
          type="text"
          name="search"
          placeholder={
            isCompact ? "Search products..." : "Search your keyword..."
          }
          onBlur={() => setIsShowQuickSearchResult(false)}
          onChange={(e) => handleSearchString(e)}
          onKeyDown={closeSearch}
          onKeyUp={startSearch}
          required
        />
       
        <QuickSearchItems />
      </form>
    </div>
  );
};

export default SidebarSearch;
