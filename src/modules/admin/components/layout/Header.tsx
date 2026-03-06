import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/modules/auth/AuthProvider";

const getPageTitle = (pathname: string) => {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 1) return "Dashboard";
  const title = parts[parts.length - 1];
  return title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, ' ');
};

export const Header = () => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const { signOut, adminProfile } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b">
      <h2 className="text-xl font-bold text-gray-800">{pageTitle}</h2>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">{adminProfile?.email}</span>
        <button
          onClick={async () => {
            await signOut();
            navigate("/admin/login", { replace: true });
          }}
          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 border border-gray-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
