import { HeroContent } from "../types/heroTypes";
import { PricingContent } from "../types/pricingTypes";
import { TestimonialContent } from "../types/testimonialTypes";
import { KeunggulanContent, WhyContent, UrgencyContent, NavLinkItem, FooterContent, WhatsAppContent } from "../types/contenttypes";

export const defaultHero: HeroContent = {
  title: "Gambar AI Cuma Rp 1.000",
  subtitle: "Konten berkualitas tinggi untuk jualan online kamu.",
  button_text: "🔥 ORDER SEKARANG via WhatsApp",
  button_link: "https://wa.me/6285646420488?text=Halo%20BankKonten.id%2C%20saya%20mau%20order%20gambar%20AI!",
  badge_text: "⚡ PROMO TERBATAS — Stok Bisa Habis Kapan Saja!",
  bottom_text: "⏳ Harga bisa naik sewaktu-waktu tanpa pemberitahuan",
  trust_badges: [
    { icon: "Zap", text: "Proses Cepat" },
    { icon: "Clock", text: "24 Jam Selesai" },
  ],
};

export const defaultPricing: PricingContent = {
  title: "Pilih Paket Terbaikmu",
  badge_text: "Harga Gila",
  subtitle: "Harga termurah se-Indonesia. Serius.",
  tiers: [
    { package_name: "Starter", price: "Rp 20.000", features: ["20 gambar AI HD", "Revisi 1x", "Format PNG/JPG", "Kirim via Google Drive"], button_text: "Order 20 Gambar" },
    { package_name: "Best Seller 🔥", price: "Rp 45.000", features: ["50 gambar AI HD", "Revisi 2x", "Format PNG/JPG", "Kirim via Google Drive", "Bonus 5 gambar", "Priority queue"], button_text: "Order 50 Gambar" },
    { package_name: "Sultan", price: "Rp 80.000", features: ["100 gambar AI HD", "Revisi 3x", "Format PNG/JPG", "Kirim via Google Drive", "Bonus 15 gambar", "Priority queue", "Custom prompt request"], button_text: "Order 100 Gambar" },
  ],
  promo_text: "Harga promo bisa berakhir kapan saja tanpa pemberitahuan",
};

export const defaultTestimonials: TestimonialContent = {
  title: "Mereka Sudah Buktikan",
  badge_text: "Testimoni",
  subtitle: "Ribuan seller sudah pakai BankKonten.id. Kapan giliran kamu?",
  testimonials: [
    { name: "Rina S.", role: "Seller Shopee", message: "Gila sih, Rp 20rb dapet 20 gambar kualitas HD. Listing saya langsung naik viewsnya 3x lipat!", photo: "", stars: 5 },
    { name: "Budi A.", role: "Owner Brand Skincare", message: "Biasanya bayar desainer Rp 500K/bulan. Sekarang hemat banget, kualitasnya bahkan lebih konsisten.", photo: "", stars: 5 },
    { name: "Dian P.", role: "Admin Sosmed", message: "Konten posting harian jadi gampang banget. Tinggal request tema, besoknya udah jadi. TOP!", photo: "", stars: 5 },
    { name: "Fajar M.", role: "Affiliate Marketer", message: "Saya order paket 100 gambar. Dipake buat konten TikTok dan IG, engagement naik drastis.", photo: "", stars: 5 },
  ],
  target_users: [
    { emoji: "🛒", label: "Seller Online (Shopee, Tokped, dll)" },
    { emoji: "🏪", label: "UMKM & Usaha Kecil" },
    { emoji: "📱", label: "Affiliate Marketer" },
    { emoji: "🏷️", label: "Owner Brand" },
    { emoji: "📲", label: "Admin Sosial Media" },
    { emoji: "🎨", label: "Content Creator" },
  ],
  target_users_title: "Cocok Untuk Siapa?",
  button_text: "🚀 Gabung Sekarang!",
};

export const defaultKeunggulan: KeunggulanContent = {
  title: "Keunggulan",
  subtitle: "Kenapa Harus BankKonten.id?",
  items: [
    { icon: "Shield", title: "100% Original", description: "Setiap gambar dibuat unik untuk kamu, bukan template yang dijual berulang." },
    { icon: "Zap", title: "Proses Super Cepat", description: "Order hari ini, gambar dikirim dalam 24 jam. Gak pakai nunggu lama." },
    { icon: "Palette", title: "Request Sesuka Hati", description: "Mau tema apa aja? Fashion, makanan, skincare — tinggal bilang!" },
    { icon: "HeartHandshake", title: "Garansi Revisi", description: "Tidak puas? Ada garansi revisi sesuai paket yang kamu pilih." },
    { icon: "Clock", title: "Support Fast Response", description: "Tim kami siap membantu via WhatsApp. Respon cepat, gak di-ghosting." },
    { icon: "Layers", title: "Resolusi Tinggi", description: "Semua gambar dalam kualitas HD, siap posting tanpa pecah." },
  ],
  button_text: "💬 Chat Kami Sekarang",
};

export const defaultWhyContent: WhyContent = {
  title: "Fakta Pahit",
  subtitle: "Kenapa Kamu BUTUH Banyak Konten?",
  description: "Tanpa konten yang cukup, bisnis online kamu akan tenggelam di antara jutaan kompetitor.",
  items: [
    { icon: "TrendingUp", title: "Konten = Penjualan", description: "Semakin banyak konten, semakin banyak yang lihat produk kamu. Lebih banyak viewers = lebih banyak pembeli." },
    { icon: "ShoppingCart", title: "Kompetitor Sudah Duluan", description: "Seller lain sudah pakai ratusan gambar untuk jualan. Kalau kamu masih pakai foto seadanya, kamu kalah start." },
    { icon: "Users", title: "Algoritma Butuh Volume", description: "Platform sosmed memberikan reach lebih besar ke akun yang konsisten posting. Butuh banyak konten setiap hari." },
    { icon: "BarChart3", title: "Testing Konten Lebih Mudah", description: "Dengan banyak gambar, kamu bisa test mana yang paling laku. Data driven, bukan tebak-tebakan." },
    { icon: "Images", title: "Hemat Biaya Desainer", description: "Hire desainer? Minimal Rp 500K per bulan. Di sini cuma Rp 20.000 dapat 20 gambar berkualitas." },
    { icon: "Target", title: "Cocok untuk Semua Niche", description: "Fashion, F&B, skincare, digital product — gambar AI bisa disesuaikan dengan brand apapun." },
  ],
  button_text: "💬 Tanya Dulu, GRATIS!",
};

export const defaultUrgency: UrgencyContent = {
  title: "⚠️ PERINGATAN",
  description: "Promo Rp 1.000/gambar ini TIDAK AKAN bertahan selamanya.",
  subtext: "Setiap menit yang kamu tunda, kompetitor kamu sudah order dan siap posting konten baru.",
  emphasis_text: "Jangan sampai menyesal.",
  button_text: "🔥 AMANKAN HARGA PROMO SEKARANG!",
  items: [
    { icon: "Clock", title: "Kuota Terbatas", description: "Hanya untuk 100 order pertama" },
    { icon: "TrendingDown", title: "Harga Akan Naik", description: "Jadi Rp 3.000/gambar setelah promo" },
    { icon: "XCircle", title: "Tanpa Pemberitahuan", description: "Promo bisa ditutup kapan saja" },
  ],
};

export const defaultNavLinks: NavLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Harga", href: "#pricing" },
  { label: "Testimoni", href: "#testimoni" },
];

export const defaultFooter: FooterContent = {
  brand_name: "BankKonten.id",
  description: "Penyedia gambar AI termurah dan terpercaya di Indonesia.",
  phone: "6285646420488",
  email: "hello@bankkonten.id",
  address: "Jakarta, Indonesia",
  copyright: `© ${new Date().getFullYear()} BankKonten.id — All rights reserved.`,
};

export const defaultWhatsApp: WhatsAppContent = {
  phone_number: "6285646420488",
  message: "Halo BankKonten.id, saya mau order gambar AI!",
};

export const mockCmsData = {
  hero: defaultHero,
  pricing: defaultPricing,
  testimonials: defaultTestimonials,
  keunggulan: defaultKeunggulan,
  whyContent: defaultWhyContent,
  urgency: defaultUrgency,
  navLinks: defaultNavLinks,
  footer: defaultFooter,
  whatsapp: defaultWhatsApp,
};
