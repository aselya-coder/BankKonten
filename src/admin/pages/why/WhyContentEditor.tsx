import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { defaultWhyContent } from "@/modules/admin/data/mockContent";
import type { WhyContent, WhyContentItem } from "@/modules/admin/types/contenttypes";
import { fetchContent, saveContent } from "@/lib/cms";

const WhyContentEditor = () => {
  const [data, setData] = useState<WhyContent>(defaultWhyContent);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      const content = await fetchContent<WhyContent>("why_content", defaultWhyContent);
      setData({ ...defaultWhyContent, ...content });
    };
    run();
  }, []);

  const addItem = () => {
    const items = [...data.items, { icon: "", title: "", description: "" }];
    setData({ ...data, items });
  };
  const removeItem = (idx: number) => {
    const items = data.items.filter((_, i) => i !== idx);
    setData({ ...data, items });
  };
  const updateItem = (idx: number, patch: Partial<WhyContentItem>) => {
    const items = data.items.map((it, i) => (i === idx ? { ...it, ...patch } : it));
    setData({ ...data, items });
  };

  const onSave = async () => {
    setSaving(true);
    const res = await saveContent("why_content", data);
    setSaving(false);
    if (!res.ok) toast({ title: "Gagal menyimpan", description: res.error });
    else toast({ title: "Tersimpan" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Why Content</CardTitle>
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
          <label className="text-sm font-medium">Deskripsi</label>
          <Textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} placeholder="description" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Teks Tombol WhatsApp</label>
          <Input value={data.button_text ?? ""} onChange={(e) => setData({ ...data, button_text: e.target.value })} placeholder="button_text" />
        </div>

        <div className="space-y-2 pt-4 border-t">
          <label className="text-sm font-medium">Daftar Alasan</label>
          {data.items.map((it, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-[10rem_1fr_1fr_auto] gap-2 items-center">
              <Input value={it.icon} onChange={(e) => updateItem(idx, { icon: e.target.value })} placeholder="icon" />
              <Input value={it.title} onChange={(e) => updateItem(idx, { title: e.target.value })} placeholder="title" />
              <Input value={it.description} onChange={(e) => updateItem(idx, { description: e.target.value })} placeholder="description" />
              <Button variant="destructive" onClick={() => removeItem(idx)}>Hapus</Button>
            </div>
          ))}
          <Button variant="outline" onClick={addItem}>Tambah Alasan</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave} disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
      </CardFooter>
    </Card>
  );
};

export default WhyContentEditor;
