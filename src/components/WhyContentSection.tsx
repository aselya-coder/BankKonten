import { TrendingUp, ShoppingCart, Users, BarChart3, ImageIcon, Target } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const reasons = [
  {
    icon: TrendingUp,
    title: "Konten = Penjualan",
    desc: "Semakin banyak konten, semakin banyak yang lihat produk kamu. Lebih banyak viewers = lebih banyak pembeli.",
  },
  {
    icon: ShoppingCart,
    title: "Kompetitor Sudah Duluan",
    desc: "Seller lain sudah pakai ratusan gambar untuk jualan. Kalau kamu masih pakai foto seadanya, kamu kalah start.",
  },
  {
    icon: Users,
    title: "Algoritma Butuh Volume",
    desc: "Platform sosmed memberikan reach lebih besar ke akun yang konsisten posting. Butuh banyak konten setiap hari.",
  },
  {
    icon: BarChart3,
    title: "Testing Konten Lebih Mudah",
    desc: "Dengan banyak gambar, kamu bisa test mana yang paling laku. Data driven, bukan tebak-tebakan.",
  },
  {
    icon: ImageIcon,
    title: "Hemat Biaya Desainer",
    desc: "Hire desainer? Minimal Rp 500K per bulan. Di sini cuma Rp 20.000 dapat 20 gambar berkualitas.",
  },
  {
    icon: Target,
    title: "Cocok untuk Semua Niche",
    desc: "Fashion, F&B, skincare, digital product — gambar AI bisa disesuaikan dengan brand apapun.",
  },
];

const WhyContentSection = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(217_91%_60%_/_0.08),transparent_60%)]" />
      <div className="container relative z-10">
        <div className="text-center mb-14">
          <span className="text-primary font-bold text-sm uppercase tracking-widest">Fakta Pahit</span>
          <h2 className="text-3xl md:text-5xl font-black mt-2 mb-4">
            Kenapa Kamu <span className="text-gradient">BUTUH Banyak Konten?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tanpa konten yang cukup, bisnis online kamu akan <span className="text-urgent font-bold">tenggelam</span> di antara jutaan kompetitor.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6 card-shadow hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <r.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <WhatsAppButton text="💬 Tanya Dulu, GRATIS!" />
        </div>
      </div>
    </section>
  );
};

export default WhyContentSection;
