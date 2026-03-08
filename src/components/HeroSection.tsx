import WhatsAppButton from "./WhatsAppButton";
import { Zap, Clock, AlertTriangle } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { fetchContent } from "@/lib/cms";
import { defaultHero, defaultPricing } from "@/modules/admin/data/mockContent";
import type { HeroContent } from "@/modules/admin/types/heroTypes";
import type { PricingContent } from "@/modules/admin/types/pricingTypes";

const HeroSection = () => {
  const [content, setContent] = useState<HeroContent>(defaultHero);
  const [pricing, setPricing] = useState<PricingContent>(defaultPricing);
  useEffect(() => {
    const run = async () => {
      const data = await fetchContent<HeroContent>("hero_section", defaultHero);
      setContent({ ...defaultHero, ...data });
      const p = await fetchContent<PricingContent>("pricing", defaultPricing);
      setPricing({ ...defaultPricing, ...p });
    };
    run();
  }, []);
  const minOrderText = useMemo(() => {
    const first = pricing.tiers?.[0];
    if (!first) return "";
    // coba ambil jumlah gambar dari fitur pertama (mis. "20 gambar AI HD")
    const m = first.features?.[0]?.match(/(\d+)\s*gambar/i);
    const count = m?.[1] ?? "";
    return count ? `Minimal order ${count} gambar = ${first.price} aja!` : `Minimal order = ${first.price} aja!`;
  }, [pricing]);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%_/_0.15),transparent_60%)]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-electric/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10 text-center py-20 px-4">
        {/* Urgency badge */}
        <div className="inline-flex items-center gap-2 bg-urgent/20 border border-urgent/40 rounded-full px-4 py-2 mb-6 animate-pulse-glow">
          <AlertTriangle className="w-4 h-4 text-urgent" />
          <span className="text-sm font-bold text-urgent">{content.badge_text}</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-4">
          {content.title.split("Rp")[0] || content.title}{" "}
          <span className="text-gradient text-6xl md:text-8xl lg:text-9xl block mt-2">
            {content.title.includes("Rp") ? `Rp${content.title.split("Rp")[1]}` : ""}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-2">{content.subtitle}</p>
        {minOrderText && (
          <p className="text-lg md:text-xl font-bold max-w-2xl mx-auto mb-6">
            {minOrderText}
          </p>
        )}

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Proses Cepat</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">24 Jam Selesai</span>
          </div>
        </div>

        <WhatsAppButton variant="hero" text={content.button_text} />
        
        <p className="mt-4 text-sm text-muted-foreground animate-countdown">
          {content.bottom_text}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
