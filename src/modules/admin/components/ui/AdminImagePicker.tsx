import { useRef } from "react";
import AdminButton from "./AdminButton";

type AdminImagePickerProps = {
  label?: string;
  onPick: (url: string) => void;
  className?: string;
};

const AdminImagePicker = ({ label = "Pilih dari Galeri", onPick, className }: AdminImagePickerProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClick = () => {
    inputRef.current?.click();
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onPick(url);
    // reset input agar pemilihan file yang sama tetap memicu onChange
    e.currentTarget.value = "";
  };

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
      <AdminButton type="button" onClick={onClick}>{label}</AdminButton>
    </div>
  );
};

export default AdminImagePicker;
