export type Testimonial = {
  name: string;
  role: string;
  message: string;
  photo: string;
  stars: number;
};

export type TargetUser = {
  emoji: string;
  label: string;
};

export type TestimonialContent = {
  title: string;
  badge_text: string;
  subtitle: string;
  testimonials: Testimonial[];
  target_users: TargetUser[];
  target_users_title: string;
  button_text: string;
};
