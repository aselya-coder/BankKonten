-- ====================================================================
-- Schema: BankKonten CMS - Admin Authentication
-- Author: Gemini
-- Description: Skema untuk tabel profil admin yang terhubung dengan Supabase Auth.
-- ====================================================================

-- --------------------------------------------------------------------
-- 0. EXTENSIONS & HELPER FUNCTIONS
-- --------------------------------------------------------------------
-- Pastikan fungsi UUID tersedia
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Helper: auto update kolom updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------------------------------
-- 1. TABLE CREATION: admin_users
-- --------------------------------------------------------------------

-- Tabel untuk menyimpan data profil admin, terhubung ke auth.users
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT UNIQUE NOT NULL, -- Email harus unik dan sinkron dengan auth.users
  role TEXT DEFAULT 'admin' NOT NULL CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Komentar pada tabel dan kolom untuk kejelasan
COMMENT ON TABLE public.admin_users IS 'Menyimpan profil dan role untuk pengguna admin.';
COMMENT ON COLUMN public.admin_users.user_id IS 'Foreign key ke tabel auth.users.';
COMMENT ON COLUMN public.admin_users.role IS 'Role pengguna, e.g., admin atau super_admin.';

-- --------------------------------------------------------------------
-- 2. TRIGGER for updated_at
-- --------------------------------------------------------------------

-- Menggunakan fungsi handle_updated_at yang sudah ada dari skema sebelumnya
DROP TRIGGER IF EXISTS on_admin_users_updated ON public.admin_users;
CREATE TRIGGER on_admin_users_updated
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- --------------------------------------------------------------------
-- 3. ROW LEVEL SECURITY (RLS)
-- --------------------------------------------------------------------

-- Aktifkan RLS pada tabel admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policy 1: Admin hanya bisa melihat data profilnya sendiri.
DROP POLICY IF EXISTS "Admins can view their own profile" ON public.admin_users;
CREATE POLICY "Admins can view their own profile" 
ON public.admin_users 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Policy 2: Admin hanya bisa memperbarui data profilnya sendiri.
DROP POLICY IF EXISTS "Admins can update their own profile" ON public.admin_users;
CREATE POLICY "Admins can update their own profile" 
ON public.admin_users 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Policy 3: Admin boleh membuat profilnya sendiri (opsional).
-- Gunakan ini jika tidak memakai trigger sinkronisasi dari auth.users.
DROP POLICY IF EXISTS "Admins can insert their own profile" ON public.admin_users;
CREATE POLICY "Admins can insert their own profile"
ON public.admin_users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- 4. FUNCTION for new user trigger (Sinkronisasi data)
-- --------------------------------------------------------------------

-- Index untuk mempercepat query berdasarkan user_id
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON public.admin_users(user_id);

-- Fungsi ini akan otomatis membuat entri di `admin_users` setiap kali
-- ada pengguna baru yang mendaftar di `auth.users`.
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_users (user_id, name, email, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.email, 'admin');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger yang akan memanggil fungsi di atas setelah user baru dibuat
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();

-- ====================================================================
-- End of Schema
-- ====================================================================
