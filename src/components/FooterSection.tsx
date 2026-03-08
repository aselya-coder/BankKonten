import { useEffect, useState } from "react";
import { fetchContent } from "@/lib/cms";
import { defaultFooter } from "@/modules/admin/data/mockContent";
import type { FooterContent } from "@/modules/admin/types/contenttypes";

const FooterSection = () => {
  const [content, setContent] = useState<FooterContent>(defaultFooter);
  useEffect(() => {
    const run = async () => {
      const data = await fetchContent<FooterContent>("footer", defaultFooter);
      setContent({ ...defaultFooter, ...data });
    };
    run();
  }, []);
  return (
    <footer className="py-10 px-4 border-t border-border">
      <div className="container text-center">
        <h3 className="text-xl font-bold font-display text-gradient mb-2">{content.brand_name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{content.description}</p>
        <p className="text-xs text-muted-foreground">
          {content.copyright}
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
