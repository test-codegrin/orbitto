"use client";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import ProductDetailsPrimary from "@/components/sections/product-details/ProductDetailsPrimary";
import CommonContext from "@/providers/CommonContext";

const ProductDetailsMain = ({
  title,
  text,
  type,
  isNotSidebar,
  breadcrumbItem,
  productIdOrSlug,
}) => {
  return (
    <main>
      <HeroPrimary
        title={title ? title : "Product Details"}
        text={text ? text : "Product Details"}
        item={breadcrumbItem || { name: "Products", path: "/products" }}
        type={3}
      />
      <CommonContext value={{ type, isNotSidebar }}>
        <ProductDetailsPrimary initialProductIdOrSlug={productIdOrSlug} />
      </CommonContext>
      <Features4 />
    </main>
  );
};

export default ProductDetailsMain;
