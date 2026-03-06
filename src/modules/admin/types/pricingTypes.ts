export type PricingTier = {
  package_name: string;
  price: string;
  features: string[];
  button_text: string;
};

export type PricingContent = {
  title: string;
  tiers: PricingTier[];
};