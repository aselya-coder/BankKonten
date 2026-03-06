import { forwardRef } from 'react';

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const AdminInput = forwardRef<HTMLInputElement, AdminInputProps>(({ label, ...props }, ref) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <input
        ref={ref}
        {...props}
        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900"
      />
    </div>
  );
});

AdminInput.displayName = "AdminInput";

export default AdminInput;
