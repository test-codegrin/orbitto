import {
  buildProductCategoryPath,
  indexedProductCategorySlugs,
} from "@/libs/catalog";
import { getPublicBlogsForSitemap } from "@/libs/supabase/queries/blogs";
import { getSiteUrl } from "@/libs/seo";
import { slugify } from "@/libs/supabase/queries/products";
import { supabaseAdmin } from "@/libs/supabase/admin";

const staticRoutes = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/about",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/products",
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    path: "/blogs",
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    path: "/application",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.8,
  },
];

export default async function sitemap() {
  const siteUrl = getSiteUrl();

  const [productsResult, blogsResult] = await Promise.all([
    supabaseAdmin
      .from("products")
      .select("products_id, product_name, updated_at, created_at")
      .order("created_at", { ascending: false }),
    getPublicBlogsForSitemap(),
  ]);

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const productEntries = (productsResult.data || []).map((product) => ({
    url: `${siteUrl}/products/${slugify(product.product_name) || product.products_id}`,
    lastModified: product.updated_at || product.created_at || new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryEntries = indexedProductCategorySlugs.map((categorySlug) => ({
    url: `${siteUrl}${buildProductCategoryPath(categorySlug)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const blogEntries = (blogsResult.data || []).map((blog) => ({
    url: `${siteUrl}/blogs/${blog.blog_detail_id}`,
    lastModified: blog.updated_at || blog.created_at || new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries, ...blogEntries];
}
