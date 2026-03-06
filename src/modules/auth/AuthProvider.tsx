import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

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

  const loadSession = async () => {
    setLoading(true);
    const { data } = await supabase.auth.getSession();
    setSession(data.session ?? null);
    setUser(data.session?.user ?? null);
    // defer clearing loading until profile handled
  };

  const loadProfile = async (uid?: string) => {
    const userId = uid || user?.id;
    if (!userId) {
      setAdminProfile(null);
      setProfileLoaded(true);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from("admin_users")
      .select("id,user_id,name,email,role,created_at,updated_at")
      .eq("user_id", userId)
      .single();
    if (error) {
      setAdminProfile(null);
      setProfileLoaded(true);
      setLoading(false);
      return;
    }
    setAdminProfile(data as AdminProfile);
    setProfileLoaded(true);
    setLoading(false);
  };

  useEffect(() => {
    loadSession().then(async () => {
      const uid = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user?.id : user?.id;
      await loadProfile(uid);
    });
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession ?? null);
      setUser(newSession?.user ?? null);
      setLoading(true);
      if (newSession?.user?.id) {
        await loadProfile(newSession.user.id);
      } else {
        setAdminProfile(null);
        setProfileLoaded(true);
        setLoading(false);
      }
    });
    return () => {
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return { error: error.message };
      }
      if (!data?.user?.id) {
        return { error: "Login gagal: user tidak ditemukan di respons." };
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
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      loading,
      session,
      user,
      adminProfile,
      isAdmin: !!adminProfile && (adminProfile.role === "admin" || adminProfile.role === "super_admin"),
      signIn,
      signOut,
      refreshProfile: async () => loadProfile(),
    }),
    [adminProfile, loading, session, user, signIn, loadProfile, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
