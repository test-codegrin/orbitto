"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MobileMenu = () => {
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
      name: "Pages",
      path: "/portfolio",
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
          <button className="ltn__utilize-close">×</button>
        </div>
        <div className="ltn__utilize-menu-search-form">
          <form action="#">
            <input type="text" placeholder="Search..." />
            <button>
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
              <Link href="https://www.facebook.com" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </Link>
            </li>
            <li>
              <Link href="https://x.com" title="Twitter">
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com" title="Linkedin">
                <i className="fab fa-linkedin"></i>
              </Link>
            </li>
            <li>
              <Link href="https://www.instagram.com" title="Instagram">
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
