import * as Icons from "lucide-react";
import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { fetchContent } from "@/lib/cms";
import { defaultServices } from "@/modules/admin/data/mockContent";
import type { ServicesContent } from "@/modules/admin/types/contenttypes";

const ServicesSection = () => {
  const [content, setContent] = useState<ServicesContent>(defaultServices);
  useEffect(() => {
    const run = async () => {
      const data = await fetchContent<ServicesContent>("services", defaultServices);
      setContent({ ...defaultServices, ...data });
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
  return (
    <section className="py-20 px-4">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black">{content.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((it, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 card-shadow">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <it.Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold mb-1">{it.title}</h3>
              <p className="text-sm text-muted-foreground">{it.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
