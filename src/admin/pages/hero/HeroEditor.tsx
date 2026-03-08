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
        <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} placeholder="headline" />
        <Input value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} placeholder="subheadline" />
        <Input value={data.button_text} onChange={(e) => setData({ ...data, button_text: e.target.value })} placeholder="button_text" />
        <Input value={data.button_link} onChange={(e) => setData({ ...data, button_link: e.target.value })} placeholder="button_link" />
        <Input value={data.badge_text} onChange={(e) => setData({ ...data, badge_text: e.target.value })} placeholder="badge_text (promo di atas judul)" />
        <Input value={data.bottom_text} onChange={(e) => setData({ ...data, bottom_text: e.target.value })} placeholder="bottom_text (disclaimer kecil di bawah tombol)" />
        <Input value={data.hero_image ?? ""} onChange={(e) => setData({ ...data, hero_image: e.target.value })} placeholder="hero_image (opsional)" />
      </CardContent>
      <CardFooter>
        <Button onClick={onSave} disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
      </CardFooter>
    </Card>
  );
};

export default HeroEditor;
