import WhatsAppButton from "./WhatsAppButton";
import { Zap, Clock, AlertTriangle } from "lucide-react";
import { useHeroStore } from "@/modules/admin/store/heroStore";

const HeroSection = () => {
  const { heroContent } = useHeroStore();
  const title = heroContent?.title || "";
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
          <span className="text-sm font-bold text-urgent">{heroContent?.badge_text || ""}</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-4">
          {title.split("Rp")[0] || title}{" "}
          <span className="text-gradient text-6xl md:text-8xl lg:text-9xl block mt-2">
            {title.includes("Rp") ? `Rp${title.split("Rp")[1]}` : ""}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4">{heroContent?.subtitle || ""}</p>

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

        <WhatsAppButton variant="hero" text={heroContent?.button_text || ""} href={heroContent?.button_link || ""} />
        
        <p className="mt-4 text-sm text-muted-foreground animate-countdown">
          {heroContent?.bottom_text || ""}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
