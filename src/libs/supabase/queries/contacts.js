import { supabaseAdmin } from "@/libs/supabase/admin";

export const createContactRequest = async (payload) => {
  return supabaseAdmin.from("contacts").insert(payload).select().single();
};

