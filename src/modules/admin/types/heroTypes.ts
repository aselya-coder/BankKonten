export type HeroContent = {
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
  badge_text: string;
  bottom_text: string;
  hero_image?: string;
  trust_badges?: { icon: string; text: string }[];
};
