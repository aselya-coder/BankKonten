import * as Icons from "lucide-react";
import type { ComponentType } from "react";
import WhatsAppButton from "./WhatsAppButton";
import { useEffect, useMemo, useState } from "react";
import { fetchContent } from "@/lib/cms";
import { defaultKeunggulan } from "@/modules/admin/data/mockContent";
import type { KeunggulanContent } from "@/modules/admin/types/contenttypes";

const KeunggulanSection = () => {
  const [content, setContent] = useState<KeunggulanContent>(defaultKeunggulan);
  useEffect(() => {
    const run = async () => {
      const data = await fetchContent<KeunggulanContent>("keunggulan", defaultKeunggulan);
      setContent({ ...defaultKeunggulan, ...data });
    };
    run();
  }, []);
  const items = useMemo(
    () =>
      content.items.map((it) => {
        const iconSet = Icons as unknown as Record<string, ComponentType<{ className?: string }>>;
        const Icon = iconSet[it.icon] ?? iconSet["Zap"];
        return { ...it, Icon };
      }),
    [content.items]
  );
  const subtitleParts = useMemo(() => {
    const phrase = "Kenapa Harus";
    const s = content.subtitle ?? "";
    if (s.startsWith(`${phrase} `)) {
      return { lead: phrase, rest: s.slice(phrase.length) };
    }
    return null;
  }, [content.subtitle]);
  return (
    <section className="py-20 px-4">
      <div className="container">
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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((a, i) => (
            <div key={i} className="flex gap-4 bg-card border border-border rounded-xl p-5 card-shadow hover:border-primary/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <a.Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold font-display mb-1">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <WhatsAppButton text={content.button_text || "💬 Chat Kami Sekarang"} />
        </div>
      </div>
    </section>
  );
};

export default KeunggulanSection;
