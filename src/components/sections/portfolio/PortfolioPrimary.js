"use client";
import PortfolioCard from "@/components/shared/cards/PortfolioCard";

import getAllPortfolios from "@/libs/getAllPortfolios";
import React, { useEffect, useState } from "react";

const PortfolioPrimary = ({ type }) => {
  const [isAll, setIsAll] = useState(false);
  const portfolios = getAllPortfolios()?.filter(
    ({ id }) => id < (isAll ? 13 : 7)
  );
  useEffect(() => {
    if (window.$) {
      $("a[data-rel^=lightcase]").lightcase({
        transition:
          "elastic" /* none, fade, fadeInline, elastic, scrollTop, scrollRight, scrollBottom, scrollLeft, scrollHorizontal and scrollVertical */,
        swipe: true,
        maxWidth: 1170,
        maxHeight: 600,
      });
    }
  }, [isAll]);
  return (
    <div className="ltn__gallery-area mb-120">
      <div className="container">
        {/* <!-- Portfolio Wrapper Start --> */}

        <div
          className={`row   ${
            type === 2 ? "ltn__gallery-style-1" : "ltn__gallery-style-2"
          }`}
        >
          {portfolios?.map((portfolio, idx) => (
            <div
              className="ltn__gallery-item filter_category_3 col-lg-4 col-sm-6 col-12"
              key={idx}
            >
              <PortfolioCard portfolio={portfolio} />
            </div>
          ))}
        </div>
        <div id="ltn__inline_description_1" style={{ display: "none" }}>
          <h4 className="first">
            Orbitto ingredient applications
          </h4>
          <p>
            Orbitto ingredients are selected for real-world food, beverage,
            wellness, and culinary applications where taste, color, and
            consistency matter.
          </p>
          <p>
            From fruit powders and spices to honey and herbal blends, our
            product range helps manufacturers build dependable formulations for
            domestic and export markets.
          </p>
        </div>
        {isAll ? (
          ""
        ) : (
          <div className="btn-wrapper animated text-center">
            <button
              className="theme-btn-1 btn btn-effect-1 text-uppercase"
              onClick={() => setIsAll(true)}
            >
              LOAD MORE +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPrimary;
