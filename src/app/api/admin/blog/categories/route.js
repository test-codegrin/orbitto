import { normalizeString } from "@/libs/adminAuth/api";
import { requireAdmin } from "@/libs/adminAuth/guard";
import {
  buildPagination,
  errorResponse,
  listResponse,
  parsePositiveInt,
  successResponse,
} from "@/libs/adminApi/response";
import { supabaseAdmin } from "@/libs/supabase/admin";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

const getExistingCategoryByName = async (categoryName) => {
  const { data, error } = await supabaseAdmin
    .from("blog")
    .select("blog_id, blog_category")
    .ilike("blog_category", categoryName);

  if (error) throw error;

  const normalized = categoryName.toLowerCase();
  return (data || []).find(
    (item) => normalizeString(item.blog_category).toLowerCase() === normalized
  );
};

const ensureAdmin = async () => {
  const { response } = await requireAdmin();
  if (response) return errorResponse("Unauthorized.", 401);
  return null;
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

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabaseAdmin
    .from("blog")
    .select("blog_id, blog_category, created_at", { count: "exact" });

  if (search) {
    const escapedSearch = search.replace(/[%_]/g, "\\$&");
    query = query.ilike("blog_category", `%${escapedSearch}%`);
  }

  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) return errorResponse(error.message, 500);

  return listResponse(data || [], buildPagination(page, limit, count || 0));
}

export async function POST(request) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const blog_category = normalizeString(
    body?.blog_category ?? body?.category_name
  );

  if (!blog_category) {
    return errorResponse("blog_category is required.", 400);
  }

  try {
    const duplicate = await getExistingCategoryByName(blog_category);
    if (duplicate) {
      return errorResponse("Blog category already exists.", 400);
    }

    const { data, error } = await supabaseAdmin
      .from("blog")
      .insert({ blog_category })
      .select("blog_id, blog_category, created_at")
      .single();

    if (error) return errorResponse(error.message, 500);

    return successResponse("Blog category created successfully", data, 201);
  } catch (error) {
    return errorResponse(error.message || "Failed to create blog category.", 500);
  }
}
