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
  testimonials: Testimonial[];
  target_users: TargetUser[];
};
