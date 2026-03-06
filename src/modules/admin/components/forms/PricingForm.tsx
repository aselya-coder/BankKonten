import { usePricingStore } from "../../store/pricingStore";
import { useForm, useFieldArray } from "react-hook-form";
import { PricingContent } from "../../types/pricingTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";
import { AdminTextarea } from "../ui/AdminTextarea";

export const PricingForm = () => {
  const { pricingContent, updatePricingContent } = usePricingStore();
  const { control, register, handleSubmit } = useForm<PricingContent>({ defaultValues: pricingContent });
  const { fields, append, remove } = useFieldArray({ control, name: "tiers" });

  const onSubmit = (data: PricingContent) => {
    updatePricingContent(data);
    alert("Pricing content updated!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <AdminInput label="Section Title" {...register("title")} />
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-gray-300 dark:border-gray-600 rounded-md space-y-2">
          <AdminInput label={`Package Name ${index + 1}`} {...register(`tiers.${index}.package_name`)} />
          <AdminInput label={`Price ${index + 1}`} {...register(`tiers.${index}.price`)} />
          <AdminTextarea label={`Features ${index + 1}`} {...register(`tiers.${index}.features`)} />
          <AdminInput label={`Button Text ${index + 1}`} {...register(`tiers.${index}.button_text`)} />
          <AdminButton type="button" onClick={() => remove(index)}>Remove Tier</AdminButton>
        </div>
      ))}
      <AdminButton type="button" onClick={() => append({ package_name: "", price: "", features: [], button_text: "" })}>Add Tier</AdminButton>
      <AdminButton type="submit">Save Changes</AdminButton>
    </form>
  );
};
