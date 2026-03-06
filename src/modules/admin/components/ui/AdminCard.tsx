interface AdminCardProps {
  title: string;
  value: string | number;
}

export const AdminCard = ({ title, value }: AdminCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</h3>
      <p className="text-3xl font-bold text-indigo-600 mt-2">{value}</p>
    </div>
  );
};
