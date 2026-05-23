import Link from "next/link";
import { buildProductCategoryPath } from "@/libs/catalog";
import React from "react";

const productLinks = [
  { name: "Fruit Powder", href: buildProductCategoryPath("fruit-powder") },
  { name: "Vegetable Powder", href: buildProductCategoryPath("vegetable-powder") },
  { name: "Herbal Powder", href: buildProductCategoryPath("herbal-powder") },
  { name: "Spices", href: buildProductCategoryPath("spices") },
  { name: "Honey", href: buildProductCategoryPath("honey") },
];

const FooterServices2 = () => {
  return (
    <div className="col-xl-2 col-md-6 col-sm-6 col-12">
      <div className="footer-widget footer-menu-widget clearfix">
        <h4 className="footer-title">Our Products</h4>
        <div className="footer-menu">
          <ul>
            {productLinks.map(({ name, href }) => (
              <li key={href}>
                <Link href={href}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterServices2;
