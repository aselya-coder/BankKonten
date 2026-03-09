import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

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
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="font-bold text-xl">BankKonten</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          "w-full flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )
                      }
                      end={item.to === "/admin"}
                    >
                      {item.label}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
