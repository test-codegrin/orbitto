"use client";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import ProductDetailsPrimary from "@/components/sections/product-details/ProductDetailsPrimary";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import CommonContext from "@/providers/CommonContext";

const ProductDetailsMain = ({
  title,
  text,
  type,
  isNotSidebar,
  breadcrumbItem,
  productIdOrSlug,
  faqSection,
}) => {
  return (
    <main>
      <HeroPrimary
        title={title ? title : "Export Product Details"}
        text={text ? text : "Product Details"}
        item={breadcrumbItem || { name: "Products", path: "/products" }}
        type={3}
      />
      <CommonContext value={{ type, isNotSidebar }}>
        <ProductDetailsPrimary initialProductIdOrSlug={productIdOrSlug} />
      </CommonContext>
      {faqSection?.items?.length ? (
        <SeoFaqSection
          id={faqSection.id}
          title={faqSection.title}
          intro={faqSection.intro}
          items={faqSection.items}
          eyebrow={faqSection.eyebrow}
        />
      ) : null}
      <Features4 />
    </main>
  );
};

export default ProductDetailsMain;
