import { jsonError, normalizeString } from "@/libs/adminAuth/api";
import { comparePassword } from "@/libs/adminAuth/password";
import { getAdminByLoginIdentifier, sanitizeAdmin } from "@/libs/adminAuth/service";
import { setAdminSessionCookie } from "@/libs/adminAuth/session";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const username = normalizeString(body?.username || body?.email);
  const password = String(body?.password || "");

  if (!username || !password) {
    return jsonError("Username/email and password are required.");
  }

  const { data: admin, error } = await getAdminByLoginIdentifier(username);

  if (error || !admin) {
    return jsonError("Invalid username or password.", 401);
  }

  if (!admin.is_active) {
    return jsonError("This admin account is disabled.", 403);
  }

  const isValidPassword = await comparePassword(password, admin.password_hash);

  if (!isValidPassword) {
    return jsonError("Invalid username or password.", 401);
  }

  await setAdminSessionCookie(admin);

  return Response.json({ admin: sanitizeAdmin(admin), message: "Logged in." });
}
