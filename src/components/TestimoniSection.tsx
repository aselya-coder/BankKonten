import { Star, Quote } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const testimonials = [
  {
    name: "Rina S.",
    role: "Seller Shopee",
    text: "Gila sih, Rp 20rb dapet 20 gambar kualitas HD. Listing saya langsung naik viewsnya 3x lipat!",
    stars: 5,
  },
  {
    name: "Budi A.",
    role: "Owner Brand Skincare",
    text: "Biasanya bayar desainer Rp 500K/bulan. Sekarang hemat banget, kualitasnya bahkan lebih konsisten.",
    stars: 5,
  },
  {
    name: "Dian P.",
    role: "Admin Sosmed",
    text: "Konten posting harian jadi gampang banget. Tinggal request tema, besoknya udah jadi. TOP!",
    stars: 5,
  },
  {
    name: "Fajar M.",
    role: "Affiliate Marketer",
    text: "Saya order paket 100 gambar. Dipake buat konten TikTok dan IG, engagement naik drastis.",
    stars: 5,
  },
];

const targetUsers = [
  { emoji: "🛒", label: "Seller Online (Shopee, Tokped, dll)" },
  { emoji: "🏪", label: "UMKM & Usaha Kecil" },
  { emoji: "📱", label: "Affiliate Marketer" },
  { emoji: "🏷️", label: "Owner Brand" },
  { emoji: "📲", label: "Admin Sosial Media" },
  { emoji: "🎨", label: "Content Creator" },
];

const TestimoniSection = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(217_91%_60%_/_0.06),transparent_60%)]" />
      <div className="container relative z-10">
        <div className="text-center mb-14">
          <span className="text-primary font-bold text-sm uppercase tracking-widest">Testimoni</span>
          <h2 className="text-3xl md:text-5xl font-black mt-2 mb-4">
            Mereka Sudah <span className="text-gradient">Buktikan</span>
          </h2>
          <p className="text-muted-foreground text-lg">Ribuan seller sudah pakai BankKonten.id. Kapan giliran kamu?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 card-shadow hover:border-primary/30 transition-all">
              <Quote className="w-8 h-8 text-primary/30 mb-3" />
              <p className="text-foreground mb-4 leading-relaxed">"{t.text}"</p>
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

        {/* Target users */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold font-display mb-6">
            Cocok Untuk Siapa?
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {targetUsers.map((u, i) => (
              <div key={i} className="bg-secondary border border-border rounded-full px-5 py-2.5 text-sm font-medium hover:border-primary/50 transition-colors">
                {u.emoji} {u.label}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <WhatsAppButton text="🚀 Gabung Sekarang!" variant="urgent" />
        </div>
      </div>
    </section>
  );
};

export default TestimoniSection;
