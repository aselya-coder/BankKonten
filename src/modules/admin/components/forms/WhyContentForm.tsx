import { useContentStore } from "../../store/contentStore";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { WhyContent } from "../../types/contentTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";

export const WhyContentForm = () => {
  const { whyContent, updateWhyContent, saveWhyToSupabase } = useContentStore();
  const { control, register, handleSubmit, reset, formState } = useForm<WhyContent>({ defaultValues: whyContent });
  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  useEffect(() => {
    if (!formState.isDirty) {
      reset(whyContent);
    }
  }, [whyContent, reset, formState.isDirty]);

  const onSubmit = async (data: WhyContent) => {
    updateWhyContent(data);
    await saveWhyToSupabase();
    alert("Why Content saved!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <AdminInput label="Section Badge" {...register("title")} />
      <AdminInput label="Section Title" {...register("subtitle")} />
      <AdminInput label="Section Description" {...register("description")} />
      <AdminInput label="Global Icon (opsional)" placeholder="mis: CircleDot" {...register("global_icon")} />
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-gray-300 dark:border-gray-600 rounded-md space-y-2">
          <AdminInput label={`Item Icon ${index + 1}`} placeholder="mis: TrendingUp" {...register(`items.${index}.icon`)} />
          <AdminInput label={`Item Title ${index + 1}`} {...register(`items.${index}.title`)} />
          <AdminInput label={`Item Description ${index + 1}`} {...register(`items.${index}.description`)} />
          <AdminButton type="button" onClick={() => remove(index)}>Remove Item</AdminButton>
        </div>
      ))}
      <AdminButton type="button" onClick={() => append({ icon: "CircleDot", title: "", description: "" })}>Add Item</AdminButton>
      <AdminButton type="submit">Save Changes</AdminButton>
    </form>
  );
};
