"use client";

const ProductDetailsRight = ({ product }) => {
  const { title, desc, description, type } = product || {};

  return (
    <div className="modal-product-info Product-details-info pl-0" id="details">
      <h3>{title}</h3>

      <p className="product-description">{description || desc}</p>

      {!!type && (
        <p className="product-category-text">
          <strong>Category:</strong> {type}
        </p>
      )}

      <div className="ltn__product-details-menu-2 mt-4">
        <a
          href="/contact"
          className="theme-btn-1 btn btn-effect-1"
          title="Contact Inquiry"
        >
          <span>Contact Inquiry</span>
        </a>
      </div>
    </div>
  );
};

export default ProductDetailsRight;