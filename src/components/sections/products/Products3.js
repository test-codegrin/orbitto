"use client";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import getAllProducts from "@/libs/getAllProducts";
import makePath from "@/libs/makePath";
import Link from "next/link";

const Products3 = ({
  title,
  desc,
  isSmallTitle,
  subtitle,
  pt,
  type,
  isDouble,
}) => {
  const fruitsPowderProducts = getAllProducts()?.filter(
    ({ type }) => makePath(type) === makePath("Fruit Powder")
  );
  const fruitsPowderProducts1 = fruitsPowderProducts?.slice(0, 6);
  const fruitsPowderProducts2 = fruitsPowderProducts?.slice(6, 12);

  const vegetablesPowderProducts = getAllProducts()?.filter(
    ({ type }) => makePath(type) === makePath("Vegetable Powder")
  );
  const vegetablesPowderProducts1 = vegetablesPowderProducts?.slice(0, 6);
  const vegetablesPowderProducts2 = vegetablesPowderProducts?.slice(6, 12);

  const honeyProducts = getAllProducts()?.filter(
    ({ type }) => makePath(type) === makePath("Honey")
  );
  const honeyProducts1 = honeyProducts?.slice(0, 6);
  const honeyProducts2 = honeyProducts?.slice(6, 12);

  const spicesProducts = getAllProducts()?.filter(
    ({ type }) => makePath(type) === makePath("Spices")
  );
  const spicesProducts1 = spicesProducts?.slice(0, 6);
  const spicesProducts2 = spicesProducts?.slice(6, 12);

  const herbalProducts = getAllProducts()?.filter(
    ({ type }) => makePath(type) === makePath("Herbal Powder")
  );
  const herbalProducts1 = herbalProducts?.slice(0, 6);
  const herbalProducts2 = herbalProducts?.slice(6, 12);

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
                    Honey Powder
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
                      {fruitsPowderProducts1?.map((product, idx) => (
                        <div className="col-lg-12" key={idx}>
                          <ProductCardPrimary product={product} />
                          {isDouble ? (
                            <ProductCardPrimary product={fruitsPowderProducts2[idx]} />
                          ) : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Vegetables Powder */}
                <div className="tab-pane fade" id="liton_tab_3_2">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {vegetablesPowderProducts1?.map((product, idx) => (
                        <div className="col-lg-12" key={idx}>
                          <ProductCardPrimary product={product} />
                          {isDouble ? (
                            <ProductCardPrimary product={vegetablesPowderProducts2[idx]} />
                          ) : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Honey Powder */}
                <div className="tab-pane fade" id="liton_tab_3_3">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {honeyProducts1?.map((product, idx) => (
                        <div className="col-lg-12" key={idx}>
                          <ProductCardPrimary product={product} />
                          {isDouble ? (
                            <ProductCardPrimary product={honeyProducts2[idx]} />
                          ) : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spices */}
                <div className="tab-pane fade" id="liton_tab_3_4">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {spicesProducts1?.map((product, idx) => (
                        <div className="col-lg-12" key={idx}>
                          <ProductCardPrimary product={product} />
                          {isDouble ? (
                            <ProductCardPrimary product={spicesProducts2[idx]} />
                          ) : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Herbal Powders */}
                <div className="tab-pane fade" id="liton_tab_3_5">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {herbalProducts1?.map((product, idx) => (
                        <div className="col-lg-12" key={idx}>
                          <ProductCardPrimary product={product} />
                          {isDouble ? (
                            <ProductCardPrimary product={herbalProducts2[idx]} />
                          ) : ""}
                        </div>
                      ))}
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