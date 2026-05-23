import BlogsMain from "@/components/layout/main/BlogsMain";
import StructuredData from "@/components/seo/StructuredData";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import {
  buildSeoMetadata,
  getBreadcrumbSchema,
  getCollectionPageSchema,
  getItemListSchema,
} from "@/libs/seo";
import { getPublicBlogsList } from "@/libs/supabase/queries/blogs";

export async function generateMetadata({ searchParams }) {
  const hasFilters =
    Boolean(searchParams?.category) ||
    Boolean(searchParams?.author) ||
    Boolean(searchParams?.author_role);

  return buildSeoMetadata({
    title: "F&B Insights and Export Blog",
    description:
      "Read Orbitto International articles on food ingredient trends, export-ready powders, applications, sourcing insights, and product innovation for global buyers.",
    path: "/blogs",
    keywords: [
      "food ingredient blog",
      "export insights",
      "fruit powder applications",
      "ingredient trends",
    ],
    noIndex: hasFilters,
  });
}

const Blogs = async ({ searchParams }) => {
  const hasFilters =
    Boolean(searchParams?.category) ||
    Boolean(searchParams?.author) ||
    Boolean(searchParams?.author_role);
  const { data: blogList } = hasFilters
    ? { data: [] }
    : await getPublicBlogsList({ limit: 12 });

  return (
    <>
      <StructuredData
        id="blogs-page-schema"
        data={getCollectionPageSchema({
          title: "Orbitto Insights Blog",
          description:
            "Articles and updates from Orbitto International on ingredient applications, export planning, and food product trends.",
          path: "/blogs",
        })}
      />
      <StructuredData
        id="blogs-breadcrumb-schema"
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blogs", path: "/blogs" },
        ])}
      />
      {!hasFilters ? (
        <StructuredData
          id="blogs-item-list-schema"
          data={getItemListSchema({
            title: "Orbitto Blog Articles",
            path: "/blogs",
            items: (blogList || []).map((blog) => ({
              name: blog.title,
              path: `/blogs/${blog.id}`,
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
        <BlogsMain />
      </PageWrapper>
    </>
  );
};

export default Blogs;
