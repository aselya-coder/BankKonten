import { MessageCircle } from "lucide-react";
import { useContentStore } from "@/modules/admin/store/contentStore";

const FloatingWhatsApp = () => {
  const { whatsapp } = useContentStore();
  const href = `https://wa.me/${whatsapp.phone_number}?text=${encodeURIComponent(whatsapp.message)}`;
  return (
    <a
      href={href}
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
