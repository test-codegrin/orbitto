import { createContactRequest } from "@/libs/supabase/queries/contacts";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  const { data, error } = await createContactRequest(payload);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ contact: data }, { status: 201 });
}

