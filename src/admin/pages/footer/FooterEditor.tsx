import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { defaultFooter } from "@/modules/admin/data/mockContent";
import type { FooterContent } from "@/modules/admin/types/contenttypes";
import { fetchContent, saveContent } from "@/lib/cms";

const FooterEditor = () => {
  const [data, setData] = useState<FooterContent>(defaultFooter);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      const content = await fetchContent<FooterContent>("footer", defaultFooter);
      setData({ ...defaultFooter, ...content });
    };
    run();
  }, []);

  const onSave = async () => {
    setSaving(true);
    const res = await saveContent("footer", data);
    setSaving(false);
    if (!res.ok) toast({ title: "Gagal menyimpan", description: res.error });
    else toast({ title: "Tersimpan" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Footer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input value={data.brand_name} onChange={(e) => setData({ ...data, brand_name: e.target.value })} placeholder="brand_name" />
        <Textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} placeholder="description" />
        <Input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} placeholder="phone" />
        <Input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="email" />
        <Input value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} placeholder="address" />
        <Input value={data.copyright} onChange={(e) => setData({ ...data, copyright: e.target.value })} placeholder="copyright" />
      </CardContent>
      <CardFooter>
        <Button onClick={onSave} disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
      </CardFooter>
    </Card>
  );
};

export default FooterEditor;
