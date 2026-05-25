import ProductMain from "@/components/layout/main/ShopMain";
import StructuredData from "@/components/seo/StructuredData";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import {
  buildSeoMetadata,
  getBreadcrumbSchema,
  getCollectionPageSchema,
  getItemListSchema,
} from "@/libs/seo";
import {
  buildProductCategoryPath,
  getCategoryContent,
  indexedProductCategorySlugs,
} from "@/libs/catalog";
import { getPublicProducts } from "@/libs/supabase/queries/products";

const buildCategoryFaqItems = (categoryLabel) => [
  {
    question: `Can Orbitto International export ${categoryLabel.toLowerCase()} in bulk quantities?`,
    answer: `Yes. Orbitto International supports bulk export requirements for ${categoryLabel.toLowerCase()} with documentation, coordinated logistics, and commercial packing support based on buyer requirements.`,
  },
  {
    question: `Do you support private label or custom packaging for ${categoryLabel.toLowerCase()}?`,
    answer: `Yes. Depending on the product and order scope, Orbitto International can discuss private label, packaging preferences, and export-oriented supply requirements for ${categoryLabel.toLowerCase()}.`,
  },
  {
    question: `Can buyers request specifications, MOQ details, or samples for ${categoryLabel.toLowerCase()}?`,
    answer: `Yes. Buyers can contact Orbitto International to request product specifications, application details, MOQ information, pricing, and sample support for ${categoryLabel.toLowerCase()}.`,
  },
];

export async function generateMetadata({ params }) {
  const category = getCategoryContent(params?.slug);

  return buildSeoMetadata({
    title: `${category.label} Exporter & Supplier`,
    description: category.description,
    path: buildProductCategoryPath(category.slug),
    keywords: [
      category.label,
      `${category.label} exporter`,
      `${category.label} supplier`,
      `${category.label} manufacturer`,
    ],
  });
}

export async function generateStaticParams() {
  return indexedProductCategorySlugs.map((slug) => ({ slug }));
}

const ProductCategoryPage = async ({ params }) => {
  const category = getCategoryContent(params?.slug);
  const categoryPath = buildProductCategoryPath(category.slug);
  const faqItems = buildCategoryFaqItems(category.label);
  const { data: productList } = await getPublicProducts({
    page: 1,
    limit: 12,
    category: category.slug,
  });

  return (
    <>
      <StructuredData
        id="product-category-page-schema"
        data={getCollectionPageSchema({
          title: `${category.label} Product Collection`,
          description: category.description,
          path: categoryPath,
        })}
      />
      <StructuredData
        id="product-category-breadcrumb-schema"
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: category.label, path: categoryPath },
        ])}
      />
      <StructuredData
        id="product-category-item-list-schema"
        data={getItemListSchema({
          title: `${category.label} Product List`,
          path: categoryPath,
          items: (productList || []).map((product) => ({
            name: product.title || product.name,
            path: product.path || `/products/${product.slug || product.id}`,
          })),
        })}
      />
      <PageWrapper
        isNotHeaderTop={true}
        isHeaderRight={true}
        isTextWhite={true}
        isNavbarAppointmentBtn={true}
      >
        <>
          <ProductMain
            isSidebar="primary"
            categoryOverride={category.slug}
            faqSection={{
              id: "product-category-faq",
              title: `${category.label} Export FAQ`,
              intro: `Quick answers for international buyers, distributors, and brands sourcing ${category.label.toLowerCase()} from Orbitto International.`,
              items: faqItems,
            }}
          />
        </>
      </PageWrapper>
    </>
  );
};

export default ProductCategoryPage;
