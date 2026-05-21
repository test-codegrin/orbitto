import { jsonError, normalizeString } from "@/libs/adminAuth/api";
import { hashPassword } from "@/libs/adminAuth/password";
import { createAdmin, getAdminCount, sanitizeAdmin } from "@/libs/adminAuth/service";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const username = normalizeString(body?.username);
  const email = normalizeString(body?.email);
  const password = String(body?.password || "");
  const full_name = normalizeString(body?.full_name);

  if (!username || !password) {
    return jsonError("Username and password are required.");
  }

  if (password.length < 6) {
    return jsonError("Password must be at least 6 characters.");
  }

  const countResult = await getAdminCount();

  if (countResult.error) {
    return jsonError(countResult.error.message, 500);
  }

  if ((countResult.count || 0) > 0) {
    return jsonError("Admin already exists. Registration is disabled.", 403);
  }

  const password_hash = await hashPassword(password);
  const { data, error } = await createAdmin({
    username,
    email,
    password_hash,
    full_name,
  });

  if (error) {
    return jsonError(
      error.code === "23505" ? "Username or email already exists." : error.message,
      500
    );
  }

  return Response.json({ admin: sanitizeAdmin(data), message: "Admin registered." }, { status: 201 });
}

