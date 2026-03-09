import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!isSupabaseConfigured || !supabase) {
        setReady(true);
        return;
      }
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/admin/login", { replace: true });
      }
      setReady(true);
    };
    run();
  }, [navigate]);

  if (!ready) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AdminSidebar />
        <SidebarInset className="flex flex-col flex-1">
          <AdminNavbar />
          <main className="flex-1 p-4 md:p-6 lg:p-8 w-full">
            <div className="max-w-5xl mx-auto">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
