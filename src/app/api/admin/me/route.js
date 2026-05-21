import { getActiveAdminById, sanitizeAdmin } from "@/libs/adminAuth/service";
import { getAdminSession } from "@/libs/adminAuth/session";

export async function GET() {
  const session = await getAdminSession();

  if (!session?.admin_id) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { data: admin, error } = await getActiveAdminById(session.admin_id);

  if (error || !admin) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  return Response.json({ admin: sanitizeAdmin(admin) });
}

