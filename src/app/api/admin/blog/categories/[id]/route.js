import { normalizeString } from "@/libs/adminAuth/api";
import { requireAdmin } from "@/libs/adminAuth/guard";
import { errorResponse, successResponse } from "@/libs/adminApi/response";
import { supabaseAdmin } from "@/libs/supabase/admin";

const toValidId = (value) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

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

export async function PUT(request, { params }) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;

  const blogId = toValidId(params.id);
  if (!blogId) return errorResponse("Invalid blog category id.", 400);

  const body = await request.json().catch(() => null);
  const blog_category = normalizeString(
    body?.blog_category ?? body?.category_name
  );

  if (!blog_category) {
    return errorResponse("blog_category is required.", 400);
  }

  const { data: existingCategory, error: existingCategoryError } = await supabaseAdmin
    .from("blog")
    .select("blog_id")
    .eq("blog_id", blogId)
    .single();

  if (existingCategoryError || !existingCategory) {
    return errorResponse("Blog category not found.", 404);
  }

  try {
    const duplicate = await getExistingCategoryByName(blog_category);
    if (duplicate && Number(duplicate.blog_id) !== blogId) {
      return errorResponse("Blog category already exists.", 400);
    }

    const { data, error } = await supabaseAdmin
      .from("blog")
      .update({ blog_category })
      .eq("blog_id", blogId)
      .select("blog_id, blog_category, created_at")
      .single();

    if (error) return errorResponse(error.message, 500);

    return successResponse("Blog category updated successfully", data);
  } catch (error) {
    return errorResponse(error.message || "Failed to update blog category.", 500);
  }
}

export async function DELETE(_request, { params }) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;

  const blogId = toValidId(params.id);
  if (!blogId) return errorResponse("Invalid blog category id.", 400);

  const { data: existingCategory, error: existingCategoryError } = await supabaseAdmin
    .from("blog")
    .select("blog_id")
    .eq("blog_id", blogId)
    .single();

  if (existingCategoryError || !existingCategory) {
    return errorResponse("Blog category not found.", 404);
  }

  const { error } = await supabaseAdmin.from("blog").delete().eq("blog_id", blogId);

  if (error) return errorResponse(error.message, 500);

  return successResponse("Blog category deleted successfully", {});
}
