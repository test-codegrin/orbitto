import { jsonError, normalizeString } from "@/libs/adminAuth/api";
import { requireAdmin } from "@/libs/adminAuth/guard";
import { compressImagesForDatabase } from "@/libs/image-compression";
import { textOrNullPreservingLines } from "@/libs/productApplications";
import { supabaseAdmin } from "@/libs/supabase/admin";

export const runtime = "nodejs";

const productSelect = `
  products_id,
  categories_id,
  product_name,
  product_description,
  product_specification,
  product_application,
  product_image_url,
  image_name,
  created_at,
  updated_at,
  categories(category_name)
`;

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;
const SORT_COLUMNS = new Map([
  ["product_name", "product_name"],
  ["created_at", "created_at"],
  ["updated_at", "updated_at"],
]);

const toPositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const normalizeFilterText = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-");

const getCategoryIdsForFilter = async (category) => {
  const normalizedCategory = normalizeFilterText(category);
  if (!normalizedCategory) return null;

  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("categories_id, category_name");

  if (error) throw error;

  return (data || [])
    .filter(
      (item) =>
        item.categories_id === category ||
        normalizeFilterText(item.category_name) === normalizedCategory
    )
    .map((item) => item.categories_id);
};

const getCategoryIdsForSearch = async (search) => {
  const normalizedSearch = normalizeFilterText(search);
  if (!normalizedSearch) return [];

  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("categories_id, category_name");

  if (error) throw error;

  return (data || [])
    .filter((item) =>
      normalizeFilterText(item.category_name).includes(normalizedSearch)
    )
    .map((item) => item.categories_id);
};

const applyProductListFilters = (query, { search, categoryIds, searchCategoryIds }) => {
  let nextQuery = query;

  if (categoryIds?.length) {
    nextQuery = nextQuery.in("categories_id", categoryIds);
  }

  if (search) {
    const escapedSearch = search.replace(/[%_]/g, "\\$&");
    const orFilters = [
      `product_name.ilike.%${escapedSearch}%`,
      `product_description.ilike.%${escapedSearch}%`,
      `product_application.ilike.%${escapedSearch}%`,
    ];

    if (searchCategoryIds.length) {
      orFilters.push(`categories_id.in.(${searchCategoryIds.join(",")})`);
    }

    nextQuery = nextQuery.or(orFilters.join(","));
  }

  return nextQuery;
};

const parseSpecification = (value) => {
  if (!value) return [];
  if (typeof value === "object") return value;

  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : [];
  } catch {
    return [];
  }
};

const buildProductPayload = async (formData, { requireImage = false } = {}) => {
  const categories_id = normalizeString(formData.get("categories_id"));
  const product_name = normalizeString(formData.get("product_name"));

  if (!categories_id || !product_name) {
    return { error: "Product name and category are required." };
  }

  const image = formData.get("image");
  let compressedImage = null;

  if (image && typeof image !== "string" && image.size > 0) {
    const compressed = await compressImagesForDatabase([image]);
    compressedImage = compressed[0];
  } else if (requireImage) {
    return { error: "Product image is required." };
  }

  return {
    payload: {
      categories_id,
      product_name,
      product_description:
        normalizeString(formData.get("product_description")) || null,
      product_specification: parseSpecification(
        formData.get("product_specification")
      ),
      product_application: textOrNullPreservingLines(
        formData.get("product_application")
      ),
      image_blob: compressedImage?.imageBlob ?? null,
      image_name: compressedImage?.sourceName ?? null,
      product_image_url: null,
    },
  };
};

export async function GET(request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const requestUrl = new URL(request.url);
  const page = toPositiveInt(requestUrl.searchParams.get("page"), DEFAULT_PAGE);
  const requestedLimit = toPositiveInt(
    requestUrl.searchParams.get("limit"),
    DEFAULT_LIMIT
  );
  const limit = Math.min(requestedLimit, MAX_LIMIT);
  const search = normalizeString(requestUrl.searchParams.get("search"));
  const category = normalizeString(requestUrl.searchParams.get("category"));
  const sortBy =
    SORT_COLUMNS.get(requestUrl.searchParams.get("sortBy")) || "product_name";
  const sortOrder =
    requestUrl.searchParams.get("sortOrder") === "asc" ? "asc" : "asc";
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let categoryIds = null;
  let searchCategoryIds = [];

  try {
    categoryIds = await getCategoryIdsForFilter(category);
    searchCategoryIds = await getCategoryIdsForSearch(search);
  } catch (error) {
    return jsonError(error.message, 500);
  }

  if (category && !categoryIds?.length) {
    return Response.json({
      products: [],
      pagination: {
        page,
        limit,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: page > 1,
      },
    });
  }

  const { data, error, count } = await applyProductListFilters(
    supabaseAdmin
    .from("products")
      .select(productSelect, { count: "exact" }),
    { search, categoryIds, searchCategoryIds }
  )
    .order(sortBy, { ascending: sortOrder === "asc" })
    .range(from, to);

  if (error) return jsonError(error.message, 500);

  const totalItems = count || 0;
  const totalPages = Math.ceil(totalItems / limit);

  return Response.json({
    products: data || [],
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
}

export async function POST(request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const formData = await request.formData().catch(() => null);
  if (!formData) return jsonError("Invalid product form data.");

  const { payload, error: validationError } = await buildProductPayload(formData);

  if (validationError) return jsonError(validationError);

  const { data, error } = await supabaseAdmin
    .from("products")
    .insert(payload)
    .select(productSelect)
    .single();

  if (error) return jsonError(error.message, 500);

  return Response.json({ product: data }, { status: 201 });
}
