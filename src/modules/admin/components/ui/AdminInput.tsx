import { forwardRef, useId } from 'react';

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const AdminInput = forwardRef<HTMLInputElement, AdminInputProps>(({ label, id, ...props }, ref) => {
  const autoId = useId();
  const inputId = id ?? `admin-input-${autoId}`;
  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <input
        ref={ref}
        id={inputId}
        {...props}
        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900"
      />
    </div>
  );
});

AdminInput.displayName = "AdminInput";

export default AdminInput;
