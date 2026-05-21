import { supabaseAdmin } from "@/libs/supabase/admin";
import { splitProductApplicationText } from "@/libs/productApplications";
import { normalizeSpecificationEntries } from "@/libs/productSpecifications";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 200;
const SORT_COLUMNS = new Map([
  ["createdAt", "created_at"],
  ["updatedAt", "updated_at"],
  ["name", "product_name"],
  ["productName", "product_name"],
]);

export const slugify = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const toPositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const getPublicProductImageSrc = (product) =>
  product?.image_name ? `/api/products/${product.products_id}/image` : null;

const mapCategory = (category) =>
  category
    ? {
        id: category.categories_id,
        name: category.category_name,
        slug: slugify(category.category_name),
      }
    : null;

export const getProductImageSrc = (product) => {
  if (product?.image_name) {
    return `/api/products/${product.products_id}/image`;
  }

  return product?.product_image_url || null;
};

export const mapProductRecord = (product) => {
  if (!product) return product;

  const categoryName = product.categories?.category_name || "";
  const image = getProductImageSrc(product);

  return {
    ...product,
    id: product.products_id,
    slug: product.products_id,
    title: product.product_name,
    desc: product.product_description,
    description: product.product_description,
    image,
    type: categoryName,
    category: categoryName,
    specifications: product.product_specification || {},
    applications_and_uses: splitProductApplicationText(product.product_application),
  };
};

export const mapPublicProductCard = (product) => {
  const category = Array.isArray(product.categories)
    ? product.categories[0]
    : product.categories;
  const publicCategory = mapCategory(category);

  return {
    id: product.products_id,
    name: product.product_name,
    title: product.product_name,
    slug: slugify(product.product_name),
    path: `/products/${slugify(product.product_name)}`,
    image: getPublicProductImageSrc(product),
    category: publicCategory,
    type: publicCategory?.name || "",
  };
};

export const mapPublicProductDetail = (product) => {
  const card = mapPublicProductCard(product);
  const description = product.product_description || "";
  const applications = splitProductApplicationText(product.product_application);

  return {
    ...card,
    product_name: product.product_name,
    description,
    desc: description,
    shortDescription: description.split(/\r?\n/)[0] || "",
    images: card.image ? [card.image] : [],
    highlights: [],
    features: [],
    specifications: normalizeSpecificationEntries(product.product_specification)
      .map(({ key, value, order }) => ({ key, value, order })),
    applications_and_uses: applications,
    product_application: product.product_application || "",
    packaging: [],
    shipping: [],
    nutritionalInfo: [],
  };
};

const getCategoryIdsBySlugOrSearch = async (value, { exact = false } = {}) => {
  const normalizedValue = slugify(value);
  if (!normalizedValue) return [];

  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("categories_id, category_name");

  if (error) throw error;

  return (data || [])
    .filter((category) => {
      const categorySlug = slugify(category.category_name);
      return exact
        ? categorySlug === normalizedValue
        : categorySlug.includes(normalizedValue);
    })
    .map((category) => category.categories_id);
};

const applyPublicProductFilters = (query, { search, categoryIds, searchCategoryIds }) => {
  let nextQuery = query;

  if (categoryIds?.length) {
    nextQuery = nextQuery.in("categories_id", categoryIds);
  }

  if (search) {
    const escapedSearch = search.replace(/[%_]/g, "\\$&");
    const filters = [
      `product_name.ilike.%${escapedSearch}%`,
      `product_description.ilike.%${escapedSearch}%`,
    ];

    if (searchCategoryIds.length) {
      filters.push(`categories_id.in.(${searchCategoryIds.join(",")})`);
    }

    nextQuery = nextQuery.or(filters.join(","));
  }

  return nextQuery;
};

export const getPublicProducts = async ({
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
  category,
  search,
  sortBy = "createdAt",
  sortOrder = "desc",
} = {}) => {
  const safePage = toPositiveInt(page, DEFAULT_PAGE);
  const safeLimit = Math.min(toPositiveInt(limit, DEFAULT_LIMIT), MAX_LIMIT);
  const from = (safePage - 1) * safeLimit;
  const to = from + safeLimit - 1;
  const normalizedSearch = String(search || "").trim();
  const sortColumn = SORT_COLUMNS.get(sortBy) || "created_at";
  const ascending = sortOrder === "asc";

  const categoryIds = category
    ? await getCategoryIdsBySlugOrSearch(category, { exact: true })
    : null;
  const searchCategoryIds = normalizedSearch
    ? await getCategoryIdsBySlugOrSearch(normalizedSearch)
    : [];

  if (category && !categoryIds.length) {
    return {
      data: [],
      error: null,
      pagination: {
        page: safePage,
        limit: safeLimit,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: safePage > 1,
      },
      filters: {
        category: category || "",
        search: normalizedSearch,
      },
    };
  }

  const { data, error, count } = await applyPublicProductFilters(
    supabaseAdmin
      .from("products")
      .select(
        `
          products_id,
          categories_id,
          product_name,
          product_description,
          image_name,
          created_at,
          updated_at,
          categories(categories_id, category_name)
        `,
        { count: "exact" }
      ),
    { search: normalizedSearch, categoryIds, searchCategoryIds }
  )
    .order(sortColumn, { ascending })
    .range(from, to);

  const totalItems = count || 0;
  const totalPages = Math.ceil(totalItems / safeLimit);

  return {
    data: (data || []).map(mapPublicProductCard),
    error,
    pagination: {
      page: safePage,
      limit: safeLimit,
      totalItems,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    },
    filters: {
      category: category || "",
      search: normalizedSearch,
    },
  };
};

export const getPublicProductBySlug = async (slug) => {
  const resolveResult = await resolvePublicProductByIdOrSlug(slug);
  if (resolveResult.error || !resolveResult.productId) {
    return { data: null, error: resolveResult.error || new Error("Product not found") };
  }

  const { data, error } = await supabaseAdmin
    .from("products")
    .select(
      `
        products_id,
        categories_id,
        product_name,
        product_description,
        product_specification,
        product_application,
        image_name,
        created_at,
        updated_at,
        categories(categories_id, category_name)
      `
    )
    .eq("products_id", resolveResult.productId)
    .single();

  return {
    data: data ? mapPublicProductDetail(data) : null,
    error,
  };
};

const resolvePublicProductByIdOrSlug = async (idOrSlug) => {
  const requestedSlug = slugify(idOrSlug);
  if (!requestedSlug) {
    return { productId: null, error: new Error("Product not found") };
  }

  const { data: candidates, error } = await supabaseAdmin
    .from("products")
    .select("products_id, product_name");

  if (error) return { productId: null, error };

  const normalizedInput = String(idOrSlug);
  const match = (candidates || []).find(
    (product) =>
      String(product.products_id) === normalizedInput ||
      slugify(product.product_name) === requestedSlug
  );

  if (!match) {
    return { productId: null, error: new Error("Product not found") };
  }

  return { productId: match.products_id, error: null };
};

export const getPublicRelatedProductsBySlug = async (idOrSlug, { limit = 6 } = {}) => {
  const resolveResult = await resolvePublicProductByIdOrSlug(idOrSlug);
  if (resolveResult.error || !resolveResult.productId) {
    return { data: [], error: resolveResult.error || new Error("Product not found") };
  }

  const { data: currentProduct, error: currentProductError } = await supabaseAdmin
    .from("products")
    .select("products_id, categories_id")
    .eq("products_id", resolveResult.productId)
    .single();

  if (currentProductError || !currentProduct) {
    return {
      data: [],
      error: currentProductError || new Error("Product not found"),
    };
  }

  let query = supabaseAdmin
    .from("products")
    .select(
      `
        products_id,
        categories_id,
        product_name,
        product_description,
        product_specification,
        product_application,
        image_name,
        created_at,
        updated_at,
        categories(categories_id, category_name)
      `
    )
    .neq("products_id", currentProduct.products_id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (currentProduct.categories_id) {
    query = query.eq("categories_id", currentProduct.categories_id);
  }

  const { data, error } = await query;

  return {
    data: (data || []).map(mapPublicProductDetail),
    error,
  };
};

export const getProducts = async ({ category, search } = {}) => {
  let query = supabaseAdmin
    .from("products")
    .select(
      `
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
        categories!inner(category_name)
      `
    )
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("categories.category_name", category);
  }

  if (search) {
    query = query.ilike("product_name", `%${search}%`);
  }

  return query;
};

export const getProductById = async (id) => {
  return supabaseAdmin
    .from("products")
    .select(
      `
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
      `
    )
    .eq("products_id", id)
    .single();
};
