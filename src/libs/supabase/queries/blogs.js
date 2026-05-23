import { brandName, stripHtml, truncateText } from "@/libs/seo";
import { supabaseAdmin } from "@/libs/supabase/admin";

const blogSelect = `
  blog_detail_id,
  blog_id,
  blog_read_time,
  blog_description,
  blog_author,
  blog_author_info,
  created_at,
  updated_at,
  blog:blog_id (blog_id, blog_category),
  blog_images:blog_detail_images (image_id, sort_order, created_at)
`;

const getPrimaryBlogImagePath = (blog) => {
  const sortedImages = (blog?.blog_images || [])
    .slice()
    .sort((firstImage, secondImage) => {
      const firstSortOrder = firstImage?.sort_order ?? 0;
      const secondSortOrder = secondImage?.sort_order ?? 0;

      if (firstSortOrder !== secondSortOrder) {
        return firstSortOrder - secondSortOrder;
      }

      return (firstImage?.image_id ?? 0) - (secondImage?.image_id ?? 0);
    });

  if (sortedImages.length > 0) {
    return `/api/blog/image/${sortedImages[0].image_id}`;
  }

  if (blog?.blog_detail_id) {
    return `/api/blog/${blog.blog_detail_id}/image`;
  }

  return null;
};

export const getPublicBlogById = async (id) => {
  const blogId = Number.parseInt(id, 10);

  if (!Number.isFinite(blogId) || blogId <= 0) {
    return { data: null, error: new Error("Blog not found") };
  }

  const { data, error } = await supabaseAdmin
    .from("blog_detail")
    .select(blogSelect)
    .eq("blog_detail_id", blogId)
    .single();

  if (error || !data) {
    return { data: null, error: error || new Error("Blog not found") };
  }

  const description = stripHtml(data.blog_description || "");

  return {
    data: {
      ...data,
      id: data.blog_detail_id,
      title: data.blog_author || "Orbitto Article",
      authorName: brandName,
      category: data.blog?.blog_category || "Insights",
      excerpt: truncateText(description, 190),
      image: getPrimaryBlogImagePath(data),
    },
    error: null,
  };
};

export const getPublicBlogsList = async ({ limit = 12 } = {}) => {
  const safeLimit = Number.isFinite(Number(limit)) ? Math.max(Number(limit), 1) : 12;
  const { data, error } = await supabaseAdmin
    .from("blog_detail")
    .select(blogSelect)
    .order("created_at", { ascending: false })
    .limit(safeLimit);

  if (error) {
    return { data: [], error };
  }

  return {
    data: (data || []).map((entry) => {
      const description = stripHtml(entry.blog_description || "");

      return {
        ...entry,
        id: entry.blog_detail_id,
        title: entry.blog_author || "Orbitto Article",
        authorName: brandName,
        category: entry.blog?.blog_category || "Insights",
        excerpt: truncateText(description, 190),
        image: getPrimaryBlogImagePath(entry),
      };
    }),
    error: null,
  };
};

export const getPublicBlogsForSitemap = async () =>
  supabaseAdmin
    .from("blog_detail")
    .select("blog_detail_id, created_at, updated_at")
    .order("created_at", { ascending: false });
