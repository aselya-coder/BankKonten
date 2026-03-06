import { create } from 'zustand';
import { HeroContent } from '../types/heroTypes';
import { mockCmsData } from '../data/mockContent';


type State = {
  heroContent: HeroContent;
};

type Actions = {
  updateHeroContent: (newContent: Partial<HeroContent>) => void;
};

export const useHeroStore = create<State & Actions>((set) => ({
  heroContent: mockCmsData.hero,
  updateHeroContent: (newContent) =>
    set((state) => ({ heroContent: { ...state.heroContent, ...newContent } })),
}));