import { jsonError, normalizeString } from "@/libs/adminAuth/api";
import { requireAdmin } from "@/libs/adminAuth/guard";
import { supabaseAdmin } from "@/libs/supabase/admin";

export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;

  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("categories_id, category_name, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) return jsonError(error.message, 500);

  return Response.json({ categories: data || [] });
}

export async function POST(request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await request.json().catch(() => null);
  const category_name = normalizeString(body?.category_name);

  if (!category_name) return jsonError("Category name is required.");

  const { data, error } = await supabaseAdmin
    .from("categories")
    .insert({ category_name })
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

  return Response.json({ category: data }, { status: 201 });
}

