import { useContentStore } from "../../store/contentStore";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { UrgencyContent } from "../../types/contentTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";

export const UrgencyForm = () => {
  const { urgency, updateUrgency, saveUrgencyToSupabase } = useContentStore();
  const { control, register, handleSubmit, reset } = useForm<UrgencyContent>({ defaultValues: urgency });
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  useEffect(() => {
    reset(urgency);
  }, [urgency, reset]);

  const onSubmit = async (data: UrgencyContent) => {
    updateUrgency(data);
    await saveUrgencyToSupabase();
    alert("Urgency content saved!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <AdminInput label="Title" {...register("title")} />
      <AdminInput label="Description" {...register("description")} />
      <AdminInput label="Button Text" {...register("button_text")} />
      
      <div className="space-y-4 mt-6">
        <h3 className="text-xl font-bold">Urgency Items (Grid)</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border border-gray-300 dark:border-gray-600 rounded-md space-y-2">
            <AdminInput label={`Item Icon ${index + 1}`} {...register(`items.${index}.icon`)} />
            <AdminInput label={`Item Title ${index + 1}`} {...register(`items.${index}.title`)} />
            <AdminInput label={`Item Description ${index + 1}`} {...register(`items.${index}.description`)} />
            <AdminButton type="button" onClick={() => remove(index)}>Remove Item</AdminButton>
          </div>
        ))}
        <AdminButton type="button" onClick={() => append({ icon: "Clock", title: "", description: "" })}>Add Item</AdminButton>
      </div>

      <AdminButton type="submit">Save Changes</AdminButton>
    </form>
  );
};
