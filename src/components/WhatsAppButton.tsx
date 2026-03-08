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

interface WhatsAppButtonProps {
  text?: string;
  className?: string;
  variant?: "default" | "urgent" | "hero";
}

const WhatsAppButton = ({ text = "Order via WhatsApp", className = "", variant = "default" }: WhatsAppButtonProps) => {
  const [link, setLink] = useState(buildLink(defaultWhatsApp.phone_number, defaultWhatsApp.message));
  useEffect(() => {
    const run = async () => {
      const settings = await fetchContent<WhatsAppContent>("whatsapp_settings", { ...defaultWhatsApp, show_button: true });
      setLink(buildLink(settings.phone_number, settings.message));
    };
    run();
  }, []);
  const baseStyles = "inline-flex items-center gap-2 font-display font-bold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95";
  
  const variants = {
    default: "bg-success text-foreground px-6 py-3 text-base cta-shadow hover:brightness-110",
    urgent: "bg-success text-foreground px-8 py-4 text-lg cta-shadow animate-pulse-glow hover:brightness-110",
    hero: "bg-success text-foreground px-10 py-5 text-xl cta-shadow hover:brightness-110",
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      {text}
    </a>
  );
};

export default WhatsAppButton;
