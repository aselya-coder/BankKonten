import HeroSection from "@/components/HeroSection";
import WhyContentSection from "@/components/WhyContentSection";
import PricingSection from "@/components/PricingSection";
import TestimoniSection from "@/components/TestimoniSection";
import KeunggulanSection from "@/components/KeunggulanSection";
import UrgencySection from "@/components/UrgencySection";
import FooterSection from "@/components/FooterSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MainNavbar from "@/components/MainNavbar";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <MainNavbar />
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
