import { jsonError, normalizeString } from "@/libs/adminAuth/api";
import { hashPassword } from "@/libs/adminAuth/password";
import { createAdmin, sanitizeAdmin } from "@/libs/adminAuth/service";

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

  const password_hash = await hashPassword(password);
  const { data, error } = await createAdmin({
    username,
    email,
    password_hash,
    full_name,
  });

  if (error) {
    if (error.code === "23505") {
      const duplicateHint = String(error.message || "").toLowerCase();
      if (duplicateHint.includes("email")) {
        return jsonError("Email already exists.", 409);
      }
      return jsonError("Duplicate value already exists.", 409);
    }

    return jsonError(error.message || "Registration failed.", 500);
  }

  return Response.json({ admin: sanitizeAdmin(data), message: "Admin registered." }, { status: 201 });
}

