import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TestimonialContent } from '../types/testimonialTypes';
import { mockCmsData } from '../data/mockContent';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

type State = {
  testimonialContent: TestimonialContent;
};

type Actions = {
  updateTestimonialContent: (newContent: Partial<TestimonialContent>) => void;
  loadTestimonialsFromSupabase: () => Promise<void>;
  saveTestimonialsToSupabase: () => Promise<void>;
};

export const useTestimonialStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      testimonialContent: mockCmsData.testimonials,
      updateTestimonialContent: (newContent) =>
        set((state) => ({ testimonialContent: { ...state.testimonialContent, ...newContent } })),
      loadTestimonialsFromSupabase: async () => {
        if (!useTestimonialStore.persist.hasHydrated()) return;
        if (!isSupabaseConfigured) {
          if (!get().testimonialContent?.testimonials?.length) {
            set({ testimonialContent: mockCmsData.testimonials });
          }
          return;
        }

        try {
          const { data, error } = await supabase
            .from('testimonials')
            .select('id,name,role,message,photo_url,rating,is_active,metadata')
            .eq('is_active', true)
            .order('id', { ascending: true });
          
          if (error) throw error;

          if (Array.isArray(data) && data.length > 0) {
            const metadata = data[0]?.metadata;
            const targetUsers = metadata?.target_users || mockCmsData.testimonials.target_users;
            const title = metadata?.title || mockCmsData.testimonials.title;
            set({
              testimonialContent: {
                title,
                target_users: targetUsers,
                testimonials: data.map((d) => ({
                  name: d.name ?? '',
                  role: d.role ?? '',
                  message: d.message ?? '',
                  photo: d.photo_url ?? '',
                  stars: d.rating ?? 5,
                })),
              },
            });
          } else {
            set({ testimonialContent: mockCmsData.testimonials });
          }
        } catch (err) {
          console.error('Error loading testimonials:', err);
        }
      },
      saveTestimonialsToSupabase: async () => {
        if (!isSupabaseConfigured) return;

        try {
          const content = get().testimonialContent;
          if (!content.testimonials || content.testimonials.length === 0) return;

          await supabase.from('testimonials').delete().filter('id', 'not.is', null);
          const { error } = await supabase.from('testimonials').insert(
            content.testimonials.map((t) => ({
              name: t.name,
              role: t.role,
              message: t.message,
              photo_url: t.photo,
              rating: t.stars,
              is_active: true,
              metadata: {
                title: content.title,
                target_users: content.target_users,
              },
            })),
          );
          if (error) throw error;
        } catch (err) {
          console.error('Error saving testimonials:', err);
          throw err;
        }
      },
    }),
    { name: 'bk_testimonials_v2' },
  ),
);

const TESTIMONI_CLIENT_ID = Math.random().toString(36).slice(2);
const testimoniChannel = new BroadcastChannel('bk_testimoni_sync_v1');
useTestimonialStore.subscribe((s) => {
  testimoniChannel.postMessage({ t: 'testimoni', p: s.testimonialContent, f: TESTIMONI_CLIENT_ID });
});
testimoniChannel.onmessage = (e) => {
  const msg = e.data as { t?: string; p?: TestimonialContent; f?: string } | undefined;
  if (!msg || msg.f === TESTIMONI_CLIENT_ID) return;
  if (msg.t === 'testimoni' && msg.p) {
    useTestimonialStore.setState({ testimonialContent: msg.p });
  }
};