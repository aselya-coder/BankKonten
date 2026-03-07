import { useTestimonialStore } from "../../store/testimonialStore";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { TestimonialContent } from "../../types/testimonialTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";
import { AdminTextarea } from "../ui/AdminTextarea";
import AdminImagePicker from "../ui/AdminImagePicker";

export const TestimoniForm = () => {
  const { testimonialContent, updateTestimonialContent, saveTestimonialsToSupabase } = useTestimonialStore();
  const { control, register, handleSubmit, setValue, watch, reset, formState } = useForm<TestimonialContent>({ defaultValues: testimonialContent });
  const { fields, append, remove } = useFieldArray({ control, name: "testimonials" });
  const { fields: targetFields, append: appendTarget, remove: removeTarget } = useFieldArray({ control, name: "target_users" });

  useEffect(() => {
    if (!formState.isDirty) {
      reset(testimonialContent);
    }
  }, [testimonialContent, reset, formState.isDirty]);

  const onSubmit = async (data: TestimonialContent) => {
    updateTestimonialContent(data);
    await saveTestimonialsToSupabase();
    alert("Testimonial content saved!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <AdminInput label="Section Title" {...register("title")} />
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Cocok Untuk Siapa?</h3>
        {targetFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-end">
            <AdminInput label={`Emoji ${index + 1}`} {...register(`target_users.${index}.emoji`)} />
            <AdminInput label={`Label ${index + 1}`} {...register(`target_users.${index}.label`)} />
            <AdminButton type="button" onClick={() => removeTarget(index)}>Remove</AdminButton>
          </div>
        ))}
        <AdminButton type="button" onClick={() => appendTarget({ emoji: "", label: "" })}>Add Target User</AdminButton>
      </div>

      <hr />
      
      <h3 className="text-xl font-bold">Daftar Testimoni</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-gray-300 dark:border-gray-600 rounded-md space-y-2">
          <AdminInput label={`Name ${index + 1}`} {...register(`testimonials.${index}.name`)} />
          <AdminInput label={`Role ${index + 1}`} {...register(`testimonials.${index}.role`)} />
          <AdminTextarea label={`Message ${index + 1}`} {...register(`testimonials.${index}.message`)} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div className="md:col-span-2">
              <AdminInput label={`Photo URL ${index + 1}`} {...register(`testimonials.${index}.photo`)} />
            </div>
            <AdminImagePicker
              label="Pilih dari Galeri"
              onPick={(url) => setValue(`testimonials.${index}.photo`, url, { shouldDirty: true })}
            />
          </div>
          {watch(`testimonials.${index}.photo`) ? (
            <img
              src={watch(`testimonials.${index}.photo`)}
              alt={`Preview ${index + 1}`}
              className="h-20 w-20 rounded-md object-cover border"
            />
          ) : null}
          <AdminInput label={`Rating (1-5) ${index + 1}`} type="number" min="1" max="5" {...register(`testimonials.${index}.stars`, { valueAsNumber: true })} />
          <AdminButton type="button" onClick={() => remove(index)}>Remove Testimonial</AdminButton>
        </div>
      ))}
      <AdminButton type="button" onClick={() => append({ name: "", role: "", message: "", photo: "", stars: 5 })}>Add Testimonial</AdminButton>
      <AdminButton type="submit">Save Changes</AdminButton>
    </form>
  );
};
