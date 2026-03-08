import { AlertTriangle, Clock, TrendingDown, XCircle } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import { useEffect, useMemo, useState } from "react";
import { fetchContent } from "@/lib/cms";
import { defaultUrgency } from "@/modules/admin/data/mockContent";
import type { UrgencyContent } from "@/modules/admin/types/contenttypes";

const UrgencySection = () => {
  const [content, setContent] = useState<UrgencyContent>(defaultUrgency);
  useEffect(() => {
    const run = async () => {
      const data = await fetchContent<UrgencyContent>("urgency", defaultUrgency);
      setContent({ ...defaultUrgency, ...data });
    };
    run();
  }, []);
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0_84%_60%_/_0.08),transparent_50%)]" />
      <div className="container relative z-10 max-w-3xl mx-auto text-center">
        <div className="bg-card border-2 border-urgent/40 rounded-2xl p-8 md:p-12 card-shadow">
          <AlertTriangle className="w-16 h-16 text-urgent mx-auto mb-6 animate-shake" />
          
          <h2 className="text-3xl md:text-5xl font-black mb-4">{content.title}</h2>
          <p className="text-xl md:text-2xl font-bold text-foreground mb-6">
            {(() => {
              const d = content.description ?? "";
              const re = /(tidak akan)/i;
              const m = d.match(re);
              if (!m || m.index == null) return d;
              const idx = m.index;
              const before = d.slice(0, idx);
              const match = d.slice(idx, idx + m[0].length);
              const after = d.slice(idx + m[0].length);
              return (
                <>
                  {before}
                  <span className="text-urgent">{match.toUpperCase()}</span>
                  {after}
                </>
              );
            })()}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary rounded-xl p-4">
              <Clock className="w-6 h-6 text-urgent mx-auto mb-2" />
              <p className="text-sm font-bold">{content.items[0]?.title}</p>
              <p className="text-xs text-muted-foreground">{content.items[0]?.description}</p>
            </div>
            <div className="bg-secondary rounded-xl p-4">
              <TrendingDown className="w-6 h-6 text-urgent mx-auto mb-2" />
              <p className="text-sm font-bold">{content.items[1]?.title}</p>
              <p className="text-xs text-muted-foreground">{content.items[1]?.description}</p>
            </div>
            <div className="bg-secondary rounded-xl p-4">
              <XCircle className="w-6 h-6 text-urgent mx-auto mb-2" />
              <p className="text-sm font-bold">{content.items[2]?.title}</p>
              <p className="text-xs text-muted-foreground">{content.items[2]?.description}</p>
            </div>
          </div>

          {content.subtext && (
            <p className="text-muted-foreground mb-2 text-lg">
              {content.subtext}
            </p>
          )}
          {content.emphasis_text && (
            <p className="font-bold mb-8">
              {content.emphasis_text}
            </p>
          )}

          <WhatsAppButton variant="urgent" text={content.button_text} />
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;
