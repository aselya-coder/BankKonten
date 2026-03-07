import { forwardRef, useId } from 'react';

interface AdminTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const AdminTextarea = forwardRef<HTMLTextAreaElement, AdminTextareaProps>(({ label, id, ...props }, ref) => {
  const autoId = useId();
  const textareaId = id ?? `admin-textarea-${autoId}`;
  return (
    <div className="mb-4">
      <label htmlFor={textareaId} className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <textarea
        ref={ref}
        id={textareaId}
        {...props}
        rows={4}
        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900"
      />
    </div>
  );
});

AdminTextarea.displayName = "AdminTextarea";
