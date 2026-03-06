import { create } from 'zustand';
import { KeunggulanItem, WhyContentItem, UrgencyContent, NavLinkItem, FooterContent, WhatsAppContent } from '../types/contentTypes';
import { mockCmsData } from '../data/mockContent';

type ContentState = {
  keunggulan: KeunggulanItem[];
  whyContent: WhyContentItem[];
  urgency: UrgencyContent;
  navLinks: NavLinkItem[];
  footer: FooterContent;
  whatsapp: WhatsAppContent;
};

type ContentActions = {
  updateKeunggulan: (newContent: KeunggulanItem[]) => void;
  updateWhyContent: (newContent: WhyContentItem[]) => void;
  updateUrgency: (newContent: Partial<UrgencyContent>) => void;
  updateNavLinks: (newContent: NavLinkItem[]) => void;
  updateFooter: (newContent: Partial<FooterContent>) => void;
  updateWhatsApp: (newContent: Partial<WhatsAppContent>) => void;
};

export const useContentStore = create<ContentState & ContentActions>((set) => ({
  keunggulan: mockCmsData.keunggulan,
  whyContent: mockCmsData.whyContent,
  urgency: mockCmsData.urgency,
  navLinks: mockCmsData.navLinks,
  footer: mockCmsData.footer,
  whatsapp: mockCmsData.whatsapp,

  updateKeunggulan: (newContent) => set({ keunggulan: newContent }),
  updateWhyContent: (newContent) => set({ whyContent: newContent }),
  updateUrgency: (newContent) => set((state) => ({ urgency: { ...state.urgency, ...newContent } })),
  updateNavLinks: (newContent) => set({ navLinks: newContent }),
  updateFooter: (newContent) => set((state) => ({ footer: { ...state.footer, ...newContent } })),
  updateWhatsApp: (newContent) => set((state) => ({ whatsapp: { ...state.whatsapp, ...newContent } })),
}));
