import { getPublicProductBySlug } from "@/libs/supabase/queries/products";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
  const { data, error } = await getPublicProductBySlug(params.id);

  if (error || !data) {
    return NextResponse.json(
      { success: false, message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, product: data });
}
