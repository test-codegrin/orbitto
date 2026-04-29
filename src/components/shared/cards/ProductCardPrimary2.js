"use client";

import sliceText from "@/libs/sliceText";
import { useProductContext } from "@/providers/ProductContext";
import Image from "next/image";
import Link from "next/link";

const ProductCardPrimary2 = ({ product }) => {
  const { title, desc, image, id, status } = product;
  const { setCurrentProduct } = useProductContext();

  return (
    <div
      className="ltn__product-item ltn__product-item-3"
      onMouseEnter={() => setCurrentProduct(product)}
    >
      <div className="product-img">
        <Link href={`/products/${id}`}>
          <Image src={image} alt={title} width={1000} height={1000} />
        </Link>
        {status && (
          <div className="product-badge">
            <ul>
              {status === "sale" ? (
                <li className="new-badge">{status}</li>
              ) : (
                <li className="sale-badge">{status}</li>
              )}
            </ul>
          </div>
        )}
      </div>
      <div className="product-info">
        <h2 className="product-title">
          <Link href={`/products/${id}`}>{title}</Link>
        </h2>
        <div className="product-brief">
          <p>{sliceText(desc, 140)}</p>
        </div>
      </div>
      {/* Contact Inquiry Button */}
      <div className="ltn__product-details-menu-2 text-center mb-3">
        
         <a
          href="/contact"
          className="theme-btn-1 btn btn-effect-1 "
          title="Contact Inquiry"
        >
          <span>Contact Inquiry</span>
        </a>
      </div>
    </div>
  );
};

export default ProductCardPrimary2;