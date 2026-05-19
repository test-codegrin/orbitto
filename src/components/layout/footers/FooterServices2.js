import Link from "next/link";
import React from "react";

const productLinks = [
  { name: "Fruits", href: "/products?category=fruit" },
  { name: "Vegetables", href: "/products?category=vegetable" },
  { name: "Herbal Powder", href: "/products?category=herbal_powder" },
  { name: "Spices", href: "/products?category=spices" },
  { name: "Fruit Powder", href: "/products?category=fruit_powder" },
  { name: "Honey", href: "/products?category=honey" },
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
