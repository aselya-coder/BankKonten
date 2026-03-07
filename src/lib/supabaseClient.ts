import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? "").trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? "").trim();

const isConfigured = !!supabaseUrl && /^https?:\/\//i.test(supabaseUrl) && !!supabaseAnonKey;

if (!isConfigured) {
  console.warn("Supabase is not configured. Falling back to mock data. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env");
}

declare global {
  var __bk_supabase__: SupabaseClient | undefined;
}

export const supabase: SupabaseClient | null = isConfigured
  ? (globalThis.__bk_supabase__ ??= createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: "bk_auth",
      },
    }))
  : null;

export const isSupabaseConfigured = isConfigured;
