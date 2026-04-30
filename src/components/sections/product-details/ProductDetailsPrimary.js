"use client";
import getAllProducts from "@/libs/getAllProducts";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useProductContext } from "@/providers/ProductContext";
import ProductDetailsRight from "@/components/shared/products/ProductDetailsRight";
import ProductTechnicalSpecifications from "@/components/shared/products/ProductTechnicalSpecifications";
import { useCommonContext } from "@/providers/CommonContext";

const ProductDetailsPrimary = () => {
  const { isNotSidebar, type } = useCommonContext();
  const { setCurrentProduct } = useProductContext();

  const { id: currentId } = useParams();
  const products = getAllProducts();
  const parsedId = Number.parseInt(currentId || "1", 10);

  const product = useMemo(
    () => products?.find(({ id }) => id === parsedId),
    [products, parsedId]
  );

  const allImages = useMemo(() => {
    if (!product) return [];
    const otherImages = products?.filter(({ id }) => id !== product.id);
    return [product, ...otherImages?.slice(0, 6)];
  }, [products, product]);

  const [selectedProductId, setSelectedProductId] = useState(parsedId);

  useEffect(() => {
    if (product?.id) {
      setSelectedProductId(product.id);
    }
  }, [product?.id]);

  const selectedProduct = useMemo(
    () => allImages?.find(({ id }) => id === selectedProductId) || product,
    [allImages, product, selectedProductId]
  );

  useEffect(() => {
    if (selectedProduct) {
      setCurrentProduct(selectedProduct);
    }
  }, [selectedProduct, setCurrentProduct]);

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

  if (!product) return null;

  return (
    <div
      className={`ltn__Product-details-area ${
        type === 1 || type === 2 ? "pb-85" : "pb-120"
      }`}
      onMouseEnter={() => selectedProduct && setCurrentProduct(selectedProduct)}
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
                          <Link
                            href={image || "/img/product/1.png"}
                            data-rel="lightcase:myCollection"
                          >
                            <Image
                              src={image || "/img/product/1.png"}
                              alt={title || "Product image"}
                              width={1000}
                              height={1000}
                            />
                          </Link>
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
                          <Image
                            src={image || "/img/product/1.png"}
                            alt={title || "Product image"}
                            width={1000}
                            height={1000}
                          />
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPrimary;
