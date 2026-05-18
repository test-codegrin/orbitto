"use client";
import makePath from "@/libs/makePath";
import { socialUrls } from "@/libs/contactInfo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const MobileMenu = () => {
  const router = useRouter();

  const closeMobileMenu = (event) => {
    event.preventDefault();
    closeMobileMenuPanel();
  };

  const closeMobileMenuPanel = () => {
    document.body.classList.remove("ltn__utilize-open");
    document
      .getElementById("ltn__utilize-mobile-menu")
      ?.classList.remove("ltn__utilize-open");

    document.querySelectorAll(".mobile-menu-toggle a").forEach((button) => {
      button.classList.remove("close");
    });

    const overlay = document.querySelector(".ltn__utilize-overlay");
    if (overlay) {
      overlay.style.display = "none";
    }
  };

  const handleProductSearch = (event) => {
    event.preventDefault();
    const searchValue = event.currentTarget.search.value.trim();

    if (!searchValue) return;

    closeMobileMenuPanel();
    router.push(`/products?search=${makePath(searchValue)}`);
    event.currentTarget.reset();
  };

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Product",
      path: "/products",
    },
    {
      name: "News",
      path: "/blogs",
    },
    {
      name: "Application",
      path: "/application",
    },
    {
      name: "Contact",
      path: "/contact",
      accordion: null,
    },
  ];
  return (
    <div
      id="ltn__utilize-mobile-menu"
      className="ltn__utilize ltn__utilize-mobile-menu"
    >
      <div className="ltn__utilize-menu-inner ltn__scrollbar">
        <div className="ltn__utilize-menu-head">
          <div className="site-logo">
            <Link href="/">
              <Image src="/img/logo.png" alt="Logo" width={154} height={42} />
            </Link>
          </div>
          <button className="ltn__utilize-close" onClick={closeMobileMenu}>
            ×
          </button>
        </div>
        <div className="ltn__utilize-menu-search-form">
          <form onSubmit={handleProductSearch}>
            <input type="text" name="search" placeholder="Search products..." />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <div className="ltn__utilize-menu">
          <ul>
            {navItems?.map(({ name, path, accordionItems }, idx) => (
              <li key={idx}>
                <Link href={path}>{name}</Link>
                {accordionItems ? (
                  <ul className="sub-menu">
                    {accordionItems?.map(
                      ({ name: name1, path: path1, label }, idx1) => (
                        <li key={idx1}>
                          <Link href={path1}>
                            {name1}{" "}
                            {label ? (
                              <span className="menu-item-badge">{label}</span>
                            ) : (
                              ""
                            )}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="ltn__social-media-2 mt-5">
          <ul>
            <li>
              <Link
                href={socialUrls.facebook}
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
            </li>
            <li>
              <Link
                href={socialUrls.x}
                title="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link
                href={socialUrls.linkedin}
                title="Linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </Link>
            </li>
            <li>
              <Link
                href={socialUrls.instagram}
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
