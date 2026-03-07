import { Route, Routes } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import DashboardPage from "../pages/DashboardPage";
import HeroPage from "../pages/HeroPage";
import KeunggulanPage from "../pages/KeunggulanPage";
import WhyContentPage from "../pages/WhyContentPage";
import PricingPage from "../pages/PricingPage";
import TestimoniPage from "../pages/TestimoniPage";
import UrgencyPage from "../pages/UrgencyPage";
import FooterPage from "../pages/FooterPage";
import WhatsAppPage from "../pages/WhatsAppPage";
import NavLinksPage from "../pages/NavLinksPage";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminLayout />}>
      <Route index element={<DashboardPage />} />
      <Route path="hero" element={<HeroPage />} />
      <Route path="keunggulan" element={<KeunggulanPage />} />
      <Route path="why-content" element={<WhyContentPage />} />
      <Route path="pricing" element={<PricingPage />} />
      <Route path="testimoni" element={<TestimoniPage />} />
      <Route path="urgency" element={<UrgencyPage />} />
      <Route path="footer" element={<FooterPage />} />
      <Route path="whatsapp" element={<WhatsAppPage />} />
      <Route path="nav-links" element={<NavLinksPage />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
