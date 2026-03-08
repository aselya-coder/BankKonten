import { Star, Quote } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import { useEffect, useMemo, useState } from "react";
import { fetchContent } from "@/lib/cms";
import { defaultTestimonials } from "@/modules/admin/data/mockContent";
import type { TestimonialContent } from "@/modules/admin/types/testimonialTypes";

const TestimoniSection = () => {
  const [content, setContent] = useState<TestimonialContent>(defaultTestimonials);
  useEffect(() => {
    const run = async () => {
      const data = await fetchContent<TestimonialContent>("testimonials", defaultTestimonials);
      setContent({ ...defaultTestimonials, ...data });
    };
    run();
  }, []);
  const titleParts = useMemo(() => {
    const t = content.title ?? "";
    const lead = "Mereka Sudah";
    if (t.toLowerCase().startsWith(lead.toLowerCase())) {
      return { lead: t.slice(0, lead.length), rest: t.slice(lead.length) };
    }
    return null;
  }, [content.title]);
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(217_91%_60%_/_0.06),transparent_60%)]" />
      <div className="container relative z-10">
        <div className="text-center mb-14">
          <span className="text-primary font-bold text-sm uppercase tracking-widest">{content.badge_text || "Testimoni"}</span>
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
          <p className="text-muted-foreground text-lg">{content.subtitle || "Ribuan seller sudah pakai BankKonten.id. Kapan giliran kamu?"}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {content.testimonials.map((t, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 card-shadow hover:border-primary/30 transition-all">
              <Quote className="w-8 h-8 text-primary/30 mb-3" />
              <p className="text-foreground mb-4 leading-relaxed">"{t.message}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold font-display">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold font-display mb-6">
            {content.target_users_title || "Cocok Untuk Siapa?"}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {content.target_users.map((u, i) => (
              <div key={i} className="bg-secondary border border-border rounded-full px-5 py-2.5 text-sm font-medium hover:border-primary/50 transition-colors">
                {u.emoji} {u.label}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <WhatsAppButton text={content.button_text || "🚀 Gabung Sekarang!"} variant="urgent" />
        </div>
      </div>
    </section>
  );
};

export default TestimoniSection;
