import * as Icons from "lucide-react";
import type { SVGProps } from "react";
import WhatsAppButton from "./WhatsAppButton";
import { useContentStore } from "@/modules/admin/store/contentStore";

const KeunggulanSection = () => {
  const { keunggulan, whatsapp } = useContentStore();
  const href = `https://wa.me/${whatsapp.phone_number}?text=${encodeURIComponent(whatsapp.message)}`;
  return (
    <section className="py-20 px-4">
      <div className="container">
        <div className="text-center mb-14">
          <span className="text-primary font-bold text-sm uppercase tracking-widest">{keunggulan.title}</span>
          <h2 className="text-3xl md:text-5xl font-black mt-2 mb-4">
            {keunggulan.subtitle.split("BankKonten.id?")[0]}
            <span className="text-gradient">BankKonten.id?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {(keunggulan.items || []).map((a, i) => {
            type IconKey = keyof typeof Icons;
            const Comp = Icons[a.icon as IconKey] as ((props: SVGProps<SVGSVGElement>) => JSX.Element) | undefined;
            const IconComp = Comp ?? Icons.Shield;
            return (
            <div key={i} className="flex gap-4 bg-card border border-border rounded-xl p-5 card-shadow hover:border-primary/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <IconComp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold font-display mb-1">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
              </div>
            </div>
          )})}
        </div>

        <div className="text-center mt-12">
          <WhatsAppButton text="💬 Chat Kami Sekarang" href={href} />
        </div>
      </div>
    </section>
  );
};

export default KeunggulanSection;
