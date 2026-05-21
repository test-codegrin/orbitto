import { supabaseAdmin } from "@/libs/supabase/admin";

const slugifyCategory = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getCategories = async () => {
  return supabaseAdmin
    .from("categories")
    .select("categories_id, category_name, created_at, updated_at")
    .order("category_name");
};

export const mapPublicCategory = (category) => ({
  id: category.categories_id,
  name: category.category_name,
  slug: slugifyCategory(category.category_name),
  
});

export const getPublicCategories = async () => {
  const { data, error } = await getCategories();

  return {
    data: (data || []).map(mapPublicCategory),
    error,
  };
};
