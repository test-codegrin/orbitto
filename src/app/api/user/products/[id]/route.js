import { getPublicProductBySlug } from "@/libs/supabase/queries/products";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
  try {
    const productIdOrSlug = params?.id;
    const { data, error } = await getPublicProductBySlug(productIdOrSlug);

    if (error || !data) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product: data });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to load product details" },
      { status: 500 }
    );
  }
}
