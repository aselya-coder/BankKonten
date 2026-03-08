import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchContent } from "@/lib/cms";
import { defaultWhatsApp } from "@/modules/admin/data/mockContent";
import type { WhatsAppContent } from "@/modules/admin/types/contenttypes";

const buildLink = (phone: string, message: string) => {
  const p = phone.replace(/[^\d]/g, "");
  const m = encodeURIComponent(message);
  return `https://wa.me/${p}?text=${m}`;
};

const FloatingWhatsApp = () => {
  const [link, setLink] = useState(buildLink(defaultWhatsApp.phone_number, defaultWhatsApp.message));
  const [show, setShow] = useState(true);
  useEffect(() => {
    const run = async () => {
      const settings = await fetchContent<WhatsAppContent>("whatsapp_settings", { ...defaultWhatsApp, show_button: true });
      setLink(buildLink(settings.phone_number, settings.message));
      setShow(settings.show_button !== false);
    };
    run();
  }, []);
  return (
    show ? (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-success rounded-full p-4 cta-shadow animate-bounce-slow hover:scale-110 transition-transform duration-300"
        aria-label="Chat WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-foreground" />
      </a>
    ) : null
  );
};

export default FloatingWhatsApp;
