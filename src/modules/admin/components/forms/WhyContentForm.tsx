import { useContentStore } from "../../store/contentStore";
import { useForm, useFieldArray } from "react-hook-form";
import { WhyContentItem } from "../../types/contentTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";

export const WhyContentForm = () => {
  const { whyContent, updateWhyContent } = useContentStore();
  const { control, register, handleSubmit } = useForm<{ whyContent: WhyContentItem[] }>({ defaultValues: { whyContent } });
  const { fields, append, remove } = useFieldArray({ control, name: "whyContent" });

  const onSubmit = (data: { whyContent: WhyContentItem[] }) => {
    updateWhyContent(data.whyContent);
    alert("Why Content updated!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-gray-300 dark:border-gray-600 rounded-md space-y-2">
          <AdminInput label={`Title ${index + 1}`} {...register(`whyContent.${index}.title`)} />
          <AdminInput label={`Description ${index + 1}`} {...register(`whyContent.${index}.description`)} />
          <AdminButton type="button" onClick={() => remove(index)}>Remove Item</AdminButton>
        </div>
      ))}
      <AdminButton type="button" onClick={() => append({ title: "", description: "" })}>Add Item</AdminButton>
      <AdminButton type="submit">Save Changes</AdminButton>
    </form>
  );
};
