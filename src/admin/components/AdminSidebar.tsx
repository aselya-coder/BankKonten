import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const items = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/hero", label: "Hero Section" },
  { to: "/admin/why", label: "Why Content" },
  { to: "/admin/keunggulan", label: "Keunggulan" },
  { to: "/admin/pricing", label: "Pricing" },
  { to: "/admin/testimoni", label: "Testimoni" },
  { to: "/admin/urgency", label: "Urgency" },
  { to: "/admin/whatsapp", label: "WhatsApp Settings" },
  { to: "/admin/footer", label: "Footer" },
];

const AdminSidebar = () => {
  return (
    <aside className="h-screen w-64 border-r border-border bg-card p-4 hidden md:block">
      <div className="px-2 py-3 font-bold text-xl">BankKonten</div>
      <nav className="space-y-1">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              cn(
                "block px-3 py-2 rounded-md text-sm hover:bg-accent",
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )
            }
            end={it.to === "/admin"}
          >
            {it.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
