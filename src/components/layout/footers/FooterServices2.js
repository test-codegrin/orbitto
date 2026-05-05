import Link from "next/link";
import React from "react";

const FooterServices2 = () => {
  return (
    <div className="col-xl-2 col-md-6 col-sm-6 col-12">
      <div className="footer-widget footer-menu-widget clearfix">
        <h4 className="footer-title">Our Products</h4>
        <div className="footer-menu">
          <ul>
            <li>
              <Link href="/products">Fruits</Link>
            </li>
            <li>
              <Link href="/products">Vegetables</Link>
            </li>
            <li>
              <Link href="/products">Herbal Powder</Link>
            </li>
            <li>
              <Link href="/products">spices</Link>
            </li>
            <li>
              <Link href="/products">Fruite Powder</Link>
            </li>
            <li>
              <Link href="/products">Honey</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterServices2;
