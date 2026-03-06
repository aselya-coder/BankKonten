import { useContentStore } from "../../store/contentStore";
import { useForm } from "react-hook-form";
import { FooterContent } from "../../types/contentTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";

export const FooterForm = () => {
  const { footer, updateFooter } = useContentStore();
  const { register, handleSubmit } = useForm<FooterContent>({ defaultValues: footer });

  const onSubmit = (data: FooterContent) => {
    updateFooter(data);
    alert("Footer content updated!");
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
