import { useEffect, useState } from "react";
import { fetchContent } from "@/lib/cms";
import { defaultProblems } from "@/modules/admin/data/mockContent";
import type { ProblemsContent } from "@/modules/admin/types/contenttypes";

const ProblemsSection = () => {
  const [content, setContent] = useState<ProblemsContent>(defaultProblems);
  useEffect(() => {
    const run = async () => {
      const data = await fetchContent<ProblemsContent>("problems", defaultProblems);
      setContent({ ...defaultProblems, ...data });
    };
    run();
  }, []);
  return (
    <section className="py-20 px-4">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black">{content.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {content.items.map((it, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 card-shadow">
              <p className="font-medium">{it.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
