import HeroSection from "@/components/HeroSection";
import WhyContentSection from "@/components/WhyContentSection";
import PricingSection from "@/components/PricingSection";
import TestimoniSection from "@/components/TestimoniSection";
import KeunggulanSection from "@/components/KeunggulanSection";
import UrgencySection from "@/components/UrgencySection";
import FooterSection from "@/components/FooterSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { useEffect } from "react";
import { useHeroStore } from "@/modules/admin/store/heroStore";
import { usePricingStore } from "@/modules/admin/store/pricingStore";
import { useContentStore } from "@/modules/admin/store/contentStore";
import { useTestimonialStore } from "@/modules/admin/store/testimonialStore";

const Index = () => {
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
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <WhyContentSection />
      <PricingSection />
      <TestimoniSection />
      <KeunggulanSection />
      <UrgencySection />
      <FooterSection />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;
