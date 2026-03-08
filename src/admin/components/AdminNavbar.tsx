import { Button } from "@/components/ui/button";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const onLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    navigate("/admin/login");
  };
  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-4">
      <div className="font-bold">Admin</div>
      <div>
        <Button variant="outline" onClick={onLogout}>Logout</Button>
      </div>
    </header>
  );
};

export default AdminNavbar;
