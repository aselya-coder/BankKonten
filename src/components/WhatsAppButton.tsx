import { MessageCircle } from "lucide-react";

const WA_LINK = "https://wa.me/6281234567890?text=Halo%20BankKonten.id%2C%20saya%20mau%20order%20gambar%20AI!";

interface WhatsAppButtonProps {
  text?: string;
  className?: string;
  variant?: "default" | "urgent" | "hero";
}

const WhatsAppButton = ({ text = "Order via WhatsApp", className = "", variant = "default" }: WhatsAppButtonProps) => {
  const baseStyles = "inline-flex items-center gap-2 font-display font-bold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95";
  
  const variants = {
    default: "bg-success text-foreground px-6 py-3 text-base cta-shadow hover:brightness-110",
    urgent: "bg-success text-foreground px-8 py-4 text-lg cta-shadow animate-pulse-glow hover:brightness-110",
    hero: "bg-success text-foreground px-10 py-5 text-xl cta-shadow hover:brightness-110",
  };

  return (
    <a
      href={WA_LINK}
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
