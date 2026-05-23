import ProductDetailsMain from "@/components/layout/main/ProductDetailsMain";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import StructuredData from "@/components/seo/StructuredData";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import {
  buildSeoMetadata,
  getBreadcrumbSchema,
  getProductSchema,
  truncateText,
} from "@/libs/seo";
import { buildProductCategoryPath } from "@/libs/catalog";
import { buildProductDetailFaqItems } from "@/libs/seoContent";
import { getPublicProductBySlug } from "@/libs/supabase/queries/products";

export async function generateMetadata({ params }) {
  const productIdOrSlug = params?.id;
  const { data: product } = await getPublicProductBySlug(productIdOrSlug);

  if (!product) {
    return buildSeoMetadata({
      title: "Product Not Found",
      description: "The requested Orbitto International product could not be found.",
      path: "/products",
      noIndex: true,
    });
  }

  const productTitle = product.title || product.product_name;
  const categoryName = product.type || product.category?.name || "Food Ingredient";
  const description = truncateText(
    product.shortDescription ||
      product.description ||
      `${productTitle} from Orbitto International for bulk export and global ingredient sourcing.`,
    165
  );

  return buildSeoMetadata({
    title: `${productTitle} Exporter & Supplier`,
    description,
    path: `/products/${product.slug || product.id}`,
    images: product.images?.length ? product.images : product.image,
    keywords: [
      productTitle,
      `${productTitle} exporter`,
      `${productTitle} supplier`,
      categoryName,
    ],
  });
}

const ProductDetails = async ({ params }) => {
  const productParam = params?.id;
  const { data: product } = await getPublicProductBySlug(productParam);
  const productTitle = product?.title || product?.product_name || "Product";
  const categoryName = product?.type || product?.category?.name || "Products";
  const productPath = `/products/${product?.slug || product?.id || productParam}`;
  const categoryPath = buildProductCategoryPath(categoryName);
  const faqItems = buildProductDetailFaqItems(productTitle, categoryName);

  return (
    <>
      <StructuredData
        id="product-detail-schema"
        data={getProductSchema(product)}
      />
      <StructuredData
        id="product-detail-breadcrumb-schema"
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          ...(product?.type ? [{ name: categoryName, path: categoryPath }] : []),
          { name: productTitle, path: productPath },
        ])}
      />
      <PageWrapper
        isNotHeaderTop={true}
        isHeaderRight={true}
        isTextWhite={true}
        isNavbarAppointmentBtn={true}
      >
        <>
          <ProductDetailsMain
            productIdOrSlug={productParam}
            title={productTitle}
            text={categoryName}
            type={1}
            breadcrumbItem={{ name: categoryName, path: categoryPath }}
          />
          <SeoFaqSection
            id="product-detail-faq"
            title={`${productTitle} FAQ`}
            intro={`Buyer-focused answers for ${productTitle} from Orbitto International.`}
            items={faqItems}
          />
        </>
      </PageWrapper>
    </>
  );
};

export default ProductDetails;
