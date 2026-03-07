import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? "").trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? "").trim();

const isConfigured = !!supabaseUrl && /^https?:\/\//i.test(supabaseUrl) && !!supabaseAnonKey;

if (!isConfigured) {
  console.warn("Supabase is not configured. Falling back to mock data. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env");
}

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : (null as any);

export const isSupabaseConfigured = isConfigured;