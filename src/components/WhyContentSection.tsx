import * as Icons from "lucide-react";
import type { ComponentType } from "react";
import WhatsAppButton from "./WhatsAppButton";
import { useEffect, useMemo, useState } from "react";
import { fetchContent } from "@/lib/cms";
import { defaultWhyContent } from "@/modules/admin/data/mockContent";
import type { WhyContent } from "@/modules/admin/types/contenttypes";

const WhyContentSection = () => {
  const [content, setContent] = useState<WhyContent>(defaultWhyContent);
  useEffect(() => {
    const run = async () => {
      const data = await fetchContent<WhyContent>("why_content", defaultWhyContent);
      setContent({ ...defaultWhyContent, ...data });
    };
    run();
  }, []);
  const items = useMemo(
    () =>
      content.items.map((it) => {
        const iconSet = Icons as unknown as Record<string, ComponentType<{ className?: string }>>;
        const Icon = iconSet[it.icon] ?? iconSet["TrendingUp"];
        return { ...it, Icon };
      }),
    [content.items]
  );
  const subtitleParts = useMemo(() => {
    const s = content.subtitle ?? "";
    const lead = "Kenapa Kamu";
    if (s.toLowerCase().startsWith(lead.toLowerCase())) {
      return { lead: s.slice(0, lead.length), rest: s.slice(lead.length) };
    }
    return null;
  }, [content.subtitle]);
  const descNodes = useMemo(() => {
    const d = content.description ?? "";
    const re = /(tenggelam|tenggelem)/i;
    const m = d.match(re);
    if (!m) return d;
    const idx = m.index ?? -1;
    if (idx < 0) return d;
    const before = d.slice(0, idx);
    const match = d.slice(idx, idx + m[0].length);
    const after = d.slice(idx + m[0].length);
    return (
      <>
        {before}
        <span className="text-urgent font-bold">{match}</span>
        {after}
      </>
    );
  }, [content.description]);
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(217_91%_60%_/_0.08),transparent_60%)]" />
      <div className="container relative z-10">
        <div className="text-center mb-14">
          <span className="text-primary font-bold text-sm uppercase tracking-widest">{content.title}</span>
          <h2 className="text-3xl md:text-5xl font-black mt-2 mb-4">
            {subtitleParts ? (
              <>
                <span className="text-foreground">{subtitleParts.lead}</span>
                <span className="text-gradient">{subtitleParts.rest}</span>
              </>
            ) : (
              <span className="text-gradient">{content.subtitle}</span>
            )}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{descNodes}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((r, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6 card-shadow hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <r.Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <WhatsAppButton text="💬 Tanya Dulu, GRATIS!" />
        </div>
      </div>
    </section>
  );
};

export default WhyContentSection;
