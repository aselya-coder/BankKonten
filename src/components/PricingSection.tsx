import { Check, Star, Flame } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import { usePricingStore } from "@/modules/admin/store/pricingStore";
import { useContentStore } from "@/modules/admin/store/contentStore";

const PricingSection = () => {
  const { pricingContent } = usePricingStore();
  const { whatsapp } = useContentStore();
  const href = `https://wa.me/${whatsapp.phone_number}?text=${encodeURIComponent(whatsapp.message)}`;
  return (
    <section className="py-20 px-4 relative">
      <div className="container relative z-10">
        <div className="text-center mb-14">
          <span className="text-primary font-bold text-sm uppercase tracking-widest">Harga Gila</span>
          <h2 className="text-3xl md:text-5xl font-black mt-2 mb-4">{pricingContent.title}</h2>
          <p className="text-muted-foreground text-lg">
            Harga termurah se-Indonesia. <span className="text-urgent font-bold">Serius.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {(pricingContent?.tiers || []).map((tier, i) => {
            const popular = tier.package_name.includes("🔥");
            return (
            <div
              key={i}
              className={`relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 ${
                popular
                  ? "bg-card border-primary glow-box scale-105"
                  : "bg-card border-border card-shadow"
              }`}
            >
              {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" /> PALING LARIS
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold font-display mb-1">{tier.package_name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-black text-gradient">{tier.price}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <WhatsAppButton
                variant={popular ? "urgent" : "default"}
                text={tier.button_text}
                href={href}
                className="w-full justify-center"
              />
            </div>
          )})}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <Flame className="w-4 h-4 text-urgent" />
            {pricingContent?.promo_text || ""}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
