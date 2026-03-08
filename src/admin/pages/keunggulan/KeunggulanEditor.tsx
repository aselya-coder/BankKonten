import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { defaultKeunggulan } from "@/modules/admin/data/mockContent";
import type { KeunggulanContent, KeunggulanItem } from "@/modules/admin/types/contenttypes";
import { fetchContent, saveContent } from "@/lib/cms";

const KeunggulanEditor = () => {
  const [data, setData] = useState<KeunggulanContent>(defaultKeunggulan);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      const content = await fetchContent<KeunggulanContent>("keunggulan", defaultKeunggulan);
      setData({ ...defaultKeunggulan, ...content });
    };
    run();
  }, []);

  const addItem = () => setData({ ...data, items: [...data.items, { icon: "", title: "", description: "" }] });
  const removeItem = (idx: number) => setData({ ...data, items: data.items.filter((_, i) => i !== idx) });
  const updateItem = (idx: number, patch: Partial<KeunggulanItem>) =>
    setData({ ...data, items: data.items.map((it, i) => (i === idx ? { ...it, ...patch } : it)) });

  const onSave = async () => {
    setSaving(true);
    const res = await saveContent("keunggulan", data);
    setSaving(false);
    if (!res.ok) toast({ title: "Gagal menyimpan", description: res.error });
    else toast({ title: "Tersimpan" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keunggulan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Judul (Badge)</label>
          <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} placeholder="title" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Sub-judul (Besar)</label>
          <Input value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} placeholder="subtitle" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Teks Tombol WhatsApp</label>
          <Input value={data.button_text ?? ""} onChange={(e) => setData({ ...data, button_text: e.target.value })} placeholder="button_text" />
        </div>
        <div className="space-y-2 pt-4 border-t">
          <label className="text-sm font-medium">Daftar Keunggulan</label>
          {data.items.map((it, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-[8rem_1fr_1fr_auto] gap-2 items-center">
              <Input value={it.icon} onChange={(e) => updateItem(idx, { icon: e.target.value })} placeholder="icon" />
              <Input value={it.title} onChange={(e) => updateItem(idx, { title: e.target.value })} placeholder="title" />
              <Input value={it.description} onChange={(e) => updateItem(idx, { description: e.target.value })} placeholder="description" />
              <Button variant="destructive" onClick={() => removeItem(idx)}>Hapus</Button>
            </div>
          ))}
          <Button variant="outline" onClick={addItem}>Tambah Keunggulan</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave} disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
      </CardFooter>
    </Card>
  );
};

export default KeunggulanEditor;
