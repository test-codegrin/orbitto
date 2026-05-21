"use client";

import { supabaseClient } from "@/libs/supabase/client";
import { createContext, useContext } from "react";

const SupabaseContext = createContext(null);

const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={supabaseClient}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const value = useContext(SupabaseContext);

  if (!value) {
    throw new Error("useSupabase must be used inside SupabaseProvider.");
  }

  return value;
};

export default SupabaseProvider;

