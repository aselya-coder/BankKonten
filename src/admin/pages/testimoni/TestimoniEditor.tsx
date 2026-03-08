import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { defaultTestimonials } from "@/modules/admin/data/mockContent";
import type { TestimonialContent, Testimonial, TargetUser } from "@/modules/admin/types/testimonialTypes";
import { fetchContent, saveContent } from "@/lib/cms";

const TestimoniEditor = () => {
  const [data, setData] = useState<TestimonialContent>(defaultTestimonials);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      const content = await fetchContent<TestimonialContent>("testimonials", defaultTestimonials);
      setData({ ...defaultTestimonials, ...content });
    };
    run();
  }, []);

  const addItem = () =>
    setData({ ...data, testimonials: [...data.testimonials, { name: "", role: "", message: "", photo: "", stars: 5 }] });
  const removeItem = (idx: number) =>
    setData({ ...data, testimonials: data.testimonials.filter((_, i) => i !== idx) });
  const updateItem = (idx: number, patch: Partial<Testimonial>) =>
    setData({ ...data, testimonials: data.testimonials.map((it, i) => (i === idx ? { ...it, ...patch } : it)) });

  const onSave = async () => {
    setSaving(true);
    const res = await saveContent("testimonials", data);
    setSaving(false);
    if (!res.ok) toast({ title: "Gagal menyimpan", description: res.error });
    else toast({ title: "Tersimpan" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Testimoni</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <label className="text-sm font-medium">Teks Tombol WhatsApp (Bawah)</label>
          <Input value={data.button_text} onChange={(e) => setData({ ...data, button_text: e.target.value })} placeholder="button_text" />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <label className="text-sm font-medium">Daftar Testimoni</label>
          {data.testimonials.map((it, idx) => (
            <div key={idx} className="border rounded-md p-3 space-y-2">
              <Input value={it.name} onChange={(e) => updateItem(idx, { name: e.target.value })} placeholder="name" />
              <Input value={it.role} onChange={(e) => updateItem(idx, { role: e.target.value })} placeholder="job" />
              <Input value={it.photo} onChange={(e) => updateItem(idx, { photo: e.target.value })} placeholder="photo url" />
              <Textarea value={it.message} onChange={(e) => updateItem(idx, { message: e.target.value })} placeholder="testimonial_text" />
              <Input
                type="number"
                value={it.stars}
                onChange={(e) => updateItem(idx, { stars: Number(e.target.value) })}
                placeholder="stars"
              />
              <Button variant="destructive" onClick={() => removeItem(idx)}>Hapus Testimoni</Button>
            </div>
          ))}
          <Button variant="outline" onClick={addItem}>Tambah Testimoni</Button>
        </div>

        <div className="space-y-2 pt-4 border-t">
          <div className="space-y-1 mb-2">
            <label className="text-sm font-medium">Judul Section Target User</label>
            <Input value={data.target_users_title} onChange={(e) => setData({ ...data, target_users_title: e.target.value })} placeholder="target_users_title" />
          </div>
          <p className="font-medium text-sm">Daftar Target Users</p>
          {data.target_users.map((u: TargetUser, idx: number) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-[8rem_1fr_auto] gap-2 items-center">
              <Input value={u.emoji} onChange={(e) => setData({ ...data, target_users: data.target_users.map((x, i) => i === idx ? { ...x, emoji: e.target.value } : x) })} placeholder="emoji" />
              <Input value={u.label} onChange={(e) => setData({ ...data, target_users: data.target_users.map((x, i) => i === idx ? { ...x, label: e.target.value } : x) })} placeholder="label" />
              <Button variant="destructive" onClick={() => setData({ ...data, target_users: data.target_users.filter((_, i) => i !== idx) })}>Hapus</Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => setData({ ...data, target_users: [...data.target_users, { emoji: "", label: "" }] })}>
            Tambah Target User
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave} disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
      </CardFooter>
    </Card>
  );
};

export default TestimoniEditor;
