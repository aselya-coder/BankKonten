-- ====================================================================
-- Seed Data: BankKonten CMS (safe idempotent)
-- Usage: Run in Supabase SQL editor AFTER applying supabase_schema.sql
-- ====================================================================
BEGIN;

-- HERO
DELETE FROM public.hero_section;
INSERT INTO public.hero_section (title, subtitle, button_text, button_link, is_active, metadata)
VALUES (
  'Gambar AI Cuma Rp 1.000',
  'Konten berkualitas tinggi untuk jualan online kamu.',
  '🔥 ORDER SEKARANG via WhatsApp',
  'https://wa.me/6285646420488?text=Halo%20BankKonten.id%2C%20saya%20mau%20order%20gambar%20AI!',
  TRUE,
  jsonb_build_object(
    'badge_text','⚡ PROMO TERBATAS — Stok Bisa Habis Kapan Saja!',
    'bottom_text','⏳ Harga bisa naik sewaktu-waktu tanpa pemberitahuan'
  )
);

-- KEUNGGULAN
DELETE FROM public.keunggulan;
INSERT INTO public.keunggulan (title, description, icon, order_number, is_active, metadata) VALUES
('100% Original','Setiap gambar dibuat unik untuk kamu, bukan template yang dijual berulang.','Shield',0,TRUE,jsonb_build_object('title','Keunggulan','subtitle','Kenapa Harus BankKonten.id?')),
('Proses Super Cepat','Order hari ini, gambar dikirim dalam 24 jam. Gak pakai nunggu lama.','Zap',1,TRUE,jsonb_build_object('title','Keunggulan','subtitle','Kenapa Harus BankKonten.id?')),
('Request Sesuka Hati','Mau tema apa aja? Fashion, makanan, skincare — tinggal bilang!','Palette',2,TRUE,jsonb_build_object('title','Keunggulan','subtitle','Kenapa Harus BankKonten.id?')),
('Garansi Revisi','Tidak puas? Ada garansi revisi sesuai paket yang kamu pilih.','HeartHandshake',3,TRUE,jsonb_build_object('title','Keunggulan','subtitle','Kenapa Harus BankKonten.id?')),
('Support Fast Response','Tim kami siap membantu via WhatsApp. Respon cepat, gak di-ghosting.','Clock',4,TRUE,jsonb_build_object('title','Keunggulan','subtitle','Kenapa Harus BankKonten.id?')),
('Resolusi Tinggi','Semua gambar dalam kualitas HD, siap posting tanpa pecah.','Layers',5,TRUE,jsonb_build_object('title','Keunggulan','subtitle','Kenapa Harus BankKonten.id?'));

-- WHY CONTENT
DELETE FROM public.why_content;
INSERT INTO public.why_content (title, description, order_number, is_active, metadata) VALUES
('Konten = Penjualan','Semakin banyak konten, semakin banyak yang lihat produk kamu. Lebih banyak viewers = lebih banyak pembeli.',0,TRUE,jsonb_build_object('title','Fakta Pahit','subtitle','Kenapa Kamu BUTUH Banyak Konten?','description','Tanpa konten yang cukup, bisnis online kamu akan tenggelam di antara jutaan kompetitor.','icon','TrendingUp')),
('Kompetitor Sudah Duluan','Seller lain sudah pakai ratusan gambar untuk jualan. Kalau kamu masih pakai foto seadanya, kamu kalah start.',1,TRUE,jsonb_build_object('title','Fakta Pahit','subtitle','Kenapa Kamu BUTUH Banyak Konten?','description','Tanpa konten yang cukup, bisnis online kamu akan tenggelam di antara jutaan kompetitor.','icon','ShoppingCart')),
('Algoritma Butuh Volume','Platform sosmed memberikan reach lebih besar ke akun yang konsisten posting. Butuh banyak konten setiap hari.',2,TRUE,jsonb_build_object('title','Fakta Pahit','subtitle','Kenapa Kamu BUTUH Banyak Konten?','description','Tanpa konten yang cukup, bisnis online kamu akan tenggelam di antara jutaan kompetitor.','icon','Users')),
('Testing Konten Lebih Mudah','Dengan banyak gambar, kamu bisa test mana yang paling laku. Data driven, bukan tebak-tebakan.',3,TRUE,jsonb_build_object('title','Fakta Pahit','subtitle','Kenapa Kamu BUTUH Banyak Konten?','description','Tanpa konten yang cukup, bisnis online kamu akan tenggelam di antara jutaan kompetitor.','icon','BarChart3')),
('Hemat Biaya Desainer','Hire desainer? Minimal Rp 500K per bulan. Di sini cuma Rp 20.000 dapat 20 gambar berkualitas. ',4,TRUE,jsonb_build_object('title','Fakta Pahit','subtitle','Kenapa Kamu BUTUH Banyak Konten?','description','Tanpa konten yang cukup, bisnis online kamu akan tenggelam di antara jutaan kompetitor.','icon','Images')),
('Cocok untuk Semua Niche','Fashion, F&B, skincare, digital product — gambar AI bisa disesuaikan dengan brand apapun.',5,TRUE,jsonb_build_object('title','Fakta Pahit','subtitle','Kenapa Kamu BUTUH Banyak Konten?','description','Tanpa konten yang cukup, bisnis online kamu akan tenggelam di antara jutaan kompetitor.','icon','Target'));

-- PRICING
DELETE FROM public.pricing_packages;
INSERT INTO public.pricing_packages (package_name, price, description, features, button_text, is_popular, order_number, is_active, metadata) VALUES
('Starter','Rp 20.000',NULL, '["20 gambar AI HD","Revisi 1x","Format PNG/JPG","Kirim via Google Drive"]'::jsonb,'Order 20 Gambar',FALSE,0,TRUE,jsonb_build_object('title','Pilih Paket Terbaikmu','promo_text','Harga promo bisa berakhir kapan saja tanpa pemberitahuan')),
('Best Seller 🔥','Rp 45.000',NULL, '["50 gambar AI HD","Revisi 2x","Format PNG/JPG","Kirim via Google Drive","Bonus 5 gambar","Priority queue"]'::jsonb,'Order 50 Gambar',TRUE,1,TRUE,jsonb_build_object('title','Pilih Paket Terbaikmu','promo_text','Harga promo bisa berakhir kapan saja tanpa pemberitahuan')),
('Sultan','Rp 80.000',NULL, '["100 gambar AI HD","Revisi 3x","Format PNG/JPG","Kirim via Google Drive","Bonus 15 gambar","Priority queue","Custom prompt request"]'::jsonb,'Order 100 Gambar',FALSE,2,TRUE,jsonb_build_object('title','Pilih Paket Terbaikmu','promo_text','Harga promo bisa berakhir kapan saja tanpa pemberitahuan'));

-- TESTIMONIALS
DELETE FROM public.testimonials;
INSERT INTO public.testimonials (name, role, message, photo_url, rating, is_active, metadata) VALUES
('Rina S.','Seller Shopee','Gila sih, Rp 20rb dapet 20 gambar kualitas HD. Listing saya langsung naik viewsnya 3x lipat!','',5,TRUE,
 jsonb_build_object(
   'title','Mereka Sudah Buktikan',
   'target_users', jsonb_build_array(
     jsonb_build_object('emoji','🛒','label','Seller Online (Shopee, Tokped, dll)'),
     jsonb_build_object('emoji','🏪','label','UMKM & Usaha Kecil'),
     jsonb_build_object('emoji','📱','label','Affiliate Marketer'),
     jsonb_build_object('emoji','🏷️','label','Owner Brand'),
     jsonb_build_object('emoji','📲','label','Admin Sosial Media'),
     jsonb_build_object('emoji','🎨','label','Content Creator')
   )
 )),
('Budi A.','Owner Brand Skincare','Biasanya bayar desainer Rp 500K/bulan. Sekarang hemat banget, kualitasnya bahkan lebih konsisten.','',5,TRUE,
 jsonb_build_object(
   'title','Mereka Sudah Buktikan',
   'target_users', jsonb_build_array(
     jsonb_build_object('emoji','🛒','label','Seller Online (Shopee, Tokped, dll)'),
     jsonb_build_object('emoji','🏪','label','UMKM & Usaha Kecil'),
     jsonb_build_object('emoji','📱','label','Affiliate Marketer'),
     jsonb_build_object('emoji','🏷️','label','Owner Brand'),
     jsonb_build_object('emoji','📲','label','Admin Sosial Media'),
     jsonb_build_object('emoji','🎨','label','Content Creator')
   )
 )),
('Dian P.','Admin Sosmed','Konten posting harian jadi gampang banget. Tinggal request tema, besoknya udah jadi. TOP!','',5,TRUE,
 jsonb_build_object(
   'title','Mereka Sudah Buktikan',
   'target_users', jsonb_build_array(
     jsonb_build_object('emoji','🛒','label','Seller Online (Shopee, Tokped, dll)'),
     jsonb_build_object('emoji','🏪','label','UMKM & Usaha Kecil'),
     jsonb_build_object('emoji','📱','label','Affiliate Marketer'),
     jsonb_build_object('emoji','🏷️','label','Owner Brand'),
     jsonb_build_object('emoji','📲','label','Admin Sosial Media'),
     jsonb_build_object('emoji','🎨','label','Content Creator')
   )
 )),
('Fajar M.','Affiliate Marketer','Saya order paket 100 gambar. Dipake buat konten TikTok dan IG, engagement naik drastis.','',5,TRUE,
 jsonb_build_object(
   'title','Mereka Sudah Buktikan',
   'target_users', jsonb_build_array(
     jsonb_build_object('emoji','🛒','label','Seller Online (Shopee, Tokped, dll)'),
     jsonb_build_object('emoji','🏪','label','UMKM & Usaha Kecil'),
     jsonb_build_object('emoji','📱','label','Affiliate Marketer'),
     jsonb_build_object('emoji','🏷️','label','Owner Brand'),
     jsonb_build_object('emoji','📲','label','Admin Sosial Media'),
     jsonb_build_object('emoji','🎨','label','Content Creator')
   )
 ));

-- URGENCY
DELETE FROM public.urgency_section;
INSERT INTO public.urgency_section (title, description, button_text, button_link, is_active, metadata) VALUES
('⚠️ PERINGATAN','Promo Rp 1.000/gambar ini TIDAK AKAN bertahan selamanya.','🔥 AMANKAN HARGA PROMO SEKARANG!',NULL,TRUE,
 jsonb_build_object('items', jsonb_build_array(
   jsonb_build_object('icon','Clock','title','Kuota Terbatas','description','Hanya untuk 100 order pertama'),
   jsonb_build_object('icon','TrendingDown','title','Harga Akan Naik','description','Jadi Rp 3.000/gambar setelah promo'),
   jsonb_build_object('icon','XCircle','title','Tanpa Pemberitahuan','description','Promo bisa ditutup kapan saja')
 )));

-- NAVBAR LINKS
DELETE FROM public.navbar_links;
INSERT INTO public.navbar_links (label, href, order_number, is_active) VALUES
('Home','/',0,TRUE),('Keunggulan','#keunggulan',1,TRUE),('Harga','#pricing',2,TRUE),('Testimoni','#testimoni',3,TRUE);

-- FOOTER
DELETE FROM public.footer_content;
INSERT INTO public.footer_content (brand_name, description, phone, email, address, copyright_text, is_active) VALUES
('BankKonten.id','Penyedia gambar AI termurah dan terpercaya di Indonesia.','6285646420488','hello@bankkonten.id','Jakarta, Indonesia','© ' || EXTRACT(YEAR FROM NOW()) || ' BankKonten.id — All rights reserved.', TRUE);

-- WHATSAPP
DELETE FROM public.whatsapp_settings;
INSERT INTO public.whatsapp_settings (phone_number, message, is_active) VALUES
('6285646420488','Halo BankKonten.id, saya mau order gambar AI!', TRUE);

COMMIT;
