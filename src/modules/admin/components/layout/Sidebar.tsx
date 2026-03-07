import { NavLink } from "react-router-dom";
import { Home, Image, Star, BarChart, MessageSquare, Zap, Wind, Milestone, Phone, Link } from "lucide-react";

const navLinks = [
  { to: "/admin", icon: Home, label: "Dashboard" },
  { to: "/admin/hero", icon: Image, label: "Hero Section" },
  { to: "/admin/keunggulan", icon: Star, label: "Keunggulan" },
  { to: "/admin/why-content", icon: BarChart, label: "Why Content" },
  { to: "/admin/pricing", icon: Zap, label: "Pricing" },
  { to: "/admin/testimoni", icon: MessageSquare, label: "Testimoni" },
  { to: "/admin/urgency", icon: Wind, label: "Urgency" },
  { to: "/admin/footer", icon: Milestone, label: "Footer" },
  { to: "/admin/whatsapp", icon: Phone, label: "WhatsApp" },
  { to: "/admin/nav-links", icon: Link, label: "Navigasi" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md flex-shrink-0">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-indigo-600">BankKonten CMS</h1>
      </div>
      <nav className="mt-4">
        <ul>
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${
                    isActive ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600 font-semibold" : ""
                  }`
                }
              >
                <link.icon className="w-5 h-5 mr-3" />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
