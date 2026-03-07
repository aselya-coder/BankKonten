import { usePricingStore } from "../../store/pricingStore";
import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { PricingContent } from "../../types/pricingTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";
import { AdminTextarea } from "../ui/AdminTextarea";

export const PricingForm = () => {
  const { pricingContent, updatePricingContent, savePricingToSupabase } = usePricingStore();
  const { control, register, handleSubmit, reset } = useForm<PricingContent>({ defaultValues: pricingContent });
  const { fields, append, remove } = useFieldArray({ control, name: "tiers" });
  useEffect(() => {
    reset(pricingContent);
  }, [pricingContent, reset]);

  const onSubmit = async (data: PricingContent) => {
    updatePricingContent(data);
    await savePricingToSupabase();
    alert("Pricing content saved!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <AdminInput label="Section Title" {...register("title")} />
      <AdminInput label="Promo Footer Text" {...register("promo_text")} />
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-gray-300 dark:border-gray-600 rounded-md space-y-2">
          <AdminInput label={`Package Name ${index + 1}`} {...register(`tiers.${index}.package_name`)} />
          <AdminInput label={`Price ${index + 1}`} {...register(`tiers.${index}.price`)} />
          <Controller
            control={control}
            name={`tiers.${index}.features`}
            render={({ field }) => (
              <AdminTextarea
                label={`Features ${index + 1} (satu per baris)`}
                value={Array.isArray(field.value) ? field.value.join("\n") : ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value.split("\n").filter((f) => f.trim() !== "")
                  )
                }
                onBlur={field.onBlur}
                rows={5}
              />
            )}
          />
          <AdminInput label={`Button Text ${index + 1}`} {...register(`tiers.${index}.button_text`)} />
          <AdminButton type="button" onClick={() => remove(index)}>Remove Tier</AdminButton>
        </div>
      ))}
      <AdminButton type="button" onClick={() => append({ package_name: "", price: "", features: [], button_text: "" })}>Add Tier</AdminButton>
      <AdminButton type="submit">Save Changes</AdminButton>
    </form>
  );
};
