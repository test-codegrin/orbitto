"use client";
import { useCommonContext } from "@/providers/CommonContext";
import ProductDetailsTab from "./ProductDetailsTab";

const ProductDetailsRight = ({ product }) => {
  const { title, desc } = product || {};  // ✅ use "desc" not "description"
  const value = useCommonContext();

  return (
    <div className="modal-product-info shop-details-info pl-0" id="details">
      {/* Title */}
      <h3>{title}</h3>

      {/* Description */}
      <p className="product-description">{desc}</p>

      {/* Contact Inquiry Button */}
      <div className="ltn__product-details-menu-2 mt-4">
        
         <a
          href="#contact"
          className="theme-btn-1 btn btn-effect-1"
          title="Contact Inquiry"
        >
          <span>Contact Inquiry</span>
        </a>
      </div>

      {/* <ProductDetailsTab product={product} /> */}
    </div>
  );
};

export default ProductDetailsRight;