import { useHeroStore } from "../../store/heroStore";
import { useForm } from "react-hook-form";
import { HeroContent } from "../../types/heroTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";

export const HeroForm = () => {
  const { heroContent, updateHeroContent } = useHeroStore();
  const { register, handleSubmit, watch } = useForm<HeroContent>({ defaultValues: heroContent });

  const onSubmit = (data: HeroContent) => {
    updateHeroContent(data);
    alert("Hero content updated!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <AdminInput label="Title" {...register("title")} />
      <AdminInput label="Subtitle" {...register("subtitle")} />
      <AdminInput label="Button Text" {...register("button_text")} />
      <AdminInput label="Button Link" {...register("button_link")} />
      <AdminButton type="submit">Save Changes</AdminButton>
    </form>
  );
};
