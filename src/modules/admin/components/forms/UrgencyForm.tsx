import { useContentStore } from "../../store/contentStore";
import { useForm } from "react-hook-form";
import { UrgencyContent } from "../../types/contentTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";

export const UrgencyForm = () => {
  const { urgency, updateUrgency } = useContentStore();
  const { register, handleSubmit } = useForm<UrgencyContent>({ defaultValues: urgency });

  const onSubmit = (data: UrgencyContent) => {
    updateUrgency(data);
    alert("Urgency content updated!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <AdminInput label="Title" {...register("title")} />
      <AdminInput label="Description" {...register("description")} />
      <AdminInput label="Button Text" {...register("button_text")} />
      <AdminButton type="submit">Save Changes</AdminButton>
    </form>
  );
};
