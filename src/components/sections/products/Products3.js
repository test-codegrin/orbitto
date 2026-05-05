"use client";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import getAllProducts from "@/libs/getAllProducts";
import makePath from "@/libs/makePath";
import Link from "next/link";
import { useMemo } from "react";

const Products3 = ({
  title,
  desc,
  isSmallTitle,
  pt,
  type,
  isDouble,
}) => {
  const allProducts = useMemo(() => getAllProducts() || [], []);

  const fruitsPowderProducts = useMemo(
    () =>
      allProducts.filter(
        ({ type: productType }) =>
          makePath(productType || "") === makePath("Fruit Powder")
      ),
    [allProducts]
  );

  const vegetablesPowderProducts = useMemo(
    () =>
      allProducts.filter(
        ({ type: productType }) =>
          makePath(productType || "") === makePath("Vegetable Powder")
      ),
    [allProducts]
  );

  const honeyProducts = useMemo(
    () =>
      allProducts.filter(
        ({ type: productType }) =>
          makePath(productType || "") === makePath("Honey")
      ),
    [allProducts]
  );

  const spicesProducts = useMemo(
    () =>
      allProducts.filter(
        ({ type: productType }) =>
          makePath(productType || "") === makePath("Spices")
      ),
    [allProducts]
  );

  const herbalProducts = useMemo(
    () =>
      allProducts.filter(
        ({ type: productType }) =>
          makePath(productType || "") === makePath("Herbal Powder")
      ),
    [allProducts]
  );

  const renderProducts = (products = []) => {
    if (!isDouble) {
      return products.map((product, idx) => (
        <div className="col-lg-12" key={product?.id || product?.slug || idx}>
          <ProductCardPrimary product={product} />
        </div>
      ));
    }

    const pairs = [];
    for (let idx = 0; idx < products.length; idx += 2) {
      pairs.push([products[idx], products[idx + 1] || null]);
    }

    return pairs.map(([firstProduct, secondProduct], idx) => (
      <div
        className="col-lg-12"
        key={firstProduct?.id || firstProduct?.slug || idx}
      >
        <ProductCardPrimary product={firstProduct} />
        {secondProduct ? <ProductCardPrimary product={secondProduct} /> : ""}
      </div>
    ));
  };

  return (
    <section>
      <div
        className={`ltn__product-tab-area ltn__product-gutter pb-70 ${
          pt ? pt : "pt-115"
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className={`section-title-area ${
                  type === 2
                    ? ""
                    : isSmallTitle
                    ? "text-center"
                    : "ltn__section-title-2 text-center"
                }`}
              >
                <h1 className="section-title">
                  {title ? title : "Our Products"}
                </h1>
                {desc ? <p>{desc}</p> : ""}
              </div>

              <div
                className={`ltn__tab-menu ltn__tab-menu-2 ${
                  type === 2 ? "ltn__tab-menu-top-right" : ""
                } text-uppercase text-center`}
              >
                <div className="nav">
                  <Link
                    className="active show"
                    data-bs-toggle="tab"
                    href="#liton_tab_3_1"
                  >
                    Fruits Powder
                  </Link>
                  <Link data-bs-toggle="tab" href="#liton_tab_3_2" className="">
                    Vegetables Powder
                  </Link>
                  <Link data-bs-toggle="tab" href="#liton_tab_3_3" className="">
                    Honey
                  </Link>
                  <Link data-bs-toggle="tab" href="#liton_tab_3_4" className="">
                    Spices
                  </Link>
                  <Link data-bs-toggle="tab" href="#liton_tab_3_5" className="">
                    Herbal Powders
                  </Link>
                </div>
              </div>

              <div className="tab-content">
                {/* Fruits Powder */}
                <div className="tab-pane fade active show" id="liton_tab_3_1">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {renderProducts(fruitsPowderProducts)}
                    </div>
                  </div>
                </div>

                {/* Vegetables Powder */}
                <div className="tab-pane fade" id="liton_tab_3_2">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {renderProducts(vegetablesPowderProducts)}
                    </div>
                  </div>
                </div>

                {/* Honey */}
                <div className="tab-pane fade" id="liton_tab_3_3">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {renderProducts(honeyProducts)}
                    </div>
                  </div>
                </div>

                {/* Spices */}
                <div className="tab-pane fade" id="liton_tab_3_4">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {renderProducts(spicesProducts)}
                    </div>
                  </div>
                </div>

                {/* Herbal Powders */}
                <div className="tab-pane fade" id="liton_tab_3_5">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {renderProducts(herbalProducts)}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products3;
