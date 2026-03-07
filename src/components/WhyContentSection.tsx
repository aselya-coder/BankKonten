import WhatsAppButton from "./WhatsAppButton";
import { useContentStore } from "@/modules/admin/store/contentStore";

const WhyContentSection = () => {
  const { whyContent, whatsapp } = useContentStore();
  const href = `https://wa.me/${whatsapp.phone_number}?text=${encodeURIComponent(whatsapp.message)}`;
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(217_91%_60%_/_0.08),transparent_60%)]" />
      <div className="container relative z-10">
        <div className="text-center mb-14">
          <span className="text-primary font-bold text-sm uppercase tracking-widest">{whyContent.title}</span>
          <h2 className="text-3xl md:text-5xl font-black mt-2 mb-4">
            {whyContent.subtitle.split("BUTUH")[0]}
            <span className="text-gradient">BUTUH Banyak Konten?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {whyContent.description.split("tenggelam")[0]}
            <span className="text-urgent font-bold">tenggelam</span> 
            {whyContent.description.split("tenggelam")[1]}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(whyContent.items || []).map((r, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6 card-shadow hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-lg font-bold font-display mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <WhatsAppButton text="💬 Tanya Dulu, GRATIS!" href={href} />
        </div>
      </div>
    </section>
  );
};

export default WhyContentSection;
