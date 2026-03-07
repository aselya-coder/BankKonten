import { useHeroStore } from "../../store/heroStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HeroContent } from "../../types/heroTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";

export const HeroForm = () => {
  const { heroContent, updateHeroContent, saveHeroToSupabase } = useHeroStore();
  const { register, handleSubmit, reset, formState } = useForm<HeroContent>({ defaultValues: heroContent });
  useEffect(() => {
    if (!formState.isDirty) {
      reset(heroContent);
    }
  }, [heroContent, reset, formState.isDirty]);

  const onSubmit = async (data: HeroContent) => {
    updateHeroContent(data);
    await saveHeroToSupabase();
    alert("Hero content saved!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <AdminInput label="Title" {...register("title")} />
      <AdminInput label="Subtitle" {...register("subtitle")} />
      <AdminInput label="Button Text" {...register("button_text")} />
      <AdminInput label="Button Link" {...register("button_link")} />
      <AdminInput label="Badge Text (Top)" {...register("badge_text")} />
      <AdminInput label="Bottom Info Text" {...register("bottom_text")} />
      <AdminButton type="submit">Save Changes</AdminButton>
    </form>
  );
};
