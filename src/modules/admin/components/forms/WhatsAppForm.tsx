import { useContentStore } from "../../store/contentStore";
import { useForm } from "react-hook-form";
import { WhatsAppContent } from "../../types/contentTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";

export const WhatsAppForm = () => {
  const { whatsapp, updateWhatsApp } = useContentStore();
  const { register, handleSubmit } = useForm<WhatsAppContent>({ defaultValues: whatsapp });

  const onSubmit = (data: WhatsAppContent) => {
    updateWhatsApp(data);
    alert("WhatsApp content updated!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <AdminInput label="Phone Number" {...register("phone_number")} />
      <AdminInput label="Message" {...register("message")} />
      <AdminButton type="submit">Save Changes</AdminButton>
    </form>
  );
};
