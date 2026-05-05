"use client";
import HeaderTop from "./HeaderTop";
import Logo from "./Logo";
import Navbar from "./Navbar";
import HeaderRight from "./HeaderRight";
import MobileMenu from "./MobileMenu";
import { useHeaderContex } from "@/providers/HeaderContex";
import ButtonOpenMobileMenu from "@/components/shared/buttons/ButtonOpenMobileMenu";
import HeaderSearch from "./HeaderSearch";
import MobileMenuShow from "./MobileMenuShow";
import HeaderBottom from "./HeaderBottom";

const Header = () => {
  const {
    headerStyle,
    headerSize,
    isNotHeaderTop,
    isNotHeaderRight,
    isNotTransparent,
    isTextWhite,
    isStickyOnMobile,
  } = useHeaderContex();

  const closeMobileMenu = (event) => {
    event.preventDefault();

    document.body.classList.remove("ltn__utilize-open");
    document
      .getElementById("ltn__utilize-mobile-menu")
      ?.classList.remove("ltn__utilize-open");

    document.querySelectorAll(".mobile-menu-toggle a").forEach((button) => {
      button.classList.remove("close");
    });

    event.currentTarget.style.display = "none";
  };

  return (
    <>
      <header
        className={`ltn__header-area    ${
          headerStyle === 2
            ? "ltn__header-4 ltn__header-6 ltn__header-transparent gradient-color-2"
            : headerStyle === 3
            ? isNotHeaderRight
              ? "ltn__header-4 "
              : "ltn__header-4 ltn__header-7 "
            : headerStyle === 4
            ? "ltn__header-4 ltn__header-6 "
            : headerStyle === 5
            ? "ltn__header-3 section-bg-6"
            : isNotTransparent
            ? "ltn__header-5"
            : " ltn__header-transparent ltn__header-5  "
        } ${isTextWhite ? "gradient-color-2" : ""}`}
      >
        {isNotHeaderTop ? "" : <HeaderTop />}

        <div
          className={`ltn__header-middle-area  
            ${headerStyle === 5 ? "" : "ltn__header-sticky"} ${
            isStickyOnMobile ? "sticky-active-into-mobile" : ""
          }  
            ${
              headerStyle === 5
                ? ""
                : headerStyle === 2 || isTextWhite
                ? "ltn__sticky-bg-black"
                : "ltn__sticky-bg-white "
            }  
            ${
              isNotHeaderRight
                ? "ltn__logo-right-menu-option"
                : headerStyle === 5
                ? ""
                : headerStyle === 3
                ? ""
                : "ltn__logo-right-menu-option "
            }  ${headerSize === "lg" ? "plr--9" : ""}`}
        >
          <div
            className={headerSize === "lg" ? "container-fluid" : "container"}
          >
            <div className="row">
              <Logo />
              {headerStyle === 5 ? <HeaderSearch /> : <Navbar />}

              {isNotHeaderRight ? (
                <ButtonOpenMobileMenu />
              ) : headerStyle === 2 && headerSize === "lg" ? (
                <HeaderRight />
              ) : headerStyle === 2 || headerStyle === 4 ? (
                <ButtonOpenMobileMenu />
              ) : (
                // ✅ Removed headerStyle === 5 check for HeaderRight2, now always renders HeaderRight
                <HeaderRight />
              )}
            </div>
          </div>
        </div>

        {headerStyle === 5 ? <HeaderBottom /> : ""}
      </header>
      <MobileMenu />
      <div className="ltn__utilize-overlay" onClick={closeMobileMenu}></div>
      {headerStyle === 5 ? <MobileMenuShow /> : ""}
    </>
  );
};

export default Header;
