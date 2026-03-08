import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { defaultProblems } from "@/modules/admin/data/mockContent";
import type { ProblemsContent } from "@/modules/admin/types/contenttypes";
import { fetchContent, saveContent } from "@/lib/cms";

const ProblemsEditor = () => {
  const [data, setData] = useState<ProblemsContent>(defaultProblems);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      const content = await fetchContent<ProblemsContent>("problems", defaultProblems);
      setData({ ...defaultProblems, ...content });
    };
    run();
  }, []);

  const addItem = () => setData({ ...data, items: [...data.items, { title: "" }] });
  const removeItem = (idx: number) => setData({ ...data, items: data.items.filter((_, i) => i !== idx) });
  const updateItem = (idx: number, title: string) =>
    setData({ ...data, items: data.items.map((it, i) => (i === idx ? { title } : it)) });

  const onSave = async () => {
    setSaving(true);
    const res = await saveContent("problems", data);
    setSaving(false);
    if (!res.ok) toast({ title: "Gagal menyimpan", description: res.error });
    else toast({ title: "Tersimpan" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Problems</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} placeholder="title" />
        <div className="space-y-2">
          {data.items.map((it, idx) => (
            <div key={idx} className="flex gap-2">
              <Input value={it.title} onChange={(e) => updateItem(idx, e.target.value)} placeholder={`Problem ${idx + 1}`} />
              <Button variant="destructive" onClick={() => removeItem(idx)}>Hapus</Button>
            </div>
          ))}
          <Button variant="outline" onClick={addItem}>Tambah Problem</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave} disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
      </CardFooter>
    </Card>
  );
};

export default ProblemsEditor;
