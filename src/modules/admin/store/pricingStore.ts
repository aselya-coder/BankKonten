import { create } from 'zustand';
import { PricingContent } from '../types/pricingTypes';
import { mockCmsData } from '../data/mockContent';

type State = {
  pricingContent: PricingContent;
};

type Actions = {
  updatePricingContent: (newContent: Partial<PricingContent>) => void;
};

export const usePricingStore = create<State & Actions>((set) => ({
  pricingContent: mockCmsData.pricing,
  updatePricingContent: (newContent) =>
    set((state) => ({ pricingContent: { ...state.pricingContent, ...newContent } })),
}));