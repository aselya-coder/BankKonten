import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PricingContent } from '../types/pricingTypes';
import { mockCmsData } from '../data/mockContent';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

type State = {
  pricingContent: PricingContent;
};

type Actions = {
  updatePricingContent: (newContent: Partial<PricingContent>) => void;
  loadPricingFromSupabase: () => Promise<void>;
  savePricingToSupabase: () => Promise<void>;
};

export const usePricingStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      pricingContent: mockCmsData.pricing,
      updatePricingContent: (newContent) =>
        set((state) => ({ pricingContent: { ...state.pricingContent, ...newContent } })),
      loadPricingFromSupabase: async () => {
        // Wait for hydration if needed
        if (!usePricingStore.persist.hasHydrated()) return;

        // Skip if not configured
        if (!isSupabaseConfigured) {
          if (!get().pricingContent?.tiers || get().pricingContent.tiers.length === 0) {
            set({ pricingContent: mockCmsData.pricing });
          }
          return;
        }

        try {
          const { data, error } = await supabase
            .from('pricing_packages')
            .select('id,package_name,price,description,features,button_text,is_popular,order_number,is_active,metadata')
            .eq('is_active', true)
            .order('order_number', { ascending: true });
          
          if (error) throw error;

          if (Array.isArray(data) && data.length > 0) {
            const metadata = data[0]?.metadata;
            const promoText = metadata?.promo_text || mockCmsData.pricing.promo_text;
            const title = metadata?.title || mockCmsData.pricing.title;
            set((state) => ({
              pricingContent: {
                ...state.pricingContent,
                title,
                promo_text: promoText,
                tiers: data.map((d) => ({
                  package_name: d.package_name ?? '',
                  price: d.price ?? '',
                  features: Array.isArray(d.features) ? d.features : [],
                  button_text: d.button_text ?? '',
                })),
              },
            }));
          } else {
            set({ pricingContent: mockCmsData.pricing });
          }
        } catch (err) {
          console.error('Error loading pricing:', err);
        }
      },
      savePricingToSupabase: async () => {
        // Skip if not configured
        if (!isSupabaseConfigured) {
          console.warn("Cannot save: Supabase is not configured.");
          return;
        }

        try {
          const items = get().pricingContent.tiers;
          if (!items || items.length === 0) return; // Guard against saving empty data
          
          await supabase.from('pricing_packages').delete().filter('id', 'not.is', null);
          
          if (items.length > 0) {
            const { error } = await supabase.from('pricing_packages').insert(
              items.map((it, idx) => ({
                package_name: it.package_name,
                price: it.price,
                features: it.features,
                button_text: it.button_text,
                is_popular: it.package_name.includes('🔥'),
                is_active: true,
                order_number: idx,
                metadata: {
                  title: get().pricingContent.title,
                  promo_text: get().pricingContent.promo_text,
                }
              })),
            );
            if (error) throw error;
          }
        } catch (err) {
          console.error('Error saving pricing:', err);
          throw err;
        }
      },
    }),
    { name: 'bk_pricing_v2' },
  ),
);

const PRICING_CLIENT_ID = Math.random().toString(36).slice(2);
const pricingChannel = new BroadcastChannel('bk_pricing_sync_v1');
usePricingStore.subscribe((s) => {
  pricingChannel.postMessage({ t: 'pricing', p: s.pricingContent, f: PRICING_CLIENT_ID });
});
pricingChannel.onmessage = (e) => {
  const msg = e.data as { t?: string; p?: PricingContent; f?: string } | undefined;
  if (!msg || msg.f === PRICING_CLIENT_ID) return;
  if (msg.t === 'pricing' && msg.p) {
    usePricingStore.setState({ pricingContent: msg.p });
  }
};
