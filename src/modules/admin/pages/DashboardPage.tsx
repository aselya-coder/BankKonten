import { AdminCard } from "../components/ui/AdminCard";
import { useContent } from "../hooks/useContent";

const DashboardPage = () => {
  const { pricingContent, testimonialContent } = useContent();

  const totalPricingPackages = pricingContent?.tiers.length || 0;
  const totalTestimonials = testimonialContent?.testimonials.length || 0;
  const totalContentSections = 6; // Hardcoded for now

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminCard title="Total Pricing Packages" value={totalPricingPackages} />
        <AdminCard title="Total Testimonials" value={totalTestimonials} />
        <AdminCard title="Total Content Sections" value={totalContentSections} />
      </div>
    </div>
  );
};

export default DashboardPage;
