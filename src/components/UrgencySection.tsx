import { AlertTriangle, Clock, TrendingDown, XCircle } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const UrgencySection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0_84%_60%_/_0.08),transparent_50%)]" />
      <div className="container relative z-10 max-w-3xl mx-auto text-center">
        <div className="bg-card border-2 border-urgent/40 rounded-2xl p-8 md:p-12 card-shadow">
          <AlertTriangle className="w-16 h-16 text-urgent mx-auto mb-6 animate-shake" />
          
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            ⚠️ PERINGATAN
          </h2>
          <p className="text-xl md:text-2xl font-bold text-foreground mb-6">
            Promo Rp 1.000/gambar ini <span className="text-urgent">TIDAK AKAN</span> bertahan selamanya.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary rounded-xl p-4">
              <Clock className="w-6 h-6 text-urgent mx-auto mb-2" />
              <p className="text-sm font-bold">Kuota Terbatas</p>
              <p className="text-xs text-muted-foreground">Hanya untuk 100 order pertama</p>
            </div>
            <div className="bg-secondary rounded-xl p-4">
              <TrendingDown className="w-6 h-6 text-urgent mx-auto mb-2" />
              <p className="text-sm font-bold">Harga Akan Naik</p>
              <p className="text-xs text-muted-foreground">Jadi Rp 3.000/gambar setelah promo</p>
            </div>
            <div className="bg-secondary rounded-xl p-4">
              <XCircle className="w-6 h-6 text-urgent mx-auto mb-2" />
              <p className="text-sm font-bold">Tanpa Pemberitahuan</p>
              <p className="text-xs text-muted-foreground">Promo bisa ditutup kapan saja</p>
            </div>
          </div>

          <p className="text-muted-foreground mb-8 text-lg">
            Setiap menit yang kamu tunda, kompetitor kamu sudah order dan siap posting konten baru.
            <br />
            <span className="font-bold text-foreground">Jangan sampai menyesal.</span>
          </p>

          <WhatsAppButton variant="urgent" text="🔥 AMANKAN HARGA PROMO SEKARANG!" />
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;
