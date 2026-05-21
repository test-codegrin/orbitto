import { getPublicProducts } from "@/libs/supabase/queries/products";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 12;
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  if (Number(page) < 1 || Number(limit) < 1) {
    return NextResponse.json(
      { success: false, message: "Invalid pagination parameters" },
      { status: 400 }
    );
  }

  try {
    const { data, error, pagination, filters } = await getPublicProducts({
      page,
      limit,
      category,
      search,
      sortBy,
      sortOrder,
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong while fetching products",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      products: data || [],
      pagination,
      filters,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while fetching products",
      },
      { status: 500 }
    );
  }
}
