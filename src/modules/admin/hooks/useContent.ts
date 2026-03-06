import { useHeroStore } from '../store/heroStore';
import { usePricingStore } from '../store/pricingStore';
import { useTestimonialStore } from '../store/testimonialStore';
import { useContentStore } from '../store/contentStore';

/**
 * Custom hook to aggregate all content from various stores.
 * This provides a single, unified interface for components to access CMS data.
 */
export const useContent = () => {
  const heroContent = useHeroStore((state) => state.heroContent);
  const pricingContent = usePricingStore((state) => state.pricingContent);
  const testimonialContent = useTestimonialStore((state) => state.testimonialContent);
  
  const {
    keunggulan,
    whyContent,
    urgency,
    navLinks,
    footer,
    whatsapp,
  } = useContentStore((state) => state);

  return {
    heroContent,
    pricingContent,
    testimonialContent,
    keunggulan,
    whyContent,
    urgency,
    navLinks,
    footer,
    whatsapp,
  };
};