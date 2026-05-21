import { byteaToBuffer } from "@/libs/image-compression";
import { supabaseAdmin } from "@/libs/supabase/admin";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(_request, { params }) {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("image_blob")
    .eq("products_id", params.id)
    .single();

  if (error || !data?.image_blob) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }

  try {
    const buffer = byteaToBuffer(data.image_blob);

    return new Response(buffer, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (imageError) {
    return NextResponse.json(
      { error: imageError.message || "Unsupported image blob format." },
      { status: 500 }
    );
  }
}
