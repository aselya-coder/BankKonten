import { Check, Star, Flame } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const packages = [
  {
    name: "Starter",
    qty: "20 Gambar",
    price: "Rp 20.000",
    perImg: "Rp 1.000/gambar",
    features: ["20 gambar AI HD", "Revisi 1x", "Format PNG/JPG", "Kirim via Google Drive"],
    popular: false,
  },
  {
    name: "Best Seller 🔥",
    qty: "50 Gambar",
    price: "Rp 45.000",
    perImg: "Rp 900/gambar",
    features: ["50 gambar AI HD", "Revisi 2x", "Format PNG/JPG", "Kirim via Google Drive", "Bonus 5 gambar", "Priority queue"],
    popular: true,
  },
  {
    name: "Sultan",
    qty: "100 Gambar",
    price: "Rp 80.000",
    perImg: "Rp 800/gambar",
    features: ["100 gambar AI HD", "Revisi 3x", "Format PNG/JPG", "Kirim via Google Drive", "Bonus 15 gambar", "Priority queue", "Custom prompt request"],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="container relative z-10">
        <div className="text-center mb-14">
          <span className="text-primary font-bold text-sm uppercase tracking-widest">Harga Gila</span>
          <h2 className="text-3xl md:text-5xl font-black mt-2 mb-4">
            Pilih Paket <span className="text-gradient">Terbaikmu</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Harga termurah se-Indonesia. <span className="text-urgent font-bold">Serius.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 ${
                pkg.popular
                  ? "bg-card border-primary glow-box scale-105"
                  : "bg-card border-border card-shadow"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" /> PALING LARIS
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold font-display mb-1">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm">{pkg.qty}</p>
                <div className="mt-4">
                  <span className="text-4xl font-black text-gradient">{pkg.price}</span>
                  <p className="text-sm text-muted-foreground mt-1">{pkg.perImg}</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <WhatsAppButton
                variant={pkg.popular ? "urgent" : "default"}
                text={`Order ${pkg.qty}`}
                className="w-full justify-center"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <Flame className="w-4 h-4 text-urgent" />
            Harga promo bisa berakhir kapan saja tanpa pemberitahuan
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
