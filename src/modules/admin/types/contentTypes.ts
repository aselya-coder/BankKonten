export type KeunggulanItem = {
  title: string;
  description: string;
  icon: string; // Usually a key for an icon component
};

export type WhyContentItem = {
  title: string;
  description: string;
};

export type UrgencyContent = {
  title: string;
  description: string;
  button_text: string;
};

export type NavLinkItem = {
  label: string;
  href: string;
};

export type FooterContent = {
  brand_name: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  copyright: string;
};

export type WhatsAppContent = {
  phone_number: string;
  message: string;
};
