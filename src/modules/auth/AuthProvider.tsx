import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

type AdminRole = "admin" | "super_admin";

export type AdminProfile = {
  id: string;
  user_id: string;
  name: string | null;
  email: string;
  role: AdminRole;
  created_at: string;
  updated_at: string;
};

type AuthContextValue = {
  loading: boolean;
  session: Session | null;
  user: User | null;
  adminProfile: AdminProfile | null;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const envMeta = import.meta as unknown as { env?: { VITE_ADMIN_EMAIL?: string } };
  const allowedEmail = envMeta?.env?.VITE_ADMIN_EMAIL?.toLowerCase?.();

  const PROFILE_CACHE_KEY = "admin_profile_v1";
  const readCachedProfile = (): AdminProfile | null => {
    try {
      const raw = localStorage.getItem(PROFILE_CACHE_KEY);
      return raw ? (JSON.parse(raw) as AdminProfile) : null;
    } catch {
      return null;
    }
  };
  const writeCachedProfile = (profile: AdminProfile | null) => {
    try {
      if (!profile) {
        localStorage.removeItem(PROFILE_CACHE_KEY);
      } else {
        localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profile));
      }
    } catch {
      /* ignore */
    }
  };

  const loadSession = async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
    } catch (e) {
      console.error("Session load error:", e);
    }
  };

  const loadProfile = async (uid?: string) => {
    if (!isSupabaseConfigured) {
      setAdminProfile(null);
      setProfileLoaded(true);
      setLoading(false);
      return;
    }
    const userId = uid || user?.id;
    if (!userId) {
      setAdminProfile(null);
      setProfileLoaded(true);
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("id,user_id,name,email,role,created_at,updated_at")
        .eq("user_id", userId)
        .single();
      if (error) {
        setAdminProfile(null);
        writeCachedProfile(null);
        setProfileLoaded(true);
        setLoading(false);
        return;
      }
      const profile = data as AdminProfile;
      setAdminProfile(profile);
      writeCachedProfile(profile);
      setProfileLoaded(true);
      setLoading(false);
    } catch (e) {
      console.error("Profile load error:", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
        const cached = readCachedProfile();
        if (data.session?.user?.id && cached?.user_id === data.session.user.id) {
          setAdminProfile(cached);
          setLoading(false);
          setProfileLoaded(true);
          // refresh in background
          loadProfile(data.session.user.id);
        } else {
          await loadProfile(data.session?.user?.id);
        }
      } catch (e) {
        console.error("Auth init error:", e);
        setLoading(false);
      }
    })();
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession ?? null);
      setUser(newSession?.user ?? null);
      setLoading(true);
      if (newSession?.user?.id) {
        const cached = readCachedProfile();
        if (cached?.user_id === newSession.user.id) {
          setAdminProfile(cached);
          setLoading(false);
          setProfileLoaded(true);
          loadProfile(newSession.user.id);
        } else {
          await loadProfile(newSession.user.id);
        }
      } else {
        setAdminProfile(null);
        writeCachedProfile(null);
        setProfileLoaded(true);
        setLoading(false);
      }
    });
    return () => {
      if (sub?.subscription) {
        sub.subscription.unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: "Supabase tidak dikonfigurasi. Hubungi developer." };
    }
    try {
      const envMeta = import.meta as unknown as { env?: { VITE_ADMIN_EMAIL?: string } };
      const allowedEmail = envMeta?.env?.VITE_ADMIN_EMAIL?.toLowerCase?.();
      if (allowedEmail && email.toLowerCase() !== allowedEmail) {
        return { error: "Akses ditolak: email tidak diizinkan." };
      }
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return { error: error.message };
      }
      if (!data?.user?.id) {
        return { error: "Login gagal: user tidak ditemukan di respons." };
      }
      if (allowedEmail && (data.user.email || "").toLowerCase() !== allowedEmail) {
        await supabase.auth.signOut();
        return { error: "Akses ditolak: email tidak diizinkan." };
      }
      await loadProfile(data.user.id);
      return {};
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Terjadi kesalahan saat login.";
      return { error: message };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setAdminProfile(null);
    writeCachedProfile(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      loading,
      session,
      user,
      adminProfile,
      isAdmin: (() => {
        const emailOk = !allowedEmail || (user?.email || "").toLowerCase() === allowedEmail;
        if (!emailOk) return false;
        if (!adminProfile) return true;
        return adminProfile.role === "admin";
      })(),
      signIn,
      signOut,
      refreshProfile: async () => loadProfile(),
    }),
    [adminProfile, loading, session, user, signIn, loadProfile, signOut, allowedEmail],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
