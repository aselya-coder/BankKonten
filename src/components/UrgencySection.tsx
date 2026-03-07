import * as Icons from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import { useContentStore } from "@/modules/admin/store/contentStore";

const UrgencySection = () => {
  const { urgency, whatsapp } = useContentStore();
  const href = `https://wa.me/${whatsapp.phone_number}?text=${encodeURIComponent(whatsapp.message)}`;
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0_84%_60%_/_0.08),transparent_50%)]" />
      <div className="container relative z-10 max-w-3xl mx-auto text-center">
        <div className="bg-card border-2 border-urgent/40 rounded-2xl p-8 md:p-12 card-shadow">
          <Icons.AlertTriangle className="w-16 h-16 text-urgent mx-auto mb-6 animate-shake" />
          
          <h2 className="text-3xl md:text-5xl font-black mb-4">{urgency.title}</h2>
          <p className="text-xl md:text-2xl font-bold text-foreground mb-6">{urgency.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {(urgency.items || []).map((item, i) => {
              type IconKey = keyof typeof Icons;
              const IconComp = (Icons[item.icon as IconKey] || Icons.Clock) as React.ElementType;
              return (
                <div key={i} className="bg-secondary rounded-xl p-4">
                  <IconComp className="w-6 h-6 text-urgent mx-auto mb-2" />
                  <p className="text-sm font-bold">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>

          <p className="text-muted-foreground mb-8 text-lg">
            Setiap menit yang kamu tunda, kompetitor kamu sudah order dan siap posting konten baru.
            <br />
            <span className="font-bold text-foreground">Jangan sampai menyesal.</span>
          </p>

          <WhatsAppButton variant="urgent" text={urgency.button_text} href={href} />
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;
