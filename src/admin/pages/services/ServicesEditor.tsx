import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { defaultServices } from "@/modules/admin/data/mockContent";
import type { ServicesContent, ServiceItem } from "@/modules/admin/types/contenttypes";
import { fetchContent, saveContent } from "@/lib/cms";

const ServicesEditor = () => {
  const [data, setData] = useState<ServicesContent>(defaultServices);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      const content = await fetchContent<ServicesContent>("services", defaultServices);
      setData({ ...defaultServices, ...content });
    };
    run();
  }, []);

  const addItem = () => setData({ ...data, items: [...data.items, { icon: "", title: "", description: "" }] });
  const removeItem = (idx: number) => setData({ ...data, items: data.items.filter((_, i) => i !== idx) });
  const updateItem = (idx: number, patch: Partial<ServiceItem>) =>
    setData({ ...data, items: data.items.map((it, i) => (i === idx ? { ...it, ...patch } : it)) });

  const onSave = async () => {
    setSaving(true);
    const res = await saveContent("services", data);
    setSaving(false);
    if (!res.ok) toast({ title: "Gagal menyimpan", description: res.error });
    else toast({ title: "Tersimpan" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} placeholder="title" />
        <div className="space-y-2">
          {data.items.map((it, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-[8rem_1fr_1fr_auto] gap-2 items-center">
              <Input value={it.icon} onChange={(e) => updateItem(idx, { icon: e.target.value })} placeholder="icon" />
              <Input value={it.title} onChange={(e) => updateItem(idx, { title: e.target.value })} placeholder="title" />
              <Input value={it.description} onChange={(e) => updateItem(idx, { description: e.target.value })} placeholder="description" />
              <Button variant="destructive" onClick={() => removeItem(idx)}>Hapus</Button>
            </div>
          ))}
          <Button variant="outline" onClick={addItem}>Tambah Service</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave} disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
      </CardFooter>
    </Card>
  );
};

export default ServicesEditor;
