"use client";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import useCategories from "@/hooks/useCategories";
import useProducts from "@/hooks/useProducts";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";

const CARDS_PER_ROW = 4;
const AUTO_SLIDE_INTERVAL = 2800; // ms between each auto-slide step
const SLIDE_STEP = 1;             // cards to advance per auto tick

const Products3 = ({ title, desc, isSmallTitle, pt, type }) => {
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  const [activeCategorySlug, setActiveCategorySlug] = useState("");
  const [offset, setOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardsPerRow, setCardsPerRow] = useState(CARDS_PER_ROW);

  // Auto-slide pause flag (pause on hover / drag)
  const isPausedRef = useRef(false);
  const autoTimerRef = useRef(null);

  const trackRef = useRef(null);
  const containerRef = useRef(null);

  // drag state
  const dragRef = useRef({ active: false, startX: 0, startOffset: 0 });

  const normalizedCategories = useMemo(() => categories || [], [categories]);

  useEffect(() => {
    if (!normalizedCategories.length) return;
    if (!activeCategorySlug || !normalizedCategories.some((c) => c.slug === activeCategorySlug)) {
      setActiveCategorySlug(normalizedCategories[0].slug);
    }
  }, [normalizedCategories, activeCategorySlug]);

  useEffect(() => { setOffset(0); }, [activeCategorySlug]);

  // Responsive columns
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 580) setCardsPerRow(2);
      else if (w < 992) setCardsPerRow(2);
      else if (w < 1200) setCardsPerRow(3);
      else setCardsPerRow(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { products, isLoading: isProductsLoading, error: productsError } = useProducts({
    category: activeCategorySlug || undefined,
    limit: 100,
    page: 1,
  });

  const skeletonItems = useMemo(() => Array.from({ length: 8 }, (_, i) => i), []);

  const row1 = useMemo(() => products?.filter((_, i) => i % 2 === 0) || [], [products]);
  const row2 = useMemo(() => products?.filter((_, i) => i % 2 === 1) || [], [products]);
  const maxRowLen = Math.max(row1.length, row2.length);

  const getCardWidth = useCallback(() => {
    if (!containerRef.current) return 0;
    return containerRef.current.offsetWidth / cardsPerRow;
  }, [cardsPerRow]);

  const clampOffset = useCallback((val) => {
    const cardW = getCardWidth();
    if (!cardW || maxRowLen === 0) return 0;
    const maxOffset = -(maxRowLen - cardsPerRow) * cardW;
    return Math.min(0, Math.max(maxOffset, val));
  }, [getCardWidth, maxRowLen, cardsPerRow]);

  const getCategoryIndex = (slug) => normalizedCategories.findIndex((c) => c.slug === slug);

  const switchCategory = useCallback((dir) => {
    setActiveCategorySlug((current) => {
      const idx = normalizedCategories.findIndex((c) => c.slug === current);
      if (idx < 0) return current;
      const len = normalizedCategories.length;
      const next = dir === "next"
        ? (idx + 1) % len
        : (idx - 1 + len) % len;
      return normalizedCategories[next].slug;
    });
  }, [normalizedCategories]);

  // ─── Core slide-forward logic (used by both auto and manual) ─────────────
  const slideNext = useCallback((currentOffset) => {
    const cardW = getCardWidth();
    if (!cardW) return currentOffset;
    const maxOffset = -(maxRowLen - cardsPerRow) * cardW;
    const newOffset = currentOffset - cardW * SLIDE_STEP;
    const clamped = clampOffset(newOffset);

    if (currentOffset <= maxOffset) {
      // Already at the end — switch category (offset resets via useEffect)
      switchCategory("next");
      return 0;
    }
    return clamped;
  }, [getCardWidth, maxRowLen, cardsPerRow, clampOffset, switchCategory]);

  const slidePrev = useCallback((currentOffset) => {
    const cardW = getCardWidth();
    if (!cardW) return currentOffset;
    const newOffset = currentOffset + cardW * SLIDE_STEP;
    const clamped = clampOffset(newOffset);
    if (currentOffset === 0) {
      switchCategory("prev");
      return 0;
    }
    return clamped;
  }, [getCardWidth, clampOffset, switchCategory]);

  // ─── Auto-slide engine ───────────────────────────────────────────────────
  useEffect(() => {
    if (isProductsLoading || isCategoriesLoading || !products?.length) return;

    const tick = () => {
      if (isPausedRef.current) return;
      if (maxRowLen <= cardsPerRow) return; // nothing to slide, all cards visible
      setIsAnimating(true);
      setOffset((prev) => slideNext(prev));
      setTimeout(() => setIsAnimating(false), 400);
    };

    autoTimerRef.current = setInterval(tick, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(autoTimerRef.current);
  }, [isProductsLoading, isCategoriesLoading, products, slideNext]);

  // ─── Manual arrow handlers ───────────────────────────────────────────────
  const handlePrev = () => {
    if (isProductsLoading) return;
    setIsAnimating(true);
    setOffset((prev) => slidePrev(prev));
    setTimeout(() => setIsAnimating(false), 380);
  };

  const handleNext = () => {
    if (isProductsLoading) return;
    setIsAnimating(true);
    setOffset((prev) => slideNext(prev));
    setTimeout(() => setIsAnimating(false), 380);
  };

  // ─── Pause / resume helpers ──────────────────────────────────────────────
  const pauseAuto = () => { isPausedRef.current = true; };
  const resumeAuto = () => { isPausedRef.current = false; };

  // ─── Drag handlers ───────────────────────────────────────────────────────
  const onDragStart = (e) => {
    pauseAuto();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragRef.current = { active: true, startX: clientX, startOffset: offset };
    if (trackRef.current) trackRef.current.style.transition = "none";
  };

  const onDragMove = (e) => {
    if (!dragRef.current.active) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = clientX - dragRef.current.startX;
    setOffset(clampOffset(dragRef.current.startOffset + delta));
  };

  const onDragEnd = (e) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    if (trackRef.current) trackRef.current.style.transition = "";
    const clientX = e.changedTouches
      ? e.changedTouches[0].clientX
      : e.clientX ?? dragRef.current.startX;
    const delta = clientX - dragRef.current.startX;
    const cardW = getCardWidth();
    const rawIndex = -offset / cardW;
    const snapped = delta < -30
      ? Math.ceil(rawIndex)
      : delta > 30
      ? Math.floor(rawIndex)
      : Math.round(rawIndex);
    setIsAnimating(true);
    setOffset(clampOffset(-snapped * cardW));
    setTimeout(() => {
      setIsAnimating(false);
      resumeAuto();
    }, 380);
  };

  // ─── Render helpers ──────────────────────────────────────────────────────
  // When all products fit within the visible window, center them
  const isCentered = maxRowLen <= cardsPerRow;

  const renderRow = (rowProducts, rowKey) => (
    <div
      style={{
        display: "flex",
        gap: "0",
        justifyContent: isCentered ? "center" : "flex-start",
      }}
    >
      {rowProducts.map((product) => (
        <div
          key={`${rowKey}-${product.id}`}
          style={{
            flex: `0 0 ${100 / cardsPerRow}%`,
            maxWidth: `${100 / cardsPerRow}%`,
            padding: "0 8px",
            boxSizing: "border-box",
          }}
        >
          <ProductCardPrimary product={product} />
        </div>
      ))}
    </div>
  );

  const renderSkeletonRow = () => (
    <div style={{ display: "flex" }}>
      {skeletonItems.slice(0, cardsPerRow).map((i) => (
        <div
          key={i}
          style={{
            flex: `0 0 ${100 / cardsPerRow}%`,
            padding: "0 8px",
            boxSizing: "border-box",
          }}
        >
          <div className="product-card-skeleton" aria-hidden="true">
            <div className="product-card-skeleton__image" />
            <div className="product-card-skeleton__title" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section>
      <div
        className={`ltn__product-tab-area ltn__product-gutter products3-fixed-card-grid pb-70 ${
          pt || "pt-115"
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">

              {/* Title */}
              <div
                className={`section-title-area ${
                  type === 2 ? "" : isSmallTitle ? "text-center" : "ltn__section-title-2 text-center"
                }`}
              >
                <h2 className="section-title">{title || "Our Products"}</h2>
                {desc && <p>{desc}</p>}
              </div>

              {/* Category tabs */}
              <div
                className={`ltn__tab-menu ltn__tab-menu-2 ${
                  type === 2 ? "ltn__tab-menu-top-right" : ""
                } text-uppercase text-center home-products-tabs-wrap`}
              >
                <div className="nav home-products-tabs" role="tablist" aria-label="Product categories">
                  {isCategoriesLoading
                    ? skeletonItems.slice(0, 6).map((i) => (
                        <span key={`cat-sk-${i}`} className="home-products-tab-skeleton" />
                      ))
                    : normalizedCategories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          className={`home-products-tab-btn ${
                            activeCategorySlug === category.slug ? "active show" : ""
                          }`}
                          onClick={() => setActiveCategorySlug(category.slug)}
                        >
                          {category.name}
                        </button>
                      ))}
                </div>
              </div>

              {/* Slider stage */}
              <div
                className="home-products-stage"
                style={{ position: "relative" }}
                onMouseEnter={pauseAuto}
                onMouseLeave={resumeAuto}
              >
                {/* Overflow container */}
                <div
                  ref={containerRef}
                  style={{ overflow: "hidden", width: "100%", cursor: "grab" }}
                  onMouseDown={onDragStart}
                  onMouseMove={onDragMove}
                  onMouseUp={onDragEnd}
                  onMouseLeave={onDragEnd}
                  onTouchStart={onDragStart}
                  onTouchMove={onDragMove}
                  onTouchEnd={onDragEnd}
                >
                  {/* Sliding track */}
                  <div
                    ref={trackRef}
                    style={{
                      transform: `translateX(${offset}px)`,
                      transition: isAnimating ? "transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
                      willChange: "transform",
                      userSelect: "none",
                    }}
                  >
                    {isProductsLoading ? (
                      <>
                        {renderSkeletonRow()}
                        <div style={{ marginTop: "16px" }}>{renderSkeletonRow()}</div>
                      </>
                    ) : productsError ? (
                      <p className="home-products-state-text">{productsError}</p>
                    ) : products?.length ? (
                      <>
                        {renderRow(row1, "r1")}
                        <div style={{ marginTop: "16px" }}>
                          {renderRow(row2, "r2")}
                        </div>
                      </>
                    ) : (
                      <p className="home-products-state-text">
                        No products available in this category.
                      </p>
                    )}
                  </div>
                </div>

                {/* Nav buttons */}
                <div className="home-products-nav">
                  <button
                    type="button"
                    className="home-products-nav-btn"
                    onClick={handlePrev}
                    disabled={isProductsLoading || isCategoriesLoading}
                    aria-label="Previous products"
                  >
                    <i className="fas fa-arrow-left"></i>
                  </button>
                  <button
                    type="button"
                    className="home-products-nav-btn home-products-nav-btn-next"
                    onClick={handleNext}
                    disabled={isProductsLoading || isCategoriesLoading}
                    aria-label="Next products"
                  >
                    <i className="fas fa-arrow-right"></i>
                  </button>
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
