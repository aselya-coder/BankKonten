import { useState, useCallback } from "react";
import { AdminCard } from "../components/ui/AdminCard";
import { useContent } from "../hooks/useContent";
import { useHeroStore } from "../store/heroStore";
import { usePricingStore } from "../store/pricingStore";
import { useContentStore } from "../store/contentStore";
import { useTestimonialStore } from "../store/testimonialStore";
import { mockCmsData } from "../data/mockContent";

const DashboardPage = () => {
  const { pricingContent } = usePricingStore();
  const { testimonialContent, saveTestimonialsToSupabase, loadTestimonialsFromSupabase } = useTestimonialStore();

  const totalPricingPackages = pricingContent?.tiers.length || 0;
  const totalTestimonials = testimonialContent?.testimonials.length || 0;
  const totalContentSections = 6; // Hardcoded for now
  const { saveHeroToSupabase, loadHeroFromSupabase } = useHeroStore();
  const { savePricingToSupabase, loadPricingFromSupabase } = usePricingStore();
  const {
    saveKeunggulanToSupabase,
    saveWhyToSupabase,
    saveUrgencyToSupabase,
    saveFooterToSupabase,
    saveWhatsAppToSupabase,
    saveNavLinksToSupabase,
    loadKeunggulanFromSupabase,
    loadWhyFromSupabase,
    loadUrgencyFromSupabase,
    loadFooterFromSupabase,
    loadWhatsAppFromSupabase,
    loadNavLinksFromSupabase,
  } = useContentStore();
  const [seeding, setSeeding] = useState(false);
  const seedAll = useCallback(async () => {
    try {
      setSeeding(true);
      
      // Ensure we have data in the store, otherwise use mock data
      const currentHero = useHeroStore.getState().heroContent;
      if (!currentHero.title) useHeroStore.setState({ heroContent: mockCmsData.hero });

      const currentPricing = usePricingStore.getState().pricingContent;
      if (!currentPricing.tiers?.length) usePricingStore.setState({ pricingContent: mockCmsData.pricing });

      const currentTestimonial = useTestimonialStore.getState().testimonialContent;
      if (!currentTestimonial.testimonials?.length) useTestimonialStore.setState({ testimonialContent: mockCmsData.testimonials });

      const currentContent = useContentStore.getState();
      if (!currentContent.keunggulan?.items?.length) useContentStore.setState({ keunggulan: mockCmsData.keunggulan });
      if (!currentContent.whyContent?.items?.length) useContentStore.setState({ whyContent: mockCmsData.whyContent });
      if (!currentContent.urgency?.title) useContentStore.setState({ urgency: mockCmsData.urgency });
      if (!currentContent.footer?.brand_name) useContentStore.setState({ footer: mockCmsData.footer });
      if (!currentContent.whatsapp?.phone_number) useContentStore.setState({ whatsapp: mockCmsData.whatsapp });
      if (!currentContent.navLinks?.length) useContentStore.setState({ navLinks: mockCmsData.navLinks });

      await saveHeroToSupabase();
      await savePricingToSupabase();
      await saveTestimonialsToSupabase();
      await Promise.all([
        saveKeunggulanToSupabase(),
        saveWhyToSupabase(),
        saveUrgencyToSupabase(),
        saveFooterToSupabase(),
        saveWhatsAppToSupabase(),
        saveNavLinksToSupabase(),
      ]);

      alert("Sukses: Seluruh data contoh telah dipindahkan ke database Supabase!");
    } catch (e) {
      console.error(e);
      alert("Gagal memindahkan data ke Supabase. Pastikan koneksi dan tabel sudah siap.");
    } finally {
      setSeeding(false);
    }
  }, [
    saveHeroToSupabase,
    savePricingToSupabase,
    saveTestimonialsToSupabase,
    saveKeunggulanToSupabase,
    saveWhyToSupabase,
    saveUrgencyToSupabase,
    saveFooterToSupabase,
    saveWhatsAppToSupabase,
    saveNavLinksToSupabase,
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="mb-6">
        <button
          onClick={seedAll}
          disabled={seeding}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {seeding ? "Menyimpan ke Supabase..." : "Seed Semua Konten ke Supabase"}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminCard title="Total Pricing Packages" value={totalPricingPackages} />
        <AdminCard title="Total Testimonials" value={totalTestimonials} />
        <AdminCard title="Total Content Sections" value={totalContentSections} />
      </div>
    </div>
  );
};

export default DashboardPage;
