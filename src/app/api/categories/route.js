import { getPublicCategories } from "@/libs/supabase/queries/categories";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const { data, error } = await getPublicCategories();

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while fetching categories",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, categories: data || [] });
}
