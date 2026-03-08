import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { defaultPricing } from "@/modules/admin/data/mockContent";
import type { PricingContent, PricingTier } from "@/modules/admin/types/pricingTypes";
import { fetchContent, saveContent } from "@/lib/cms";

const PricingEditor = () => {
  const [data, setData] = useState<PricingContent>(defaultPricing);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      const content = await fetchContent<PricingContent>("pricing", defaultPricing);
      setData({ ...defaultPricing, ...content });
    };
    run();
  }, []);

  const addTier = () => setData({ ...data, tiers: [...data.tiers, { package_name: "", price: "", features: [], button_text: "" }] });
  const removeTier = (idx: number) => setData({ ...data, tiers: data.tiers.filter((_, i) => i !== idx) });
  const updateTier = (idx: number, patch: Partial<PricingTier>) =>
    setData({ ...data, tiers: data.tiers.map((it, i) => (i === idx ? { ...it, ...patch } : it)) });
  const updateFeatures = (idx: number, text: string) =>
    setData({
      ...data,
      tiers: data.tiers.map((it, i) => (i === idx ? { ...it, features: text.split("\n").filter(Boolean) } : it)),
    });

  const onSave = async () => {
    setSaving(true);
    const res = await saveContent("pricing", data);
    setSaving(false);
    if (!res.ok) toast({ title: "Gagal menyimpan", description: res.error });
    else toast({ title: "Tersimpan" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">Judul Section</label>
          <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} placeholder="title" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Badge (Teks kecil di atas judul)</label>
          <Input value={data.badge_text} onChange={(e) => setData({ ...data, badge_text: e.target.value })} placeholder="badge_text" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Sub-judul / Deskripsi</label>
          <Input value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} placeholder="subtitle" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Teks Promo (Bawah)</label>
          <Input value={data.promo_text} onChange={(e) => setData({ ...data, promo_text: e.target.value })} placeholder="promo_text" />
        </div>
        <div className="space-y-4 pt-4 border-t">
          <label className="text-sm font-medium">Paket Harga</label>
          {data.tiers.map((it, idx) => (
            <div key={idx} className="border rounded-md p-3 space-y-2">
              <Input value={it.package_name} onChange={(e) => updateTier(idx, { package_name: e.target.value })} placeholder="package_name" />
              <Input value={it.price} onChange={(e) => updateTier(idx, { price: e.target.value })} placeholder="price" />
              <Input value={it.button_text} onChange={(e) => updateTier(idx, { button_text: e.target.value })} placeholder="button_text" />
              <Textarea
                value={it.features.join("\n")}
                onChange={(e) => updateFeatures(idx, e.target.value)}
                placeholder="features (satu per baris)"
              />
              <Button variant="destructive" onClick={() => removeTier(idx)}>Hapus Paket</Button>
            </div>
          ))}
          <Button variant="outline" onClick={addTier}>Tambah Paket</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave} disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
      </CardFooter>
    </Card>
  );
};

export default PricingEditor;
