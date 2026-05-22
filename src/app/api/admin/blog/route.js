import { normalizeString } from "@/libs/adminAuth/api";
import { requireAdmin } from "@/libs/adminAuth/guard";
import {
  buildPagination,
  errorResponse,
  listResponse,
  parsePositiveInt,
  successResponse,
} from "@/libs/adminApi/response";
import { compressImagesForDatabase } from "@/libs/image-compression";
import { supabaseAdmin } from "@/libs/supabase/admin";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;
const SORT_COLUMNS = new Set(["created_at", "updated_at"]);

const toValidId = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const ensureAdmin = async () => {
  const { response } = await requireAdmin();
  if (response) return errorResponse("Unauthorized.", 401);
  return null;
};

const getCategoryIdsByNameSearch = async (value) => {
  const normalized = normalizeString(value);
  if (!normalized) return [];

  const escaped = normalized.replace(/[%_]/g, "\\$&");

  const { data, error } = await supabaseAdmin
    .from("blog")
    .select("blog_id")
    .ilike("blog_category", `%${escaped}%`);

  if (error) throw error;

  return (data || []).map((item) => item.blog_id);
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

const validateMetrics = (metrics) => {
  if (metrics === undefined || metrics === null) return { valid: true, value: null };

  if (typeof metrics === "object" && !Array.isArray(metrics)) {
    return { valid: true, value: metrics };
  }

  if (typeof metrics === "string") {
    const trimmed = metrics.trim();
    if (!trimmed) return { valid: true, value: null };

    try {
      const parsed = JSON.parse(trimmed);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return { valid: true, value: parsed };
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
    .select("blog_id, blog_category")
    .eq("blog_id", blogId)
    .single();

  if (error || !data) return null;
  return data;
};

export async function GET(request) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;

  const requestUrl = new URL(request.url);
  const page = parsePositiveInt(requestUrl.searchParams.get("page"), DEFAULT_PAGE);
  const requestedLimit = parsePositiveInt(
    requestUrl.searchParams.get("limit"),
    DEFAULT_LIMIT
  );
  const limit = Math.min(requestedLimit, MAX_LIMIT);
  const search = normalizeString(requestUrl.searchParams.get("search"));
  const filterBlogId = toValidId(requestUrl.searchParams.get("blog_id"));
  const categoryFilter = normalizeString(requestUrl.searchParams.get("category"));
  const sortByParam = normalizeString(requestUrl.searchParams.get("sortBy"));
  const sortBy = SORT_COLUMNS.has(sortByParam) ? sortByParam : "created_at";
  const sortOrder = requestUrl.searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    let allowedCategoryIds = null;

    if (categoryFilter) {
      const directId = toValidId(categoryFilter);
      if (directId) {
        allowedCategoryIds = [directId];
      } else {
        allowedCategoryIds = await getCategoryIdsByNameSearch(categoryFilter);
      }

      if (!allowedCategoryIds.length) {
        return listResponse([], buildPagination(page, limit, 0));
      }
    }

    let searchCategoryIds = [];
    if (search) {
      searchCategoryIds = await getCategoryIdsByNameSearch(search);
    }

    let query = supabaseAdmin
      .from("blog_detail")
      .select(blogDetailSelect, { count: "exact" });

    if (filterBlogId) {
      query = query.eq("blog_id", filterBlogId);
    }

    if (allowedCategoryIds?.length) {
      query = query.in("blog_id", allowedCategoryIds);
    }

    if (search) {
      const escapedSearch = search.replace(/[%_]/g, "\\$&");
      const orFilters = [
        `blog_description.ilike.%${escapedSearch}%`,
        `blog_author.ilike.%${escapedSearch}%`,
      ];

      if (searchCategoryIds.length) {
        orFilters.push(`blog_id.in.(${searchCategoryIds.join(",")})`);
      }

      query = query.or(orFilters.join(","));
    }

    const { data, error, count } = await query
      .order(sortBy, { ascending: sortOrder === "asc" })
      .range(from, to);

    if (error) return errorResponse(error.message, 500);

    return listResponse(data || [], buildPagination(page, limit, count || 0));
  } catch (error) {
    return errorResponse(error.message || "Failed to fetch blog details.", 500);
  }
}

export async function POST(request) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;

  const contentType = request.headers.get("content-type") || "";
  const isMultipart = contentType.includes("multipart/form-data");
  const body = isMultipart
    ? await request.formData().catch(() => null)
    : await request.json().catch(() => null);

  const getValue = (key) =>
    isMultipart ? body?.get?.(key) : body?.[key];

  const blogId = toValidId(getValue("blog_id"));
  const blog_description = normalizeString(getValue("blog_description"));
  const blog_author = normalizeString(getValue("blog_author"));

  if (!blogId) return errorResponse("blog_id is required and must be a valid number.", 400);
  if (!blog_description) return errorResponse("blog_description is required.", 400);
  if (!blog_author) return errorResponse("blog_author is required.", 400);

  const metricsValidation = validateMetrics(getValue("blog_metrics"));
  if (!metricsValidation.valid) {
    return errorResponse("blog_metrics must be a valid JSON object.", 400);
  }

  const category = await validateBlogCategoryExists(blogId);
  if (!category) return errorResponse("Invalid blog_id. Blog category does not exist.", 400);

  let imageBlob = null;
  if (isMultipart) {
    const image = body?.get?.("image");
    if (image && typeof image !== "string" && image.size > 0) {
      const compressed = await compressImagesForDatabase([image]);
      imageBlob = compressed[0]?.imageBlob ?? null;
    }
  } else {
    const rawImage = getValue("blog_image");
    imageBlob = rawImage ?? null;
  }

  const payload = {
    blog_id: blogId,
    blog_read_time: normalizeString(getValue("blog_read_time")) || null,
    blog_description,
    blog_image: imageBlob,
    blog_video_url: normalizeString(getValue("blog_video_url")) || null,
    blog_author,
    blog_quote: normalizeString(getValue("blog_quote")) || null,
    blog_metrics: metricsValidation.value,
    blog_author_info: normalizeString(getValue("blog_author_info")) || null,
  };

  const { data, error } = await supabaseAdmin
    .from("blog_detail")
    .insert(payload)
    .select(blogDetailSelect)
    .single();

  if (error) return errorResponse(error.message, 500);

  return successResponse("Blog created successfully", data, 201);
}
