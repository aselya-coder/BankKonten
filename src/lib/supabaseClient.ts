import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type MetaEnv = { env?: Record<string, string | undefined> };
const meta = import.meta as unknown as MetaEnv;
const supabaseUrl = meta.env?.VITE_SUPABASE_URL || "";
const supabaseAnonKey = meta.env?.VITE_SUPABASE_ANON_KEY || "";

const isConfigured = !!supabaseUrl && !!supabaseAnonKey;

declare global {
  var __bk_supabase__: SupabaseClient | undefined;
}

export const supabase: SupabaseClient | null = isConfigured
  ? (globalThis.__bk_supabase__ ??= createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, storageKey: "bk_auth" },
    }))
  : null;

export const isSupabaseConfigured = isConfigured;
