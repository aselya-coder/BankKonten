import { create } from 'zustand';
import { TestimonialContent } from '../types/testimonialTypes';
import { mockCmsData } from '../data/mockContent';

type State = {
  testimonialContent: TestimonialContent;
};

type Actions = {
  updateTestimonialContent: (newContent: Partial<TestimonialContent>) => void;
};

export const useTestimonialStore = create<State & Actions>((set) => ({
  testimonialContent: mockCmsData.testimonials,
  updateTestimonialContent: (newContent) =>
    set((state) => ({ testimonialContent: { ...state.testimonialContent, ...newContent } })),
}));