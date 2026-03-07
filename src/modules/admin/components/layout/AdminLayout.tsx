import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useHeroStore } from "../../store/heroStore";
import { usePricingStore } from "../../store/pricingStore";
import { useContentStore } from "../../store/contentStore";
import { useTestimonialStore } from "../../store/testimonialStore";

const AdminLayout = () => {
  const { loadHeroFromSupabase } = useHeroStore();
  const { loadPricingFromSupabase } = usePricingStore();
  const { loadTestimonialsFromSupabase } = useTestimonialStore();
  const {
    loadKeunggulanFromSupabase,
    loadWhyFromSupabase,
    loadUrgencyFromSupabase,
    loadFooterFromSupabase,
    loadWhatsAppFromSupabase,
    loadNavLinksFromSupabase,
  } = useContentStore();
  useEffect(() => {
    loadHeroFromSupabase();
    loadPricingFromSupabase();
    loadTestimonialsFromSupabase();
    loadKeunggulanFromSupabase();
    loadWhyFromSupabase();
    loadUrgencyFromSupabase();
    loadFooterFromSupabase();
    loadWhatsAppFromSupabase();
    loadNavLinksFromSupabase();
  }, []);
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
