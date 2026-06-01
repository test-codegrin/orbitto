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

    const detachInteractionListeners = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, bootstrapLegacy);
      });
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, bootstrapLegacy, { passive: true, once: true });
    });

    return () => {
      isCancelled = true;
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
