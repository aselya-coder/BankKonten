export type Testimonial = {
  name: string;
  role: string;
  message: string;
  photo: string;
  stars: number;
};

export type TestimonialContent = {
  title: string;
  testimonials: Testimonial[];
};