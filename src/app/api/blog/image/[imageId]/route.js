import { byteaToBuffer } from "@/libs/image-compression";
import { supabaseAdmin } from "@/libs/supabase/admin";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(_request, { params }) {
  const imageId = Number.parseInt(params.imageId, 10);
  if (!Number.isFinite(imageId) || imageId <= 0) {
    return NextResponse.json({ error: "Invalid image id." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("blog_detail_images")
    .select("image_blob")
    .eq("image_id", imageId)
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
