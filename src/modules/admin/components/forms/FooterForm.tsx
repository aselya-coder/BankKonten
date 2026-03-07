import { useContentStore } from "../../store/contentStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FooterContent } from "../../types/contentTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";

export const FooterForm = () => {
  const { footer, updateFooter, saveFooterToSupabase } = useContentStore();
  const { register, handleSubmit, reset, formState } = useForm<FooterContent>({ defaultValues: footer });
  useEffect(() => {
    if (!formState.isDirty) {
      reset(footer);
    }
  }, [footer, reset, formState.isDirty]);

  const onSubmit = async (data: FooterContent) => {
    updateFooter(data);
    await saveFooterToSupabase();
    alert("Footer content saved!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <AdminInput label="Brand Name" {...register("brand_name")} />
      <AdminInput label="Description" {...register("description")} />
      <AdminInput label="Phone" {...register("phone")} />
      <AdminInput label="Email" {...register("email")} />
      <AdminInput label="Address" {...register("address")} />
      <AdminInput label="Copyright" {...register("copyright")} />
      <AdminButton type="submit">Save Changes</AdminButton>
    </form>
  );
};
