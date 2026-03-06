import { useTestimonialStore } from "../../store/testimonialStore";
import { useForm, useFieldArray } from "react-hook-form";
import { TestimonialContent } from "../../types/testimonialTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";
import { AdminTextarea } from "../ui/AdminTextarea";

export const TestimoniForm = () => {
  const { testimonialContent, updateTestimonialContent } = useTestimonialStore();
  const { control, register, handleSubmit } = useForm<TestimonialContent>({ defaultValues: testimonialContent });
  const { fields, append, remove } = useFieldArray({ control, name: "testimonials" });

  const onSubmit = (data: TestimonialContent) => {
    updateTestimonialContent(data);
    alert("Testimonial content updated!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <AdminInput label="Section Title" {...register("title")} />
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-gray-300 dark:border-gray-600 rounded-md space-y-2">
          <AdminInput label={`Name ${index + 1}`} {...register(`testimonials.${index}.name`)} />
          <AdminInput label={`Role ${index + 1}`} {...register(`testimonials.${index}.role`)} />
          <AdminTextarea label={`Message ${index + 1}`} {...register(`testimonials.${index}.message`)} />
          <AdminInput label={`Photo URL ${index + 1}`} {...register(`testimonials.${index}.photo`)} />
          <AdminInput label={`Rating (1-5) ${index + 1}`} type="number" min="1" max="5" {...register(`testimonials.${index}.stars`, { valueAsNumber: true })} />
          <AdminButton type="button" onClick={() => remove(index)}>Remove Testimonial</AdminButton>
        </div>
      ))}
      <AdminButton type="button" onClick={() => append({ name: "", role: "", message: "", photo: "", stars: 5 })}>Add Testimonial</AdminButton>
      <AdminButton type="submit">Save Changes</AdminButton>
    </form>
  );
};
