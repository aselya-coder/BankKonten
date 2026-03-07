import { useContentStore } from "../../store/contentStore";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { NavLinkItem } from "../../types/contentTypes";
import AdminInput from "../ui/AdminInput";
import AdminButton from "../ui/AdminButton";

type NavLinksFormData = {
  navLinks: NavLinkItem[];
};

export const NavLinksForm = () => {
  const { navLinks, updateNavLinks, saveNavLinksToSupabase } = useContentStore();

  const { control, register, handleSubmit, reset } = useForm<NavLinksFormData>({
    defaultValues: { navLinks },
  });

  const { fields, append, remove, move } = useFieldArray({ control, name: "navLinks" });

  useEffect(() => {
    reset({ navLinks });
  }, [navLinks, reset]);

  const onSubmit = async (data: NavLinksFormData) => {
    updateNavLinks(data.navLinks);
    await saveNavLinksToSupabase();
    alert("Navigasi tersimpan!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-3 items-end p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
          >
            <div className="flex-1">
              <AdminInput
                label={`Label ${index + 1}`}
                placeholder="contoh: Harga"
                {...register(`navLinks.${index}.label`)}
              />
            </div>
            <div className="flex-1">
              <AdminInput
                label={`URL / Href ${index + 1}`}
                placeholder="contoh: #pricing"
                {...register(`navLinks.${index}.href`)}
              />
            </div>
            <div className="flex gap-2 mb-4">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => move(index, index - 1)}
                  className="px-3 py-2 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                  title="Naikan urutan"
                >
                  ↑
                </button>
              )}
              {index < fields.length - 1 && (
                <button
                  type="button"
                  onClick={() => move(index, index + 1)}
                  className="px-3 py-2 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                  title="Turunkan urutan"
                >
                  ↓
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(index)}
                className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <AdminButton
        type="button"
        onClick={() => append({ label: "", href: "" })}
      >
        + Tambah Link Navigasi
      </AdminButton>

      <div className="pt-2">
        <AdminButton type="submit">Simpan Perubahan</AdminButton>
      </div>
    </form>
  );
};
