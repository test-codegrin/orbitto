import { jsonError, normalizeString } from "@/libs/adminAuth/api";
import { requireAdmin } from "@/libs/adminAuth/guard";
import { supabaseAdmin } from "@/libs/supabase/admin";

export async function PUT(request, { params }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await request.json().catch(() => null);
  const category_name = normalizeString(body?.category_name);

  if (!category_name) return jsonError("Category name is required.");

  const { data, error } = await supabaseAdmin
    .from("categories")
    .update({ category_name })
    .eq("categories_id", params.id)
    .select("categories_id, category_name, created_at, updated_at")
    .single();

  if (error) {
    return jsonError(
      error.code === "23505"
        ? "This category already exists. Please use a different category name."
        : error.message,
      500
    );
  }

  return Response.json({ category: data });
}

export async function DELETE(_request, { params }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { error } = await supabaseAdmin
    .from("categories")
    .delete()
    .eq("categories_id", params.id);

  if (error) return jsonError(error.message, 500);

  return Response.json({ message: "Category deleted." });
}

