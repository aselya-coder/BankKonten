import { useContentStore } from "../../store/contentStore";
import { useForm, useFieldArray } from "react-hook-form";
import { NavLinkItem } from "../../types/contentTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";

export const NavbarForm = () => {
  const { navLinks, updateNavLinks } = useContentStore();
  const { control, register, handleSubmit } = useForm<{ navLinks: NavLinkItem[] }>({ defaultValues: { navLinks } });
  const { fields, append, remove } = useFieldArray({ control, name: "navLinks" });

  const onSubmit = (data: { navLinks: NavLinkItem[] }) => {
    updateNavLinks(data.navLinks);
    alert("Navbar links updated!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-gray-300 dark:border-gray-600 rounded-md space-y-2">
          <AdminInput label={`Label ${index + 1}`} {...register(`navLinks.${index}.label`)} />
          <AdminInput label={`Href ${index + 1}`} {...register(`navLinks.${index}.href`)} />
          <AdminButton type="button" onClick={() => remove(index)}>Remove Link</AdminButton>
        </div>
      ))}
      <AdminButton type="button" onClick={() => append({ label: "", href: "" })}>Add Link</AdminButton>
      <AdminButton type="submit">Save Changes</AdminButton>
    </form>
  );
};
