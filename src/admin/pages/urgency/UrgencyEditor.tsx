import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { defaultUrgency } from "@/modules/admin/data/mockContent";
import type { UrgencyContent, UrgencyItem } from "@/modules/admin/types/contenttypes";
import { fetchContent, saveContent } from "@/lib/cms";

const UrgencyEditor = () => {
  const [data, setData] = useState<UrgencyContent>(defaultUrgency);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      const content = await fetchContent<UrgencyContent>("urgency", defaultUrgency);
      setData({ ...defaultUrgency, ...content });
    };
    run();
  }, []);

  const addItem = () => setData({ ...data, items: [...data.items, { icon: "", title: "", description: "" }] });
  const removeItem = (idx: number) => setData({ ...data, items: data.items.filter((_, i) => i !== idx) });
  const updateItem = (idx: number, patch: Partial<UrgencyItem>) =>
    setData({ ...data, items: data.items.map((it, i) => (i === idx ? { ...it, ...patch } : it)) });

  const onSave = async () => {
    setSaving(true);
    const res = await saveContent("urgency", data);
    setSaving(false);
    if (!res.ok) toast({ title: "Gagal menyimpan", description: res.error });
    else toast({ title: "Tersimpan" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Urgency</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} placeholder="title" />
        <Textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} placeholder="description" />
        <Input value={data.button_text} onChange={(e) => setData({ ...data, button_text: e.target.value })} placeholder="button_text" />
        <Textarea value={data.subtext ?? ""} onChange={(e) => setData({ ...data, subtext: e.target.value })} placeholder="subtext (opsional, di bawah kartu)" />
        <Input value={data.emphasis_text ?? ""} onChange={(e) => setData({ ...data, emphasis_text: e.target.value })} placeholder="emphasis_text (opsional, bold)" />
        <div className="space-y-2">
          {data.items.map((it, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-[8rem_1fr_1fr_auto] gap-2 items-center">
              <Input value={it.icon} onChange={(e) => updateItem(idx, { icon: e.target.value })} placeholder="icon" />
              <Input value={it.title} onChange={(e) => updateItem(idx, { title: e.target.value })} placeholder="title" />
              <Input value={it.description} onChange={(e) => updateItem(idx, { description: e.target.value })} placeholder="description" />
              <Button variant="destructive" onClick={() => removeItem(idx)}>Hapus</Button>
            </div>
          ))}
          <Button variant="outline" onClick={addItem}>Tambah Item</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave} disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
      </CardFooter>
    </Card>
  );
};

export default UrgencyEditor;
