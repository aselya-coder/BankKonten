import { Button } from "@/components/ui/button";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const onLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    navigate("/admin/login");
  };
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger />
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-xl">Admin Panel</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminNavbar;
