import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HeroContent } from '../types/heroTypes';
import { mockCmsData } from '../data/mockContent';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';


type State = {
  heroContent: HeroContent;
};

type Actions = {
  updateHeroContent: (newContent: Partial<HeroContent>) => void;
  loadHeroFromSupabase: () => Promise<void>;
  saveHeroToSupabase: () => Promise<void>;
};

export const useHeroStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      heroContent: mockCmsData.hero,
      updateHeroContent: (newContent) =>
        set((state) => ({ heroContent: { ...state.heroContent, ...newContent } })),
      loadHeroFromSupabase: async () => {
        // Wait for hydration if needed
        if (!useHeroStore.persist.hasHydrated()) return;

        // Skip if not configured
        if (!isSupabaseConfigured) {
          const current = get().heroContent as Partial<HeroContent> | undefined;
          const merged: HeroContent = {
            ...mockCmsData.hero,
            ...(current ?? {}),
          };
          set({ heroContent: merged });
          return;
        }

        try {
          const { data, error } = await supabase
            .from('hero_section')
            .select('id,title,subtitle,button_text,button_link,is_active,metadata')
            .eq('is_active', true)
            .limit(1)
            .maybeSingle();
          
          if (error) throw error;

          if (data) {
            const merged: HeroContent = {
              title: data.title || mockCmsData.hero.title,
              subtitle: data.subtitle || mockCmsData.hero.subtitle,
              button_text: data.button_text || mockCmsData.hero.button_text,
              button_link: data.button_link || mockCmsData.hero.button_link,
              badge_text: data.metadata?.badge_text || mockCmsData.hero.badge_text,
              bottom_text: data.metadata?.bottom_text || mockCmsData.hero.bottom_text,
            };
            set({ heroContent: merged });
          } else {
            set({ heroContent: mockCmsData.hero });
          }
        } catch (err) {
          console.error('Error loading hero:', err);
        }
      },
      saveHeroToSupabase: async () => {
        // Skip if not configured
        if (!isSupabaseConfigured) {
          console.warn("Cannot save: Supabase is not configured.");
          return;
        }

        try {
          const h = get().heroContent;
          if (!h.title) return; // Guard against saving empty data
          
          await supabase.from('hero_section').delete().filter('id', 'not.is', null);
          const { error } = await supabase.from('hero_section').insert([{
            title: h.title,
            subtitle: h.subtitle,
            button_text: h.button_text,
            button_link: h.button_link,
            is_active: true,
            metadata: {
              badge_text: h.badge_text,
              bottom_text: h.bottom_text,
            }
          }]);
          if (error) throw error;
        } catch (err) {
          console.error('Error saving hero:', err);
          throw err;
        }
      },
    }),
    { name: 'bk_hero_v2' },
  ),
);

const HERO_CLIENT_ID = Math.random().toString(36).slice(2);
const heroChannel = new BroadcastChannel('bk_hero_sync_v1');
useHeroStore.subscribe((s) => {
  heroChannel.postMessage({ t: 'hero', p: s.heroContent, f: HERO_CLIENT_ID });
});
heroChannel.onmessage = (e) => {
  const msg = e.data as { t?: string; p?: HeroContent; f?: string } | undefined;
  if (!msg || msg.f === HERO_CLIENT_ID) return;
  if (msg.t === 'hero' && msg.p) {
    useHeroStore.setState({ heroContent: msg.p });
  }
};
