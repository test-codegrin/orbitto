import { getActiveAdminById } from "@/libs/adminAuth/service";
import { getAdminSession } from "@/libs/adminAuth/session";
import { NextResponse } from "next/server";

export const requireAdmin = async () => {
  const session = await getAdminSession();

  if (!session?.admin_id) {
    return {
      admin: null,
      response: NextResponse.json({ error: "Unauthorized." }, { status: 401 }),
    };
  }

  const { data: admin, error } = await getActiveAdminById(session.admin_id);

  if (error || !admin) {
    return {
      admin: null,
      response: NextResponse.json({ error: "Unauthorized." }, { status: 401 }),
    };
  }

  return { admin, response: null };
};

