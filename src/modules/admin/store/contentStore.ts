import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { KeunggulanContent, WhyContent, UrgencyContent, NavLinkItem, FooterContent, WhatsAppContent } from '../types/contentTypes';
import { mockCmsData } from '../data/mockContent';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

type ContentState = {
  keunggulan: KeunggulanContent;
  whyContent: WhyContent;
  urgency: UrgencyContent;
  navLinks: NavLinkItem[];
  footer: FooterContent;
  whatsapp: WhatsAppContent;
};

type ContentActions = {
  updateKeunggulan: (newContent: KeunggulanContent) => void;
  updateWhyContent: (newContent: WhyContent) => void;
  updateUrgency: (newContent: Partial<UrgencyContent>) => void;
  updateNavLinks: (newContent: NavLinkItem[]) => void;
  updateFooter: (newContent: Partial<FooterContent>) => void;
  updateWhatsApp: (newContent: Partial<WhatsAppContent>) => void;
  
  loadKeunggulanFromSupabase: () => Promise<void>;
  saveKeunggulanToSupabase: () => Promise<void>;
  loadWhyFromSupabase: () => Promise<void>;
  saveWhyToSupabase: () => Promise<void>;
  loadUrgencyFromSupabase: () => Promise<void>;
  saveUrgencyToSupabase: () => Promise<void>;
  loadFooterFromSupabase: () => Promise<void>;
  saveFooterToSupabase: () => Promise<void>;
  loadWhatsAppFromSupabase: () => Promise<void>;
  saveWhatsAppToSupabase: () => Promise<void>;
  loadNavLinksFromSupabase: () => Promise<void>;
  saveNavLinksToSupabase: () => Promise<void>;
};

export const useContentStore = create<ContentState & ContentActions>()(
  persist(
    (set, get) => ({
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
      
      loadKeunggulanFromSupabase: async () => {
        if (!useContentStore.persist.hasHydrated()) return;
        if (!isSupabaseConfigured) {
          if (!get().keunggulan?.items?.length) set({ keunggulan: mockCmsData.keunggulan });
          return;
        }

        try {
          const { data, error } = await supabase
            .from('keunggulan')
            .select('id,title,description,icon,is_active,order_number,metadata')
            .eq('is_active', true)
            .order('order_number', { ascending: true });
          
          if (error) throw error;

          if (Array.isArray(data) && data.length > 0) {
            set({ keunggulan: {
              title: data[0].metadata?.title || mockCmsData.keunggulan.title,
              subtitle: data[0].metadata?.subtitle || mockCmsData.keunggulan.subtitle,
              items: data.map((d) => ({ 
                title: d.title ?? '', 
                description: d.description ?? '', 
                icon: d.icon ?? 'Shield' 
              }))
            }});
          } else {
            set({ keunggulan: mockCmsData.keunggulan });
          }
        } catch (err) {
          console.error('Error loading keunggulan:', err);
        }
      },
      saveKeunggulanToSupabase: async () => {
        if (!isSupabaseConfigured) return;
        try {
          const content = get().keunggulan;
          if (!content.items || content.items.length === 0) return;
          await supabase.from('keunggulan').delete().filter('id', 'not.is', null);
          const { error } = await supabase.from('keunggulan').insert(
            content.items.map((it, idx) => ({
              title: it.title,
              description: it.description,
              icon: it.icon,
              is_active: true,
              order_number: idx,
              metadata: { title: content.title, subtitle: content.subtitle }
            })),
          );
          if (error) throw error;
        } catch (err) {
          console.error('Error saving keunggulan:', err);
          throw err;
        }
      },

      loadWhyFromSupabase: async () => {
        if (!useContentStore.persist.hasHydrated()) return;
        if (!isSupabaseConfigured) {
          if (!get().whyContent?.items?.length) set({ whyContent: mockCmsData.whyContent });
          return;
        }

        try {
          const { data, error } = await supabase
            .from('why_content')
            .select('id,title,description,is_active,order_number,metadata')
            .eq('is_active', true)
            .order('order_number', { ascending: true });
          
          if (error) throw error;

          if (Array.isArray(data) && data.length > 0) {
            set({ whyContent: {
              title: data[0].metadata?.title || mockCmsData.whyContent.title,
              subtitle: data[0].metadata?.subtitle || mockCmsData.whyContent.subtitle,
              description: data[0].metadata?.description || mockCmsData.whyContent.description,
              items: data.map((d) => ({ 
                title: d.title ?? '', 
                description: d.description ?? '' 
              }))
            }});
          } else {
            set({ whyContent: mockCmsData.whyContent });
          }
        } catch (err) {
          console.error('Error loading why content:', err);
        }
      },
      saveWhyToSupabase: async () => {
        if (!isSupabaseConfigured) return;
        try {
          const content = get().whyContent;
          if (!content.items || content.items.length === 0) return;
          await supabase.from('why_content').delete().filter('id', 'not.is', null);
          const { error } = await supabase.from('why_content').insert(
            content.items.map((it, idx) => ({
              title: it.title,
              description: it.description,
              is_active: true,
              order_number: idx,
              metadata: { title: content.title, subtitle: content.subtitle, description: content.description }
            })),
          );
          if (error) throw error;
        } catch (err) {
          console.error('Error saving why content:', err);
          throw err;
        }
      },

      loadUrgencyFromSupabase: async () => {
        if (!useContentStore.persist.hasHydrated()) return;
        if (!isSupabaseConfigured) {
          if (!get().urgency?.title) set({ urgency: mockCmsData.urgency });
          return;
        }

        try {
          const { data, error } = await supabase
            .from('urgency_section')
            .select('id,title,description,button_text,is_active,metadata')
            .eq('is_active', true)
            .limit(1)
            .maybeSingle();
          
          if (error) throw error;

          if (data) {
            set({ urgency: {
              title: data.title || mockCmsData.urgency.title,
              description: data.description || mockCmsData.urgency.description,
              button_text: data.button_text || mockCmsData.urgency.button_text,
              items: data.metadata?.items || mockCmsData.urgency.items,
            }});
          } else {
            set({ urgency: mockCmsData.urgency });
          }
        } catch (err) {
          console.error('Error loading urgency:', err);
        }
      },
      saveUrgencyToSupabase: async () => {
        if (!isSupabaseConfigured) return;
        try {
          const u = get().urgency;
          if (!u.title) return;
          await supabase.from('urgency_section').delete().filter('id', 'not.is', null);
          const { error } = await supabase.from('urgency_section').insert([{
            title: u.title,
            description: u.description,
            button_text: u.button_text,
            is_active: true,
            metadata: { items: u.items }
          }]);
          if (error) throw error;
        } catch (err) {
          console.error('Error saving urgency:', err);
          throw err;
        }
      },

      loadFooterFromSupabase: async () => {
        if (!useContentStore.persist.hasHydrated()) return;
        if (!isSupabaseConfigured) {
          if (!get().footer?.brand_name) set({ footer: mockCmsData.footer });
          return;
        }

        try {
          const { data, error } = await supabase
            .from('footer_content')
            .select('id,brand_name,description,phone,email,address,copyright_text,is_active')
            .eq('is_active', true)
            .limit(1)
            .maybeSingle();
          
          if (error) throw error;

          if (data) {
            set({ footer: {
              brand_name: data.brand_name || mockCmsData.footer.brand_name,
              description: data.description || mockCmsData.footer.description,
              phone: data.phone || mockCmsData.footer.phone,
              email: data.email || mockCmsData.footer.email,
              address: data.address || mockCmsData.footer.address,
              copyright: data.copyright_text || mockCmsData.footer.copyright,
            }});
          } else {
            set({ footer: mockCmsData.footer });
          }
        } catch (err) {
          console.error('Error loading footer:', err);
        }
      },
      saveFooterToSupabase: async () => {
        if (!isSupabaseConfigured) return;
        try {
          const f = get().footer;
          if (!f.brand_name) return;
          await supabase.from('footer_content').delete().filter('id', 'not.is', null);
          const { error } = await supabase.from('footer_content').insert([{
            brand_name: f.brand_name,
            description: f.description,
            phone: f.phone,
            email: f.email,
            address: f.address,
            copyright_text: f.copyright,
            is_active: true,
          }]);
          if (error) throw error;
        } catch (err) {
          console.error('Error saving footer:', err);
          throw err;
        }
      },

      loadWhatsAppFromSupabase: async () => {
        if (!useContentStore.persist.hasHydrated()) return;
        if (!isSupabaseConfigured) {
          if (!get().whatsapp?.phone_number) set({ whatsapp: mockCmsData.whatsapp });
          return;
        }

        try {
          const { data, error } = await supabase
            .from('whatsapp_settings')
            .select('id,phone_number,message,is_active')
            .eq('is_active', true)
            .limit(1)
            .maybeSingle();
          
          if (error) throw error;

          if (data) {
            set({ whatsapp: {
              phone_number: data.phone_number || mockCmsData.whatsapp.phone_number,
              message: data.message || mockCmsData.whatsapp.message,
            }});
          } else {
            set({ whatsapp: mockCmsData.whatsapp });
          }
        } catch (err) {
          console.error('Error loading whatsapp:', err);
        }
      },
      saveWhatsAppToSupabase: async () => {
        if (!isSupabaseConfigured) return;
        try {
          const w = get().whatsapp;
          if (!w.phone_number) return;
          await supabase.from('whatsapp_settings').delete().filter('id', 'not.is', null);
          const { error } = await supabase.from('whatsapp_settings').insert([{
            phone_number: w.phone_number,
            message: w.message,
            is_active: true,
          }]);
          if (error) throw error;
        } catch (err) {
          console.error('Error saving whatsapp:', err);
          throw err;
        }
      },

      loadNavLinksFromSupabase: async () => {
        if (!useContentStore.persist.hasHydrated()) return;
        if (!isSupabaseConfigured) {
          if (!get().navLinks?.length) set({ navLinks: mockCmsData.navLinks });
          return;
        }

        try {
          const { data, error } = await supabase
            .from('navbar_links')
            .select('id,label,href,order_number,is_active')
            .eq('is_active', true)
            .order('order_number', { ascending: true });
          if (error) throw error;
          if (Array.isArray(data) && data.length > 0) {
            set({ navLinks: data.map((d) => ({ label: d.label ?? '', href: d.href ?? '' })) });
          } else {
            set({ navLinks: mockCmsData.navLinks });
          }
        } catch (err) {
          console.error('Error loading nav links:', err);
        }
      },
      saveNavLinksToSupabase: async () => {
        if (!isSupabaseConfigured) return;
        try {
          const items = get().navLinks;
          if (!items || items.length === 0) return;
          await supabase.from('navbar_links').delete().filter('id', 'not.is', null);
          const { error } = await supabase.from('navbar_links').insert(
            items.map((it, idx) => ({
              label: it.label,
              href: it.href,
              is_active: true,
              order_number: idx,
            })),
          );
          if (error) throw error;
        } catch (err) {
          console.error('Error saving nav links:', err);
          throw err;
        }
      },
    }),
    { name: 'bk_content_v2' },
  ),
);
