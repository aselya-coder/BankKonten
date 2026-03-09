import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { defaultHero } from "@/modules/admin/data/mockContent";
import type { HeroContent } from "@/modules/admin/types/heroTypes";
import { fetchContent, saveContent } from "@/lib/cms";

const HeroEditor = () => {
  const [data, setData] = useState<HeroContent>(defaultHero);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      const content = await fetchContent<HeroContent>("hero_section", defaultHero);
      setData({ ...defaultHero, ...content });
    };
    run();
  }, []);

  const onSave = async () => {
    setSaving(true);
    const res = await saveContent("hero_section", data);
    setSaving(false);
    if (!res.ok) {
      toast({ title: "Gagal menyimpan", description: res.error });
    } else {
      toast({ title: "Tersimpan" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">Headline</label>
          <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} placeholder="headline" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Subheadline</label>
          <Input value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} placeholder="subheadline" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Button Text</label>
          <Input value={data.button_text} onChange={(e) => setData({ ...data, button_text: e.target.value })} placeholder="button_text" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Button Link</label>
          <Input value={data.button_link} onChange={(e) => setData({ ...data, button_link: e.target.value })} placeholder="button_link" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Badge Text (Promo di atas judul)</label>
          <Input value={data.badge_text} onChange={(e) => setData({ ...data, badge_text: e.target.value })} placeholder="badge_text" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Bottom Text (Disclaimer kecil)</label>
          <Input value={data.bottom_text} onChange={(e) => setData({ ...data, bottom_text: e.target.value })} placeholder="bottom_text" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Hero Image URL (Opsional)</label>
          <Input value={data.hero_image ?? ""} onChange={(e) => setData({ ...data, hero_image: e.target.value })} placeholder="hero_image" />
        </div>

        <div className="space-y-2 pt-4 border-t">
          <label className="text-sm font-medium">Trust Badges (ikon Lucide + teks)</label>
          {data.trust_badges?.map((tb, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-2">
              <Input className="sm:w-32" value={tb.icon} onChange={(e) => {
                const badges = [...(data.trust_badges || [])];
                badges[idx] = { ...badges[idx], icon: e.target.value };
                setData({ ...data, trust_badges: badges });
              }} placeholder="Icon (e.g. Zap)" />
              <Input className="flex-1" value={tb.text} onChange={(e) => {
                const badges = [...(data.trust_badges || [])];
                badges[idx] = { ...badges[idx], text: e.target.value };
                setData({ ...data, trust_badges: badges });
              }} placeholder="Text" />
              <Button className="w-full sm:w-auto" variant="destructive" size="icon" onClick={() => {
                const badges = data.trust_badges?.filter((_, i) => i !== idx);
                setData({ ...data, trust_badges: badges });
              }}>✕</Button>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => {
            setData({ ...data, trust_badges: [...(data.trust_badges || []), { icon: "Zap", text: "" }] });
          }}>Tambah Trust Badge</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave} disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
      </CardFooter>
    </Card>
  );
};

export default HeroEditor;
