"use client";
import { useEffect } from "react";
import Header from "@/components/layout/headers/Header";
import HeaderContex from "@/providers/HeaderContex";
import Footer from "@/components/layout/footers/Footer";
import FooterContexProvider from "@/providers/FooterContext";

import Preloader from "../others/Preloader";
import main from "@/libs/main";
import ProductContext from "@/providers/ProductContext";

let legacyPluginLoaderPromise = null;
const loadLegacyPlugins = () => {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.$) return Promise.resolve();
  if (legacyPluginLoaderPromise) return legacyPluginLoaderPromise;

  legacyPluginLoaderPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/plugins.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load /plugins.js"));
    document.body.appendChild(script);
  });

  return legacyPluginLoaderPromise;
};

const PageWrapper = ({
  children,
  headerStyle,
  headerSize,
  headerTopStyle,
  isNotHeaderTop,
  headerTopBg,
  isHeaderRight,
  isStickyOnMobile,
  isTextWhite,
  navBg,
  isNotHeaderRight,
  isHeaderSupport,
  isNavbarAppointmentBtn,
  isNotTransparent,
  footerBg,
  isCommingSoon,
}) => {
  useEffect(() => {
    let isCancelled = false;
    let cleanupMain = () => {};
    let booted = false;

    const bootstrapLegacy = () => {
      if (booted || isCancelled) return;
      booted = true;
      loadLegacyPlugins()
        .then(() => {
          if (isCancelled) return;
          cleanupMain = main() || (() => {});
        })
        .catch(() => {});
      detachInteractionListeners();
    };

    const interactionEvents = [
      "pointerdown",
      "touchstart",
      "keydown",
      "scroll",
      "mousemove",
    ];
    const needsLegacySelectors = [
      ".ltn__slide-one-active",
      ".ltn__blog-slider-one-active",
      ".ltn__related-product-slider-one-active",
      ".ltn__Product-details-large-img",
      ".ltn__Product-details-small-img",
      ".ltn__category-slider-active",
      ".ltn__testimonial-slider-active",
    ];

    const detachInteractionListeners = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, bootstrapLegacy);
      });
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, bootstrapLegacy, { passive: true, once: true });
    });

    // Load when a legacy-driven widget is close to viewport.
    let observer = null;
    const watchedNode = needsLegacySelectors
      .map((selector) => document.querySelector(selector))
      .find(Boolean);
    if (watchedNode && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            bootstrapLegacy();
          }
        },
        { rootMargin: "200px 0px" }
      );
      observer.observe(watchedNode);
    }

    // Fallback for low-interaction sessions.
    const idleHandle = window.setTimeout(() => {
      if (!booted) bootstrapLegacy();
    }, 3500);

    return () => {
      isCancelled = true;
      if (observer) observer.disconnect();
      window.clearTimeout(idleHandle);
      detachInteractionListeners();
      cleanupMain();
    };
  }, []);
  return (
    <div className="body-wrapper">
      {isCommingSoon ? (
        children
      ) : (
        <>
          <HeaderContex
            value={{
              headerStyle,
              headerSize,
              headerTopStyle,
              isNotHeaderTop,
              headerTopBg,
              isTextWhite,
              isStickyOnMobile,
              navBg,
              isHeaderRight,
              isNotHeaderRight,
              isHeaderSupport,
              isNavbarAppointmentBtn,
              isNotTransparent,
            }}
          >
            <Header />
          </HeaderContex>

          <ProductContext>{children}</ProductContext>

          <FooterContexProvider value={{ footerBg }}>
            <Footer />
          </FooterContexProvider>
        </>
      )}

      <Preloader />
    </div>
  );
};

export default PageWrapper;
