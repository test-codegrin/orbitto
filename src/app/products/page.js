import ProductMain from "@/components/layout/main/ShopMain";
import StructuredData from "@/components/seo/StructuredData";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import {
  buildSeoMetadata,
  getBreadcrumbSchema,
  getCollectionPageSchema,
  getItemListSchema,
  humanizeSlug,
} from "@/libs/seo";
import { buildProductCategoryPath } from "@/libs/catalog";
import { getPublicProducts } from "@/libs/supabase/queries/products";

const readSearchParam = (value) =>
  Array.isArray(value) ? value[0] : value;

const getProductsSeo = (searchParams = {}) => {
  const category = readSearchParam(searchParams?.category)?.trim();
  const search = readSearchParam(searchParams?.search)?.trim();
  const hasSecondaryFilters = ["brand", "tag", "size", "color"].some((filterKey) =>
    Boolean(readSearchParam(searchParams?.[filterKey])?.trim())
  );

  if (search) {
    return {
      title: `Search Results for ${search}`,
      description: `Search the Orbitto International product catalog for ${search} and find export-ready fruit powders, vegetable powders, spices, honey, and herbal ingredients.`,
      canonicalPath: "/products",
      schemaPath: "/products",
      noIndex: true,
      keywords: [search, `${search} supplier`],
      schemaName: "Product Search Results",
    };
  }

  if (hasSecondaryFilters) {
    return {
      title: "Filtered Product Catalog",
      description:
        "Browse Orbitto International's export-focused product catalog for food and beverage ingredients.",
      canonicalPath: "/products",
      schemaPath: "/products",
      noIndex: true,
      keywords: ["product catalog filters"],
      schemaName: "Filtered Product Catalog",
    };
  }

  if (category) {
    const categoryLabel = humanizeSlug(category);

    return {
      title: `${categoryLabel} Exporter & Supplier`,
      description: `Explore ${categoryLabel.toLowerCase()} from Orbitto International for bulk supply, private label needs, and global food ingredient sourcing.`,
      canonicalPath: buildProductCategoryPath(category),
      schemaPath: buildProductCategoryPath(category),
      noIndex: true,
      keywords: [
        categoryLabel,
        `${categoryLabel} exporter`,
        `${categoryLabel} supplier`,
      ],
      schemaName: `${categoryLabel} Product Collection`,
    };
  }

  return {
    title: "Export Products",
    description:
      "Browse Orbitto International products including fruit powders, vegetable powders, spices, honey, and herbal ingredients for global food and beverage applications.",
    canonicalPath: "/products",
    schemaPath: "/products",
    noIndex: false,
    keywords: [
      "export products",
      "bulk food ingredients",
      "fruit powder catalog",
      "vegetable powder catalog",
    ],
    schemaName: "Orbitto Product Catalog",
  };
};

const productsFaqItems = [
  {
    question: "What product categories does Orbitto International export?",
    answer:
      "Orbitto International focuses on export-oriented fruit powders, vegetable powders, spices, honey, herbal powders, and related food ingredient solutions for global buyers and brands.",
  },
  {
    question: "Can buyers request bulk supply, private label, or contract manufacturing support?",
    answer:
      "Yes. Orbitto International supports bulk ingredient supply and can discuss private label or contract manufacturing requirements based on the product category and order scope.",
  },
  {
    question: "Can I request specifications, MOQ, pricing, or samples before ordering?",
    answer:
      "Yes. Buyers can contact Orbitto International for product specifications, application details, MOQ information, export pricing discussions, and sample-related enquiries.",
  },
];

export async function generateMetadata({ searchParams }) {
  const seo = getProductsSeo(searchParams);

  return buildSeoMetadata({
    title: seo.title,
    description: seo.description,
    path: seo.canonicalPath,
    noIndex: seo.noIndex,
    keywords: seo.keywords,
  });
}

const Products = async ({ searchParams }) => {
  const seo = getProductsSeo(searchParams);
  const { data: productList } = seo.noIndex
    ? { data: [] }
    : await getPublicProducts({ page: 1, limit: 12 });

  return (
    <>
      <StructuredData
        id="products-page-schema"
        data={getCollectionPageSchema({
          title: seo.schemaName,
          description: seo.description,
          path: seo.schemaPath,
        })}
      />
      <StructuredData
        id="products-breadcrumb-schema"
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
      {!seo.noIndex ? (
        <StructuredData
          id="products-item-list-schema"
          data={getItemListSchema({
            title: "Orbitto Product Catalog Items",
            path: "/products",
            items: (productList || []).map((product) => ({
              name: product.title || product.name,
              path: product.path || `/products/${product.slug || product.id}`,
            })),
          })}
        />
      ) : null}
      <PageWrapper
        isNotHeaderTop={true}
        isHeaderRight={true}
        isTextWhite={true}
        isNavbarAppointmentBtn={true}
      >
        <>
          <ProductMain
            isSidebar="primary"
            title="Export Product Catalog"
            text="Products"
            faqSection={{
              id: "products-faq",
              title: "Products FAQ",
              intro:
                "Key questions from international buyers sourcing Orbitto ingredients.",
              items: productsFaqItems,
            }}
          />
        </>
      </PageWrapper>
    </>
  );
};

export default Products;
