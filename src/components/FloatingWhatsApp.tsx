import { MessageCircle } from "lucide-react";

const WA_LINK = "https://wa.me/6281234567890?text=Halo%20BankKonten.id%2C%20saya%20mau%20order%20gambar%20AI!";

const FloatingWhatsApp = () => {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-success rounded-full p-4 cta-shadow animate-bounce-slow hover:scale-110 transition-transform duration-300"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-foreground" />
    </a>
  );
};

export default FloatingWhatsApp;
