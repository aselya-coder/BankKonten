import { useContentStore } from "../../store/contentStore";
import { useForm, useFieldArray } from "react-hook-form";
import { KeunggulanItem } from "../../types/contentTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";

const KeunggulanForm = () => {
  const { keunggulan, updateKeunggulan } = useContentStore();
  const { control, register, handleSubmit } = useForm<{ keunggulan: KeunggulanItem[] }>({ defaultValues: { keunggulan } });
  const { fields, append, remove } = useFieldArray({ control, name: "keunggulan" });

  const onSubmit = (data: { keunggulan: KeunggulanItem[] }) => {
    updateKeunggulan(data.keunggulan);
    alert("Keunggulan content updated!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-gray-300 dark:border-gray-600 rounded-md space-y-2">
          <AdminInput label={`Title ${index + 1}`} {...register(`keunggulan.${index}.title`)} />
          <AdminInput label={`Description ${index + 1}`} {...register(`keunggulan.${index}.description`)} />
          <AdminInput label={`Icon ${index + 1}`} {...register(`keunggulan.${index}.icon`)} />
          <AdminButton type="button" onClick={() => remove(index)}>Remove</AdminButton>
        </div>
      ))}
      <AdminButton type="button" onClick={() => append({ title: "", description: "", icon: "" })}>Add Keunggulan</AdminButton>
      <AdminButton type="submit">Save Changes</AdminButton>
    </form>
  );
};

export default KeunggulanForm;
