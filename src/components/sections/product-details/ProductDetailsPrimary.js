"use client";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import ProductDetailsRight from "@/components/shared/products/ProductDetailsRight";
import ProductTechnicalSpecifications from "@/components/shared/products/ProductTechnicalSpecifications";
import { useCommonContext } from "@/providers/CommonContext";
import { useProductContext } from "@/providers/ProductContext";

const ProductDetailsPrimary = ({ initialProductIdOrSlug }) => {
  const { isNotSidebar, type } = useCommonContext();
  const { setCurrentProduct } = useProductContext();
  const { id: routeProductParam } = useParams();
  const initialProductParam = routeProductParam || initialProductIdOrSlug;

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(initialProductIdOrSlug));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSwitchingProduct, setIsSwitchingProduct] = useState(false);
  const [detailMinHeight, setDetailMinHeight] = useState(null);
  const [error, setError] = useState("");

  const productRef = useRef(null);
  const detailContentRef = useRef(null);
  const largeSliderRef = useRef(null);
  const smallSliderRef = useRef(null);
  const relatedSliderRef = useRef(null);
  const switchProductRef = useRef(null);
  const switchTimerRef = useRef(null);
  const unlockHeightTimerRef = useRef(null);

  useEffect(() => {
    productRef.current = product;
  }, [product]);

  const loadProductPageData = useCallback(async (
    productIdOrSlug,
    { showMainLoader = false } = {}
  ) => {
    if (!productIdOrSlug) return;

    const hasExistingProduct = Boolean(productRef.current);
    setIsLoading(showMainLoader || !hasExistingProduct);
    setIsRefreshing(hasExistingProduct && !showMainLoader);
    setError("");

    try {
      const preloadImage = (src) =>
        new Promise((resolve) => {
          if (!src) {
            resolve();
            return;
          }
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
          if (img.complete) resolve();
        });

      const [productResponse, relatedResponse] = await Promise.all([
        fetch(`/api/user/products/${encodeURIComponent(productIdOrSlug)}`, {
          cache: "no-store",
        }),
        fetch(`/api/user/products/${encodeURIComponent(productIdOrSlug)}/related`, {
          cache: "no-store",
        }),
      ]);

      const [productResult, relatedResult] = await Promise.all([
        productResponse.json(),
        relatedResponse.json(),
      ]);

      if (!productResponse.ok) {
        throw new Error(productResult?.message || "Unable to load product details.");
      }
      if (!relatedResponse.ok) {
        throw new Error(relatedResult?.message || "Unable to load related products.");
      }

      const nextProduct = productResult?.product || null;
      const nextRelatedProducts = relatedResult?.products || [];
      const nextLoadedProducts = [nextProduct, ...nextRelatedProducts].filter(Boolean);
      const criticalImageUrls = [
        nextProduct?.image,
        ...nextRelatedProducts.map((item) => item?.image),
      ];

      await Promise.all(criticalImageUrls.map((src) => preloadImage(src)));

      setProduct(nextProduct);
      setRelatedProducts(nextRelatedProducts);
      setLoadedProducts(nextLoadedProducts);
      setSelectedProductId(nextProduct?.id || null);
      setCurrentProduct(nextProduct);
    } catch (requestError) {
      if (showMainLoader || !hasExistingProduct) {
        setProduct(null);
        setRelatedProducts([]);
        setLoadedProducts([]);
      }
      setError(requestError?.message || "Unable to load product information.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [setCurrentProduct]);

  const switchProduct = useCallback((targetProduct) => {
    const nextProductPath = targetProduct?.slug || targetProduct?.id;
    if (!nextProductPath || targetProduct.id === productRef.current?.id) return;

    if (typeof window !== "undefined") {
      if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);
      if (unlockHeightTimerRef.current) {
        window.clearTimeout(unlockHeightTimerRef.current);
      }

      if (detailContentRef.current) {
        setDetailMinHeight(detailContentRef.current.offsetHeight);
      }

      setIsSwitchingProduct(true);

      window.history.pushState(
        window.history.state,
        "",
        `/products/${nextProductPath}`
      );

      const preloadImage = (src) =>
        new Promise((resolve) => {
          if (!src) {
            resolve();
            return;
          }
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
          if (img.complete) resolve();
        });

      switchTimerRef.current = window.setTimeout(async () => {
        await preloadImage(targetProduct?.image);
        setProduct(targetProduct);
        setSelectedProductId(targetProduct.id);
        setCurrentProduct(targetProduct);

        window.requestAnimationFrame(() => {
          setIsSwitchingProduct(false);
          unlockHeightTimerRef.current = window.setTimeout(() => {
            setDetailMinHeight(null);
          }, 260);
        });
      }, 180);
    } else {
      setProduct(targetProduct);
      setSelectedProductId(targetProduct.id);
      setCurrentProduct(targetProduct);
    }
  }, [setCurrentProduct]);

  useEffect(() => {
    return () => {
      if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);
      if (unlockHeightTimerRef.current) {
        window.clearTimeout(unlockHeightTimerRef.current);
      }
    };
  }, []);

  // Always-current ref so imperative handlers never capture a stale closure
  useEffect(() => {
    switchProductRef.current = switchProduct;
  }, [switchProduct]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handlePopState = () => {
      const productPath = window.location.pathname.split("/").filter(Boolean).pop();
      const nextProduct = loadedProducts.find(
        (item) =>
          String(item.id) === String(productPath) ||
          String(item.slug) === String(productPath)
      );

      if (nextProduct) {
        setProduct(nextProduct);
        setSelectedProductId(nextProduct.id);
        setCurrentProduct(nextProduct);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [loadedProducts, setCurrentProduct]);

  useEffect(() => {
    if (!initialProductParam) {
      setIsLoading(false);
      setError("Product not found.");
      return;
    }
    loadProductPageData(initialProductParam);
  }, [initialProductParam, loadProductPageData]);

  const galleryProducts = useMemo(() => {
    const combined = loadedProducts.filter(Boolean);
    const seen = new Set();
    return combined.filter((item) => {
      if (!item?.id || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [loadedProducts]);

  useEffect(() => {
    if (product?.id) setSelectedProductId(product.id);
  }, [product?.id]);

  const selectedProduct = useMemo(
    () => product,
    [product]
  );

  const syncCurrentProduct = useCallback(
    (targetProduct) => {
      if (!targetProduct?.id) return;
      setCurrentProduct((prev) =>
        prev?.id === targetProduct.id ? prev : targetProduct
      );
    },
    [setCurrentProduct]
  );

  useEffect(() => {
    syncCurrentProduct(selectedProduct);
  }, [selectedProduct, syncCurrentProduct]);

  // ---------------------------------------------------------------------------
  // GALLERY SLIDERS — fully imperative so React never touches the children.
  //
  // Jerk fix: instead of a hard empty() → rebuild (which collapses the layout),
  // we fade the containers out, rebuild while invisible, then fade back in.
  // The containers keep their height via `min-height` (set inline below) so
  // the page does not scroll-jump during the transition.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === "undefined" || !window.$ || !galleryProducts.length) return;
    if (!largeSliderRef.current || !smallSliderRef.current) return;

    const $ = window.$;
    const largeDom = largeSliderRef.current;
    const smallDom = smallSliderRef.current;
    const $large = $(largeDom);
    const $small = $(smallDom);

    // Capture current rendered height so the containers don't collapse while empty
    const largeH = largeDom.offsetHeight;
    const smallH = smallDom.offsetHeight;
    if (largeH) largeDom.style.minHeight = `${largeH}px`;
    if (smallH) smallDom.style.minHeight = `${smallH}px`;

    // Fade out → rebuild → fade in  (total ~150 ms, imperceptible)
    const FADE_MS = 150;
    largeDom.style.transition = `opacity ${FADE_MS}ms ease`;
    smallDom.style.transition = `opacity ${FADE_MS}ms ease`;
    largeDom.style.opacity = "0";
    smallDom.style.opacity = "0";

    const buildTimer = window.setTimeout(() => {
      // ── Tear down ──────────────────────────────────────────────────────────
      if ($large.hasClass("slick-initialized")) $large.slick("unslick");
      if ($small.hasClass("slick-initialized")) $small.slick("unslick");
      $large.empty();
      $small.empty();

      // ── Build slides ───────────────────────────────────────────────────────
      galleryProducts.forEach(({ image, title, id }) => {
        const safeAlt = (title || "Product image").replace(/"/g, "&quot;");
        const fallbackDataUri =
          "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='1000'><rect width='100%25' height='100%25' fill='%23f3f3f3'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='42' font-family='Arial'>Image unavailable</text></svg>";
        const imgTag = image
          ? `<img src="${image}" alt="${safeAlt}" width="1000" height="1000" style="width:100%;height:auto" onerror="this.onerror=null;this.src='${fallbackDataUri}'" />`
          : `<span class="product-details-image-empty" aria-label="No product image"></span>`;

        $large.append(
          $(`<div class="single-large-img"></div>`).html(
            image ? `<a href="${image}" data-rel="lightcase:myCollection">${imgTag}</a>` : imgTag
          )
        );

        const $thumb = $(`<div class="single-small-img"></div>`).html(imgTag);
        $thumb.on("click", () => {
          if (id !== productRef.current?.id) {
            const target = galleryProducts.find((item) => item.id === id);
            if (target) switchProductRef.current(target);
            return;
          }

          setSelectedProductId(id);
        });
        $small.append($thumb);
      });

      // ── Initialise Slick ───────────────────────────────────────────────────
      $large.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: ".ltn__Product-details-small-img",
      });

      $small.slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: ".ltn__Product-details-large-img",
        dots: false,
        arrows: true,
        focusOnSelect: true,
        prevArrow:
          '<button type="button" class="slick-prev" aria-label="Previous slide"><i class="fas fa-arrow-left" aria-hidden="true"></i></button>',
        nextArrow:
          '<button type="button" class="slick-next" aria-label="Next slide"><i class="fas fa-arrow-right" aria-hidden="true"></i></button>',
        responsive: [
          { breakpoint: 992, settings: { slidesToShow: 4, slidesToScroll: 1 } },
          { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
          { breakpoint: 580, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        ],
      });

      // ── Bind events ────────────────────────────────────────────────────────
      $large.on("afterChange.productDetailsSync", (_e, _slick, currentSlide) => {
        const nextProduct = galleryProducts[currentSlide];
        if (!nextProduct?.id) return;

        if (nextProduct.id !== productRef.current?.id) {
          switchProductRef.current(nextProduct);
          return;
        }

        setSelectedProductId(nextProduct.id);
      });

      if (galleryProducts.length > 1) {
        $small.on(
          "click.productDetailsArrowSync",
          ".slick-prev, .slick-next",
          (event) => {
            const isNext = $(event.currentTarget).hasClass("slick-next");
            setSelectedProductId((prevId) => {
              const cur = galleryProducts.findIndex(({ id }) => id === prevId);
              const safe = cur < 0 ? 0 : cur;
              const next = isNext
                ? (safe + 1) % galleryProducts.length
                : (safe - 1 + galleryProducts.length) % galleryProducts.length;
              const nextProduct = galleryProducts[next];

              if (nextProduct?.id && nextProduct.id !== productRef.current?.id) {
                switchProductRef.current(nextProduct);
                return prevId;
              }

              return nextProduct?.id;
            });
          }
        );
      }

      // ── Fade back in, release the clamped min-height ───────────────────────
      largeDom.style.opacity = "1";
      smallDom.style.opacity = "1";

      const clearTimer = window.setTimeout(() => {
        largeDom.style.minHeight = "";
        smallDom.style.minHeight = "";
      }, FADE_MS + 50);

      // Store so cleanup can cancel it
      largeDom._clearMinHeightTimer = clearTimer;
    }, FADE_MS);

    return () => {
      window.clearTimeout(buildTimer);
      if (largeDom._clearMinHeightTimer) {
        window.clearTimeout(largeDom._clearMinHeightTimer);
      }
      $large.off("afterChange.productDetailsSync");
      $small.off("click.productDetailsArrowSync", ".slick-prev, .slick-next");
      if ($large.hasClass("slick-initialized")) $large.slick("unslick");
      if ($small.hasClass("slick-initialized")) $small.slick("unslick");
      $large.empty();
      $small.empty();
      largeDom.style.opacity = "";
      smallDom.style.opacity = "";
      largeDom.style.minHeight = "";
      smallDom.style.minHeight = "";
    };
  }, [galleryProducts]);

  // Move slider to the selected slide (e.g. when a related card is clicked)
  useEffect(() => {
    if (typeof window === "undefined" || !window.$) return;
    if (!largeSliderRef.current || !smallSliderRef.current) return;

    const $ = window.$;
    const selectedIndex = galleryProducts.findIndex(({ id }) => id === selectedProductId);
    if (selectedIndex < 0) return;

    const $large = $(largeSliderRef.current);
    const $small = $(smallSliderRef.current);

    if (!$large.hasClass("slick-initialized") || !$small.hasClass("slick-initialized")) return;

    if ($large.slick("slickCurrentSlide") !== selectedIndex) {
      $large.slick("slickGoTo", selectedIndex, true);
    }
    if ($small.slick("slickCurrentSlide") !== selectedIndex) {
      $small.slick("slickGoTo", selectedIndex, true);
    }
  }, [galleryProducts, selectedProductId]);

  // ---------------------------------------------------------------------------
  // RELATED PRODUCTS SLIDER
  // ---------------------------------------------------------------------------
  const relatedSliderKey = relatedProducts.map((p) => p.id).join("-");

  useEffect(() => {
    if (typeof window === "undefined" || !window.$ || !relatedProducts.length) return;
    if (!relatedSliderRef.current) return;

    const $ = window.$;
    const $slider = $(relatedSliderRef.current);

    if ($slider.hasClass("slick-initialized")) $slider.slick("unslick");

    $slider.slick({
      arrows: true,
      dots: false,
      infinite: relatedProducts.length > 4,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow:
        '<button type="button" class="slick-prev" aria-label="Previous slide"><i class="fas fa-arrow-left" aria-hidden="true"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next" aria-label="Next slide"><i class="fas fa-arrow-right" aria-hidden="true"></i></button>',
      responsive: [
        { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        {
          breakpoint: 768,
          settings: { arrows: false, dots: true, slidesToShow: 2, slidesToScroll: 1 },
        },
        {
          breakpoint: 580,
          settings: { arrows: false, dots: true, slidesToShow: 2, slidesToScroll: 1 },
        },
      ],
    });

    return () => {
      if ($slider.hasClass("slick-initialized")) $slider.slick("unslick");
    };
  }, [relatedProducts]);

  if (isLoading) {
    return (
      <div className="ltn__Product-details-area pb-120">
        <div className="container">
          <div className="ltn__Product-details-inner mb-60">
            <div className="row">
              <div className="col-md-6">
                <div className="product-card-skeleton" aria-hidden="true">
                  <div
                    className="product-card-skeleton__image"
                    style={{ height: "420px", borderRadius: "10px" }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-card-skeleton" aria-hidden="true">
                  <div
                    className="product-card-skeleton__title"
                    style={{ width: "70%", height: "28px", marginBottom: "14px" }}
                  />
                  <div
                    className="product-card-skeleton__title"
                    style={{ width: "100%", height: "16px", marginBottom: "10px" }}
                  />
                  <div
                    className="product-card-skeleton__title"
                    style={{ width: "90%", height: "16px", marginBottom: "10px" }}
                  />
                  <div
                    className="product-card-skeleton__title"
                    style={{ width: "55%", height: "16px", marginBottom: "24px" }}
                  />
                  <div
                    className="product-card-skeleton__title"
                    style={{ width: "45%", height: "40px", borderRadius: "8px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="ltn__Product-details-area pb-120">
        <div className="container">
          <p className="home-products-state-text">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="ltn__Product-details-area pb-120">
        <div className="container">
          <p className="home-products-state-text">Product not found.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`ltn__Product-details-area ${
          type === 1 || type === 2 ? "pb-85" : "pb-120"
        }`}
        aria-busy={isRefreshing}
        onMouseEnter={() => syncCurrentProduct(selectedProduct)}
      >
        <div className="container">
          <div className="row">
            <div className={`${isNotSidebar ? "" : "col-lg-12"} col-md-12`}>
              <div
                ref={detailContentRef}
                className={`ltn__Product-details-inner ${
                  type === 1 || type === 2 ? "mb-60" : ""
                } product-detail-content-smooth${
                  isSwitchingProduct ? " is-switching" : ""
                }`}
                style={
                  detailMinHeight ? { minHeight: `${detailMinHeight}px` } : undefined
                }
              >
                <div className="row">
                  <div className={isNotSidebar ? "col-lg-6" : "col-md-6"}>
                    <div className="ltn__Product-details-img-gallery">
                      {/* Left empty by React — slides are injected imperatively */}
                      <div
                        ref={largeSliderRef}
                        className="ltn__Product-details-large-img"
                      />
                      <div
                        ref={smallSliderRef}
                        className="ltn__Product-details-small-img slick-arrow-2"
                      />
                    </div>
                  </div>

                  <div className={isNotSidebar ? "col-lg-6" : "col-md-6"}>
                    {/*
                      No `key` here — removing it lets React diff ProductDetailsRight
                      in-place instead of unmounting + remounting on every product
                      switch, which was the main cause of the right-panel jerk.
                      ProductDetailsRight should derive all display state from its
                      `product` prop so it updates correctly when the prop changes.
                    */}
                    <ProductDetailsRight product={selectedProduct || product} />
                  </div>
                </div>
              </div>

              <ProductTechnicalSpecifications
                specifications={(selectedProduct || product)?.specifications || {}}
                applicationsAndUses={
                  (selectedProduct || product)?.applications_and_uses || []
                }
                product={selectedProduct || product}
              />
              {error ? <p className="home-products-state-text">{error}</p> : null}
            </div>
          </div>
        </div>
      </div>

      <div className="ltn__product-slider-area ltn__product-gutter pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="mt-20">
                <h2 className="section-title">Related Products</h2>
              </div>
            </div>
          </div>

          {relatedProducts.length ? (
            <div
              key={relatedSliderKey}
              ref={relatedSliderRef}
              className="row ltn__related-product-slider-one-active slick-arrow-1"
            >
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="col-lg-12"
                >
                  <ProductCardPrimary
                    product={relatedProduct}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="home-products-state-text">No related products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPrimary;

