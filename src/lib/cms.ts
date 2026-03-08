import { supabase, isSupabaseConfigured } from "./supabaseClient";

export async function fetchContent<T>(table: string, defaultData: T): Promise<T> {
  if (!isSupabaseConfigured || !supabase) return defaultData;
  const { data, error } = await supabase.from(table).select("*").limit(1).maybeSingle();
  if (error || !data) return defaultData;
  const row = data as Record<string, unknown>;
  const content = (row as { content?: unknown })?.content ?? row;
  return content as T;
}

export async function saveContent<T>(table: string, content: T): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) return { ok: false, error: "Supabase tidak dikonfigurasi" };
  const payload: { id: number; content: T } = { id: 1, content };
  const { error } = await supabase.from(table).upsert(payload, { onConflict: "id" });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function countRows(table: string): Promise<number> {
  if (!isSupabaseConfigured || !supabase) return 0;
  const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
  return count ?? 0;
}
