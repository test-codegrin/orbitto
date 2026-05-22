import { supabaseAdmin } from "@/libs/supabase/admin";
import { NextResponse } from "next/server";

const stripHtml = (value = "") =>
  value
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const toVideoList = (videoValue) =>
  String(videoValue || "")
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);

const buildContentSequence = (blog) => {
  const imageBlocks = (blog.blog_images || [])
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((item) => ({
      type: "image",
      image_id: item.image_id,
      sort_order: item.sort_order ?? 0,
    }));

  const videoBlocks = toVideoList(blog.blog_video_url).map((url, index) => ({
    type: "video",
    url,
    sort_order: index,
  }));

  const metricBlocks = Object.entries(blog.blog_metrics || {}).map(([key, value], index) => ({
    type: "metric",
    key,
    value,
    sort_order: index,
  }));

  const blocks = [
    { type: "description", html: blog.blog_description || "", sort_order: 0 },
    ...(blog.blog_quote ? [{ type: "quote", text: blog.blog_quote, sort_order: 1 }] : []),
    ...metricBlocks,
    ...imageBlocks,
    ...videoBlocks,
  ];

  return blocks;
};


export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("blog_detail")
    .select(
      `
      blog_detail_id,
      blog_id,
      blog_read_time,
      blog_description,
      blog_video_url,
      blog_author,
      blog_quote,
      blog_metrics,
      blog_author_info,
      created_at,
      updated_at,
      blog:blog_id (blog_id, blog_category),
      blog_images:blog_detail_images (image_id, sort_order, created_at)
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const blogs = (data || []).map((blog) => ({
    ...blog,
    excerpt: stripHtml(blog.blog_description || "").slice(0, 190),
    content_sequence: buildContentSequence(blog),
  }));

  return NextResponse.json({ data: blogs });
}
