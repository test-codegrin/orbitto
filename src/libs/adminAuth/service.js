import { supabaseAdmin } from "@/libs/supabase/admin";

export const sanitizeAdmin = (admin) => {
  if (!admin) return null;

  return {
    admin_id: admin.admin_id,
    username: admin.username,
    email: admin.email,
    full_name: admin.full_name,
    role: admin.role,
    is_active: admin.is_active,
    created_at: admin.created_at,
    updated_at: admin.updated_at,
  };
};

export const getAdminCount = async () => {
  return supabaseAdmin
    .from("admins")
    .select("admin_id", { count: "exact", head: true });
};

export const getAdminByLoginIdentifier = async (identifier) => {
  const normalizedIdentifier = String(identifier || "").trim();
  const adminSelect =
    "admin_id, username, email, password_hash, full_name, role, is_active, created_at, updated_at";

  if (normalizedIdentifier.includes("@")) {
    return supabaseAdmin
      .from("admins")
      .select(adminSelect)
      .ilike("email", normalizedIdentifier)
      .maybeSingle();
  }

  return supabaseAdmin
    .from("admins")
    .select(adminSelect)
    .eq("username", normalizedIdentifier)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
};

export const getActiveAdminById = async (adminId) => {
  return supabaseAdmin
    .from("admins")
    .select("admin_id, username, email, full_name, role, is_active, created_at, updated_at")
    .eq("admin_id", adminId)
    .eq("is_active", true)
    .maybeSingle();
};

export const getActiveAdminByEmail = async (email) => {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  if (!normalizedEmail) {
    return { data: null, error: null };
  }

  return supabaseAdmin
    .from("admins")
    .select("admin_id, username, email, full_name, role, is_active, created_at, updated_at")
    .ilike("email", normalizedEmail)
    .eq("is_active", true)
    .maybeSingle();
};

export const createAdmin = async ({ username, email, password_hash, full_name }) => {
  return supabaseAdmin
    .from("admins")
    .insert({
      username,
      email: email || null,
      password_hash,
      full_name: full_name || null,
    })
    .select("admin_id, username, email, full_name, role, is_active, created_at, updated_at")
    .single();
};
