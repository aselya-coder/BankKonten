import { NavLinksForm } from "../components/forms/NavLinksForm";

const NavLinksPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Edit Navigasi</h1>
      <p className="text-gray-500 mb-6">
        Kelola link navigasi yang tampil di header website.
      </p>
      <NavLinksForm />
    </div>
  );
};

export default NavLinksPage;
