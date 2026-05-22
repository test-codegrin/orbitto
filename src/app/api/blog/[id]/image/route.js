import { byteaToBuffer } from "@/libs/image-compression";
import { supabaseAdmin } from "@/libs/supabase/admin";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(_request, { params }) {
  const { data: galleryImage, error: galleryError } = await supabaseAdmin
    .from("blog_detail_images")
    .select("image_blob")
    .eq("blog_detail_id", params.id)
    .order("sort_order", { ascending: true })
    .order("image_id", { ascending: true })
    .limit(1)
    .maybeSingle();

  const { data, error } = await supabaseAdmin
    .from("blog_detail")
    .select("blog_image")
    .eq("blog_detail_id", params.id)
    .single();

  const blob = galleryImage?.image_blob || data?.blog_image;
  const missingImage = (galleryError && galleryError.code !== "PGRST116") || !blob;

  if (error || missingImage) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }

  try {
    const buffer = byteaToBuffer(blob);

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
