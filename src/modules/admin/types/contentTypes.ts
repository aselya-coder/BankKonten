export type KeunggulanItem = {
  title: string;
  description: string;
  icon: string;
};

export type KeunggulanContent = {
  title: string;
  subtitle: string;
  items: KeunggulanItem[];
};

export type WhyContentItem = {
  title: string;
  description: string;
  icon: string;
};

export type WhyContent = {
  title: string;
  subtitle: string;
  description: string;
  global_icon?: string;
  items: WhyContentItem[];
};

export type UrgencyItem = {
  icon: string;
  title: string;
  description: string;
};

export type UrgencyContent = {
  title: string;
  description: string;
  button_text: string;
  items: UrgencyItem[];
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
