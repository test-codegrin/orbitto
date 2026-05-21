"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useProductContext } from "@/providers/ProductContext";
import ProductDetailsRight from "@/components/shared/products/ProductDetailsRight";
import ProductTechnicalSpecifications from "@/components/shared/products/ProductTechnicalSpecifications";
import { useCommonContext } from "@/providers/CommonContext";

const ProductDetailsPrimary = ({ initialProduct }) => {
  const { isNotSidebar, type } = useCommonContext();
  const { setCurrentProduct } = useProductContext();

  const { id: currentProductParam } = useParams();
  const product = initialProduct;

  const allImages = useMemo(() => {
    if (!product) return [];
    return [product];
  }, [product]);

  const [selectedProductId, setSelectedProductId] = useState(product?.id);

  useEffect(() => {
    if (product?.id) {
      setSelectedProductId(product.id);
    }
  }, [product?.id]);

  const selectedProduct = useMemo(
    () => allImages?.find(({ id }) => id === selectedProductId) || product,
    [allImages, product, selectedProductId]
  );

  const syncCurrentProduct = useCallback(
    (targetProduct) => {
      if (!targetProduct?.id) return;
      setCurrentProduct((prevProduct) =>
        prevProduct?.id === targetProduct.id ? prevProduct : targetProduct
      );
    },
    [setCurrentProduct]
  );

  useEffect(() => {
    syncCurrentProduct(selectedProduct);
  }, [selectedProduct, syncCurrentProduct]);

  useEffect(() => {
    if (!currentProductParam || typeof window === "undefined") return;

    const nextProductPath = selectedProduct?.slug || selectedProduct?.id;
    if (!nextProductPath) return;

    if (String(nextProductPath) !== String(currentProductParam)) {
      window.history.replaceState(
        window.history.state,
        "",
        `/products/${nextProductPath}`
      );
    }
  }, [selectedProduct, currentProductParam]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.$ || !allImages?.length) {
      return;
    }

    const selectedIndex = allImages.findIndex(({ id }) => id === selectedProductId);
    if (selectedIndex < 0) return;

    const $ = window.$;

    const syncSliderToSelection = () => {
      const $largeImageSlider = $(".ltn__Product-details-large-img");
      const $smallImageSlider = $(".ltn__Product-details-small-img");

      if (
        !$largeImageSlider.length ||
        !$smallImageSlider.length ||
        !$largeImageSlider.hasClass("slick-initialized") ||
        !$smallImageSlider.hasClass("slick-initialized")
      ) {
        return false;
      }

      if ($largeImageSlider.slick("slickCurrentSlide") !== selectedIndex) {
        $largeImageSlider.slick("slickGoTo", selectedIndex, true);
      }

      if ($smallImageSlider.slick("slickCurrentSlide") !== selectedIndex) {
        $smallImageSlider.slick("slickGoTo", selectedIndex, true);
      }

      return true;
    };

    if (syncSliderToSelection()) {
      return;
    }

    const retryTimer = window.setInterval(() => {
      if (syncSliderToSelection()) {
        window.clearInterval(retryTimer);
      }
    }, 250);

    return () => {
      window.clearInterval(retryTimer);
    };
  }, [allImages, selectedProductId]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.$ || !allImages?.length) {
      return;
    }

    const $ = window.$;
    const handleAfterChange = (_event, _slick, currentSlide) => {
      const nextProduct = allImages[currentSlide];
      if (nextProduct?.id) {
        setSelectedProductId(nextProduct.id);
      }
    };

    const bindAfterChange = () => {
      const $largeImageSlider = $(".ltn__Product-details-large-img");
      if (!$largeImageSlider.length || !$largeImageSlider.hasClass("slick-initialized")) {
        return false;
      }

      $largeImageSlider.off("afterChange.productDetailsSync");
      $largeImageSlider.on("afterChange.productDetailsSync", handleAfterChange);
      return true;
    };

    if (bindAfterChange()) {
      return () => {
        $(".ltn__Product-details-large-img").off("afterChange.productDetailsSync");
      };
    }

    const retryTimer = window.setInterval(() => {
      if (bindAfterChange()) {
        window.clearInterval(retryTimer);
      }
    }, 250);

    return () => {
      window.clearInterval(retryTimer);
      $(".ltn__Product-details-large-img").off("afterChange.productDetailsSync");
    };
  }, [allImages]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.$ || allImages.length < 2) {
      return;
    }

    const $ = window.$;
    const $smallImageSlider = $(".ltn__Product-details-small-img");

    const handleArrowClick = (event) => {
      const isNextArrow = $(event.currentTarget).hasClass("slick-next");

      setSelectedProductId((prevId) => {
        const currentIndex = allImages.findIndex(({ id }) => id === prevId);
        const safeCurrentIndex = currentIndex < 0 ? 0 : currentIndex;
        const nextIndex = isNextArrow
          ? (safeCurrentIndex + 1) % allImages.length
          : (safeCurrentIndex - 1 + allImages.length) % allImages.length;

        return allImages[nextIndex]?.id;
      });
    };

    $smallImageSlider.off("click.productDetailsArrowSync", ".slick-prev, .slick-next");
    $smallImageSlider.on(
      "click.productDetailsArrowSync",
      ".slick-prev, .slick-next",
      handleArrowClick
    );

    return () => {
      $smallImageSlider.off(
        "click.productDetailsArrowSync",
        ".slick-prev, .slick-next"
      );
    };
  }, [allImages]);

  if (!product) return null;

  return (
    <div
      className={`ltn__Product-details-area ${
        type === 1 || type === 2 ? "pb-85" : "pb-120"
      }`}
      onMouseEnter={() => syncCurrentProduct(selectedProduct)}
    >
      <div className="container">
        <div className="row">
          <div className={`${isNotSidebar ? "" : "col-lg-12"} col-md-12`}>
            <div
              className={`ltn__Product-details-inner ${
                type === 1 || type === 2 ? "mb-60" : ""
              }`}
            >
              <div className="row">
                <div className={isNotSidebar ? "col-lg-6" : "col-md-6"}>
                  <div className="ltn__Product-details-img-gallery">
                    <div className="ltn__Product-details-large-img">
                      {allImages?.map(({ image, title, id }) => (
                        <div key={id} className="single-large-img">
                          {image ? (
                            <Link
                              href={image}
                              data-rel="lightcase:myCollection"
                            >
                              <Image
                                src={image}
                                alt={title || "Product image"}
                                width={1000}
                                height={1000}
                              />
                            </Link>
                          ) : (
                            <span
                              className="product-details-image-empty"
                              aria-label="No product image"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="ltn__Product-details-small-img slick-arrow-2">
                      {allImages?.map(({ image, title, id }) => (
                        <div
                          key={id}
                          className="single-small-img"
                          onClick={() => setSelectedProductId(id)}
                        >
                          {image ? (
                            <Image
                              src={image}
                              alt={title || "Product image"}
                              width={1000}
                              height={1000}
                            />
                          ) : (
                            <span
                              className="product-details-thumb-empty"
                              aria-label="No product image"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={isNotSidebar ? "col-lg-6" : "col-md-6"}>
                  <ProductDetailsRight
                    key={selectedProduct?.id || product.id}
                    product={selectedProduct || product}
                  />
                </div>
              </div>
            </div>
            <ProductTechnicalSpecifications
              specifications={
                (selectedProduct || product)?.specifications || {}
              }
              applicationsAndUses={
                (selectedProduct || product)?.applications_and_uses || []
              }
              product={selectedProduct || product}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPrimary;
