import { Shield, Zap, Palette, HeartHandshake, Clock, Layers } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const advantages = [
  { icon: Shield, title: "100% Original", desc: "Setiap gambar dibuat unik untuk kamu, bukan template yang dijual berulang." },
  { icon: Zap, title: "Proses Super Cepat", desc: "Order hari ini, gambar dikirim dalam 24 jam. Gak pakai nunggu lama." },
  { icon: Palette, title: "Request Sesuka Hati", desc: "Mau tema apa aja? Fashion, makanan, skincare — tinggal bilang!" },
  { icon: HeartHandshake, title: "Garansi Revisi", desc: "Tidak puas? Ada garansi revisi sesuai paket yang kamu pilih." },
  { icon: Clock, title: "Support Fast Response", desc: "Tim kami siap membantu via WhatsApp. Respon cepat, gak di-ghosting." },
  { icon: Layers, title: "Resolusi Tinggi", desc: "Semua gambar dalam kualitas HD, siap posting tanpa pecah." },
];

const KeunggulanSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container">
        <div className="text-center mb-14">
          <span className="text-primary font-bold text-sm uppercase tracking-widest">Keunggulan</span>
          <h2 className="text-3xl md:text-5xl font-black mt-2 mb-4">
            Kenapa Harus <span className="text-gradient">BankKonten.id?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {advantages.map((a, i) => (
            <div key={i} className="flex gap-4 bg-card border border-border rounded-xl p-5 card-shadow hover:border-primary/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <a.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold font-display mb-1">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <WhatsAppButton text="💬 Chat Kami Sekarang" />
        </div>
      </div>
    </section>
  );
};

export default KeunggulanSection;
