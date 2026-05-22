import { normalizeString } from "@/libs/adminAuth/api";
import { requireAdmin } from "@/libs/adminAuth/guard";
import { errorResponse, successResponse } from "@/libs/adminApi/response";
import { compressImagesForDatabase } from "@/libs/image-compression";
import { supabaseAdmin } from "@/libs/supabase/admin";

const toValidId = (value) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const blogDetailSelect = `
  blog_detail_id,
  blog_id,
  blog_read_time,
  blog_description,
  blog_image,
  blog_video_url,
  blog_author,
  blog_quote,
  blog_metrics,
  blog_author_info,
  created_at,
  updated_at,
  blog:blog_id (blog_id, blog_category, created_at)
`;

const ensureAdmin = async () => {
  const { response } = await requireAdmin();
  if (response) return errorResponse("Unauthorized.", 401);
  return null;
};

const validateMetrics = (metrics) => {
  if (metrics === undefined) return { valid: true, provided: false, value: undefined };
  if (metrics === null) return { valid: true, provided: true, value: null };

  if (typeof metrics === "object" && !Array.isArray(metrics)) {
    return { valid: true, provided: true, value: metrics };
  }

  if (typeof metrics === "string") {
    const trimmed = metrics.trim();
    if (!trimmed) return { valid: true, provided: true, value: null };

    try {
      const parsed = JSON.parse(trimmed);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return { valid: true, provided: true, value: parsed };
      }
      return { valid: false };
    } catch {
      return { valid: false };
    }
  }

  return { valid: false };
};

const validateBlogCategoryExists = async (blogId) => {
  const { data, error } = await supabaseAdmin
    .from("blog")
    .select("blog_id")
    .eq("blog_id", blogId)
    .single();

  if (error || !data) return false;
  return true;
};

export async function GET(_request, { params }) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;

  const blogDetailId = toValidId(params.id);
  if (!blogDetailId) return errorResponse("Invalid blog detail id.", 400);

  const { data, error } = await supabaseAdmin
    .from("blog_detail")
    .select(blogDetailSelect)
    .eq("blog_detail_id", blogDetailId)
    .single();

  if (error || !data) return errorResponse("Blog not found.", 404);

  return successResponse("Blog fetched successfully", data);
}

export async function PUT(request, { params }) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;

  const blogDetailId = toValidId(params.id);
  if (!blogDetailId) return errorResponse("Invalid blog detail id.", 400);

  const { data: existingBlog, error: existingError } = await supabaseAdmin
    .from("blog_detail")
    .select("blog_detail_id")
    .eq("blog_detail_id", blogDetailId)
    .single();

  if (existingError || !existingBlog) return errorResponse("Blog not found.", 404);

  const contentType = request.headers.get("content-type") || "";
  const isMultipart = contentType.includes("multipart/form-data");
  const body = isMultipart
    ? await request.formData().catch(() => null)
    : await request.json().catch(() => null);
  if (!body) {
    return errorResponse("Invalid request body.", 400);
  }

  const hasValue = (key) =>
    isMultipart
      ? body.has(key)
      : Object.prototype.hasOwnProperty.call(body, key);

  const getValue = (key) =>
    isMultipart ? body.get(key) : body[key];

  const payload = {};

  if (hasValue("blog_id")) {
    const blogId = toValidId(getValue("blog_id"));
    if (!blogId) return errorResponse("blog_id must be a valid number.", 400);

    const exists = await validateBlogCategoryExists(blogId);
    if (!exists) return errorResponse("Invalid blog_id. Blog category does not exist.", 400);

    payload.blog_id = blogId;
  }

  if (hasValue("blog_read_time")) {
    payload.blog_read_time = normalizeString(getValue("blog_read_time")) || null;
  }

  if (hasValue("blog_description")) {
    const blogDescription = normalizeString(getValue("blog_description"));
    if (!blogDescription) return errorResponse("blog_description is required.", 400);
    payload.blog_description = blogDescription;
  }

  if (isMultipart) {
    const image = getValue("image");
    if (image && typeof image !== "string" && image.size > 0) {
      const compressed = await compressImagesForDatabase([image]);
      payload.blog_image = compressed[0]?.imageBlob ?? null;
    }
  } else if (hasValue("blog_image")) {
    payload.blog_image = getValue("blog_image") || null;
  }

  if (hasValue("blog_video_url")) {
    payload.blog_video_url = normalizeString(getValue("blog_video_url")) || null;
  }

  if (hasValue("blog_author")) {
    const blogAuthor = normalizeString(getValue("blog_author"));
    if (!blogAuthor) return errorResponse("blog_author is required.", 400);
    payload.blog_author = blogAuthor;
  }

  if (hasValue("blog_quote")) {
    payload.blog_quote = normalizeString(getValue("blog_quote")) || null;
  }

  if (hasValue("blog_author_info")) {
    payload.blog_author_info = normalizeString(getValue("blog_author_info")) || null;
  }

  if (hasValue("blog_metrics")) {
    const metricsValidation = validateMetrics(getValue("blog_metrics"));
    if (!metricsValidation.valid) {
      return errorResponse("blog_metrics must be a valid JSON object.", 400);
    }
    payload.blog_metrics = metricsValidation.value;
  }

  payload.updated_at = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("blog_detail")
    .update(payload)
    .eq("blog_detail_id", blogDetailId)
    .select(blogDetailSelect)
    .single();

  if (error) return errorResponse(error.message, 500);

  return successResponse("Blog updated successfully", data);
}

export async function DELETE(_request, { params }) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;

  const blogDetailId = toValidId(params.id);
  if (!blogDetailId) return errorResponse("Invalid blog detail id.", 400);

  const { data: existingBlog, error: existingError } = await supabaseAdmin
    .from("blog_detail")
    .select("blog_detail_id")
    .eq("blog_detail_id", blogDetailId)
    .single();

  if (existingError || !existingBlog) return errorResponse("Blog not found.", 404);

  const { error } = await supabaseAdmin
    .from("blog_detail")
    .delete()
    .eq("blog_detail_id", blogDetailId);

  if (error) return errorResponse(error.message, 500);

  return successResponse("Blog deleted successfully", {});
}
