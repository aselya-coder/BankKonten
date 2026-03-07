import { useContentStore } from "../../store/contentStore";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { KeunggulanContent } from "../../types/contentTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";

const KeunggulanForm = () => {
  const { keunggulan, updateKeunggulan, saveKeunggulanToSupabase } = useContentStore();
  const { control, register, handleSubmit, reset } = useForm<KeunggulanContent>({ defaultValues: keunggulan });
  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  useEffect(() => {
    reset(keunggulan);
  }, [keunggulan, reset]);

  const onSubmit = async (data: KeunggulanContent) => {
    updateKeunggulan(data);
    await saveKeunggulanToSupabase();
    alert("Keunggulan content saved!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <AdminInput label="Section Badge" {...register("title")} />
      <AdminInput label="Section Title" {...register("subtitle")} />
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-gray-300 dark:border-gray-600 rounded-md space-y-2">
          <AdminInput label={`Item Title ${index + 1}`} {...register(`items.${index}.title`)} />
          <AdminInput label={`Item Description ${index + 1}`} {...register(`items.${index}.description`)} />
          <AdminInput label={`Item Icon ${index + 1}`} {...register(`items.${index}.icon`)} />
          <AdminButton type="button" onClick={() => remove(index)}>Remove</AdminButton>
        </div>
      ))}
      <AdminButton type="button" onClick={() => append({ title: "", description: "", icon: "Shield" })}>Add Keunggulan Item</AdminButton>
      <AdminButton type="submit">Save Changes</AdminButton>
    </form>
  );
};

export default KeunggulanForm;
