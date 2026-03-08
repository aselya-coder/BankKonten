import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { defaultWhatsApp } from "@/modules/admin/data/mockContent";
import type { WhatsAppContent } from "@/modules/admin/types/contenttypes";
import { fetchContent, saveContent } from "@/lib/cms";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const WhatsAppEditor = () => {
  const [data, setData] = useState<WhatsAppContent>({ ...defaultWhatsApp, show_button: true });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      const content = await fetchContent<WhatsAppContent>("whatsapp_settings", { ...defaultWhatsApp, show_button: true });
      setData({ ...defaultWhatsApp, show_button: true, ...content });
    };
    run();
  }, []);

  const onSave = async () => {
    setSaving(true);
    const res = await saveContent("whatsapp_settings", data);
    setSaving(false);
    if (!res.ok) toast({ title: "Gagal menyimpan", description: res.error });
    else toast({ title: "Tersimpan" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>WhatsApp Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input value={data.phone_number} onChange={(e) => setData({ ...data, phone_number: e.target.value })} placeholder="phone_number" />
        <Input value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} placeholder="default_message" />
        <div className="flex items-center gap-2">
          <Switch checked={!!data.show_button} onCheckedChange={(v) => setData({ ...data, show_button: v })} id="showbtn" />
          <Label htmlFor="showbtn">Tampilkan Tombol</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave} disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
      </CardFooter>
    </Card>
  );
};

export default WhatsAppEditor;
