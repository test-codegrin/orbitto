import { jsonError } from "@/libs/adminAuth/api";
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

const normalizeString = (value) => String(value || "").trim();

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

const buildProductPayload = async (formData, existingProduct) => {
  const categories_id = normalizeString(formData.get("categories_id"));
  const product_name = normalizeString(formData.get("product_name"));

  if (!categories_id || !product_name) {
    return { error: "Product name and category are required." };
  }

  const image = formData.get("image");
  const imagePayload = {};

  if (image && typeof image !== "string" && image.size > 0) {
    const compressed = await compressImagesForDatabase([image]);
    imagePayload.image_blob = compressed[0].imageBlob;
    imagePayload.image_name = compressed[0].sourceName;
    imagePayload.product_image_url = null;
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
      product_image_url: existingProduct?.product_image_url ?? null,
      ...imagePayload,
    },
  };
};

export async function PUT(request, { params }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const formData = await request.formData().catch(() => null);
  if (!formData) return jsonError("Invalid product form data.");

  const { data: existingProduct, error: existingError } = await supabaseAdmin
    .from("products")
    .select("products_id,product_image_url")
    .eq("products_id", params.id)
    .single();

  if (existingError) return jsonError(existingError.message, 404);

  const { payload, error: validationError } = await buildProductPayload(
    formData,
    existingProduct
  );

  if (validationError) return jsonError(validationError);

  const { data, error } = await supabaseAdmin
    .from("products")
    .update(payload)
    .eq("products_id", params.id)
    .select(productSelect)
    .single();

  if (error) return jsonError(error.message, 500);

  return Response.json({ product: data });
}

export async function DELETE(_request, { params }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { error } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("products_id", params.id);

  if (error) return jsonError(error.message, 500);

  return Response.json({ message: "Product deleted." });
}
