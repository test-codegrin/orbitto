"use client";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import getAllProducts from "@/libs/getAllProducts";
import { isProductType } from "@/libs/productType";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

const Products3 = ({
  title,
  desc,
  isSmallTitle,
  pt,
  type,
  isDouble,
}) => {
  const [invalidHerbalImageIds, setInvalidHerbalImageIds] = useState(
    new Set()
  );

  const allProducts = useMemo(() => getAllProducts(), []);

  const fruitProducts = allProducts?.filter(({ type }) =>
    isProductType(type, "Fruit")
  );
  const fruitProductPairs = useMemo(() => {
    const list = fruitProducts || [];
    const pairs = [];
    for (let idx = 0; idx < list.length; idx += 2) {
      pairs.push([list[idx], list[idx + 1] || null]);
    }
    return pairs;
  }, [fruitProducts]);

  const vegetableProducts = allProducts?.filter(({ type }) =>
    isProductType(type, "Vegetable")
  );
  const vegetableProductPairs = useMemo(() => {
    const list = vegetableProducts || [];
    const pairs = [];
    for (let idx = 0; idx < list.length; idx += 2) {
      pairs.push([list[idx], list[idx + 1] || null]);
    }
    return pairs;
  }, [vegetableProducts]);

  const fruitsPowderProducts = allProducts?.filter(
    ({ type }) => isProductType(type, "Fruit Powder")
  );
  const fruitsPowderProductPairs = useMemo(() => {
    const list = fruitsPowderProducts || [];
    const pairs = [];
    for (let idx = 0; idx < list.length; idx += 2) {
      pairs.push([list[idx], list[idx + 1] || null]);
    }
    return pairs;
  }, [fruitsPowderProducts]);

  const vegetablesPowderProducts = allProducts?.filter(
    ({ type }) => isProductType(type, "Vegetable Powder")
  );
  const vegetablesPowderProductPairs = useMemo(() => {
    const list = vegetablesPowderProducts || [];
    const pairs = [];
    for (let idx = 0; idx < list.length; idx += 2) {
      pairs.push([list[idx], list[idx + 1] || null]);
    }
    return pairs;
  }, [vegetablesPowderProducts]);

  const honeyProducts = allProducts?.filter(
    ({ type }) => isProductType(type, "Honey")
  );
  const honeyProductPairs = useMemo(() => {
    const list = honeyProducts || [];
    const pairs = [];
    for (let idx = 0; idx < list.length; idx += 2) {
      pairs.push([list[idx], list[idx + 1] || null]);
    }
    return pairs;
  }, [honeyProducts]);

  const spicesProducts = allProducts?.filter(
    ({ type }) => isProductType(type, "Spices")
  );
  const spicesProductPairs = useMemo(() => {
    const list = spicesProducts || [];
    const pairs = [];
    for (let idx = 0; idx < list.length; idx += 2) {
      pairs.push([list[idx], list[idx + 1] || null]);
    }
    return pairs;
  }, [spicesProducts]);

  const herbalProducts = useMemo(
    () =>
      allProducts
        ?.filter(({ type }) => isProductType(type, "Herbal Powder"))
        ?.filter(
          ({ id, image }) => !!image && !invalidHerbalImageIds.has(id)
        ),
    [allProducts, invalidHerbalImageIds]
  );
  const herbalProductPairs = useMemo(() => {
    const list = herbalProducts || [];
    const pairs = [];
    for (let idx = 0; idx < list.length; idx += 2) {
      pairs.push([list[idx], list[idx + 1] || null]);
    }
    return pairs;
  }, [herbalProducts]);

  const handleHerbalImageUnavailable = useCallback((id) => {
    setInvalidHerbalImageIds((previousIds) => {
      if (!id || previousIds.has(id)) return previousIds;
      const nextIds = new Set(previousIds);
      nextIds.add(id);
      return nextIds;
    });
  }, []);

  return (
    <section>
      <div
        className={`ltn__product-tab-area ltn__product-gutter products3-fixed-card-grid pb-70 ${
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
                    Fruit
                  </Link>
                  <Link data-bs-toggle="tab" href="#liton_tab_3_2" className="">
                    Vegetable
                  </Link>
                  <Link data-bs-toggle="tab" href="#liton_tab_3_3" className="">
                    Fruits Powder
                  </Link>
                  <Link data-bs-toggle="tab" href="#liton_tab_3_4" className="">
                    Vegetables Powder
                  </Link>
                  <Link data-bs-toggle="tab" href="#liton_tab_3_5" className="">
                    Honey
                  </Link>
                  <Link data-bs-toggle="tab" href="#liton_tab_3_6" className="">
                    Spices
                  </Link>
                  <Link data-bs-toggle="tab" href="#liton_tab_3_7" className="">
                    Herbal Powders
                  </Link>
                </div>
              </div>

              <div className="tab-content">
                {/* Fruit */}
                <div className="tab-pane fade active show" id="liton_tab_3_1">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {fruitProductPairs?.map(([firstProduct, secondProduct], idx) => (
                        <div className="col-lg-12" key={firstProduct?.id || firstProduct?.slug || idx}>
                          <ProductCardPrimary product={firstProduct} />
                          {isDouble && secondProduct ? (
                            <ProductCardPrimary product={secondProduct} />
                          ) : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Vegetable */}
                <div className="tab-pane fade" id="liton_tab_3_2">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {vegetableProductPairs?.map(([firstProduct, secondProduct], idx) => (
                        <div className="col-lg-12" key={firstProduct?.id || firstProduct?.slug || idx}>
                          <ProductCardPrimary product={firstProduct} />
                          {isDouble && secondProduct ? (
                            <ProductCardPrimary product={secondProduct} />
                          ) : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Fruits Powder */}
                <div className="tab-pane fade" id="liton_tab_3_3">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {fruitsPowderProductPairs?.map(([firstProduct, secondProduct], idx) => (
                        <div className="col-lg-12" key={firstProduct?.id || firstProduct?.slug || idx}>
                          <ProductCardPrimary product={firstProduct} />
                          {isDouble && secondProduct ? (
                            <ProductCardPrimary product={secondProduct} />
                          ) : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Vegetables Powder */}
                <div className="tab-pane fade" id="liton_tab_3_4">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {vegetablesPowderProductPairs?.map(([firstProduct, secondProduct], idx) => (
                        <div className="col-lg-12" key={firstProduct?.id || firstProduct?.slug || idx}>
                          <ProductCardPrimary product={firstProduct} />
                          {isDouble && secondProduct ? (
                            <ProductCardPrimary product={secondProduct} />
                          ) : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Honey */}
                <div className="tab-pane fade" id="liton_tab_3_5">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {honeyProductPairs?.map(([firstProduct, secondProduct], idx) => (
                        <div className="col-lg-12" key={firstProduct?.id || firstProduct?.slug || idx}>
                          <ProductCardPrimary product={firstProduct} />
                          {isDouble && secondProduct ? (
                            <ProductCardPrimary product={secondProduct} />
                          ) : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spices */}
                <div className="tab-pane fade" id="liton_tab_3_6">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {spicesProductPairs?.map(([firstProduct, secondProduct], idx) => (
                        <div className="col-lg-12" key={firstProduct?.id || firstProduct?.slug || idx}>
                          <ProductCardPrimary product={firstProduct} />
                          {isDouble && secondProduct ? (
                            <ProductCardPrimary product={secondProduct} />
                          ) : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Herbal Powders */}
                <div className="tab-pane fade" id="liton_tab_3_7">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {herbalProductPairs?.map(([firstProduct, secondProduct], idx) => (
                        <div
                          className="col-lg-12"
                          key={firstProduct?.id || firstProduct?.slug || idx}
                        >
                          <ProductCardPrimary
                            product={firstProduct}
                            hideCardWhenImageUnavailable={true}
                            onImageUnavailable={handleHerbalImageUnavailable}
                          />
                          {secondProduct ? (
                            <ProductCardPrimary
                              product={secondProduct}
                              hideCardWhenImageUnavailable={true}
                              onImageUnavailable={handleHerbalImageUnavailable}
                            />
                          ) : (
                            ""
                          )}
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
