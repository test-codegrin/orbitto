import { SignJWT, jwtVerify } from "jose";

export const adminSessionCookieName = "orbitto_admin_session";

const getSessionSecret = () => {
  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "orbitto-development-admin-session-secret";

  return new TextEncoder().encode(secret);
};

export const createAdminSessionToken = async (admin) => {
  return new SignJWT({
    admin_id: admin.admin_id,
    username: admin.username,
    email: admin.email,
    full_name: admin.full_name,
    role: admin.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("5h")
    .sign(getSessionSecret());
};

export const verifyAdminSessionToken = async (token) => {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    return {
      admin_id: payload.admin_id,
      username: payload.username,
      email: payload.email,
      full_name: payload.full_name,
      role: payload.role,
    };
  } catch {
    return null;
  }
};

