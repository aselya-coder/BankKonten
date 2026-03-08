import { Route, Routes } from "react-router-dom";
import AdminLayout from "@/admin/components/AdminLayout";
import DashboardPage from "@/admin/pages/dashboard/DashboardPage";
import HeroEditor from "@/admin/pages/hero/HeroEditor";
import WhyContentEditor from "@/admin/pages/why/WhyContentEditor";
import KeunggulanEditor from "@/admin/pages/keunggulan/KeunggulanEditor";
import PricingEditor from "@/admin/pages/pricing/PricingEditor";
import TestimoniEditor from "@/admin/pages/testimoni/TestimoniEditor";
import UrgencyEditor from "@/admin/pages/urgency/UrgencyEditor";
import FooterEditor from "@/admin/pages/footer/FooterEditor";
import WhatsAppEditor from "@/admin/pages/whatsapp/WhatsAppEditor";
import LoginPage from "@/admin/pages/login/LoginPage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="hero" element={<HeroEditor />} />
        <Route path="why" element={<WhyContentEditor />} />
        <Route path="keunggulan" element={<KeunggulanEditor />} />
        <Route path="pricing" element={<PricingEditor />} />
        <Route path="testimoni" element={<TestimoniEditor />} />
        <Route path="urgency" element={<UrgencyEditor />} />
        <Route path="footer" element={<FooterEditor />} />
        <Route path="whatsapp" element={<WhatsAppEditor />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
