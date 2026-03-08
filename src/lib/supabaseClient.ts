import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const isConfigured = !!supabaseUrl && !!supabaseAnonKey && 
                     supabaseUrl !== "MASUKKAN_URL_SUPABASE_ANDA" && 
                     supabaseAnonKey !== "MASUKKAN_ANON_KEY_SUPABASE_ANDA";

declare global {
  var __bk_supabase__: SupabaseClient | undefined;
}

export const supabase: SupabaseClient | null = isConfigured
  ? (globalThis.__bk_supabase__ ??= createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, storageKey: "bk_auth" },
    }))
  : null;

export const isSupabaseConfigured = isConfigured;
