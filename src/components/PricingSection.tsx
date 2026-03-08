import { Check, Star, Flame, Sparkles } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import { useEffect, useMemo, useState } from "react";
import { fetchContent } from "@/lib/cms";
import { defaultPricing } from "@/modules/admin/data/mockContent";
import type { PricingContent } from "@/modules/admin/types/pricingTypes";

const PricingSection = () => {
  const [content, setContent] = useState<PricingContent>(defaultPricing);
  useEffect(() => {
    const run = async () => {
      const data = await fetchContent<PricingContent>("pricing", defaultPricing);
      setContent({ ...defaultPricing, ...data });
    };
    run();
  }, []);
  const tiers = useMemo(
    () =>
      content.tiers.map((t) => {
        const m = t.features?.[0]?.match(/(\d+)\s*gambar/i);
        const count = m ? Number(m[1]) : undefined;
        const priceNumber = Number(String(t.price).replace(/[^\d]/g, ""));
        const unit = count && priceNumber ? priceNumber / count : undefined;
        const perImage = unit ? `Rp ${unit.toLocaleString("id-ID")}/gambar` : "";
        const isBest = /best\s*seller/i.test(t.package_name);
        const packageLine = count ? `${count} Gambar` : "";
        return { ...t, perImage, isBest, packageLine };
      }),
    [content.tiers]
  );
  const titleParts = useMemo(() => {
    const t = content.title ?? "";
    const lead = "Pilih Paket";
    if (t.toLowerCase().startsWith(lead.toLowerCase())) {
      return { lead: t.slice(0, lead.length), rest: t.slice(lead.length) };
    }
    return null;
  }, [content.title]);
  return (
    <section className="py-20 px-4 relative">
      <div className="container relative z-10">
        <div className="text-center mb-14">
          <span className="text-primary font-bold text-sm uppercase tracking-widest">Harga Gila</span>
          <h2 className="text-3xl md:text-5xl font-black mt-2 mb-4">
            {titleParts ? (
              <>
                <span className="text-foreground">{titleParts.lead}</span>
                <span className="text-gradient">{titleParts.rest}</span>
              </>
            ) : (
              <span className="text-gradient">{content.title}</span>
            )}
          </h2>
          <p className="text-muted-foreground text-lg">Harga termurah se-Indonesia. <span className="text-urgent font-bold">Serius.</span></p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((pkg, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-6 border bg-card card-shadow transition-all duration-300 hover:-translate-y-2 ${pkg.isBest ? "border-primary ring-2 ring-primary/30" : "border-border"}`}
            >
              {pkg.isBest && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Paling Laris
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold font-display">{pkg.package_name}</h3>
                {pkg.packageLine && <p className="text-sm text-muted-foreground mt-1">{pkg.packageLine}</p>}
                <div className="mt-4">
                  <span className="text-4xl font-black text-gradient">{pkg.price}</span>
                </div>
                {pkg.perImage && <p className="text-xs text-muted-foreground mt-1">{pkg.perImage}</p>}
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((f: string, j: number) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <WhatsAppButton
                variant="default"
                text={pkg.button_text || "Order"}
                className="w-full justify-center"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <Flame className="w-4 h-4 text-urgent" />
            {content.promo_text}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
