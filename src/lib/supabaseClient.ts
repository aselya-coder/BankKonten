import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? "").trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? "").trim();

if (!supabaseUrl || !/^https?:\/\//i.test(supabaseUrl)) {
  console.error("Supabase URL is missing or invalid. Set VITE_SUPABASE_URL (e.g., https://xxx.supabase.co).");
  throw new Error("Invalid Supabase URL");
}
if (!supabaseAnonKey) {
  console.error("Supabase anon key is missing. Set VITE_SUPABASE_ANON_KEY.");
  throw new Error("Missing Supabase anon key");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);