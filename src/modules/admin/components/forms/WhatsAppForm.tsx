import { useContentStore } from "../../store/contentStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { WhatsAppContent } from "../../types/contentTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";

export const WhatsAppForm = () => {
  const { whatsapp, updateWhatsApp, saveWhatsAppToSupabase } = useContentStore();
  const { register, handleSubmit, reset } = useForm<WhatsAppContent>({ defaultValues: whatsapp });
  useEffect(() => {
    reset(whatsapp);
  }, [whatsapp, reset]);

  const onSubmit = async (data: WhatsAppContent) => {
    updateWhatsApp(data);
    await saveWhatsAppToSupabase();
    alert("WhatsApp content saved!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <AdminInput label="Phone Number" {...register("phone_number")} />
      <AdminInput label="Message" {...register("message")} />
      <AdminButton type="submit">Save Changes</AdminButton>
    </form>
  );
};
