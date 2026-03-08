import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { fetchContent } from "@/lib/cms";
import { defaultTestimonials, defaultPricing } from "@/modules/admin/data/mockContent";

const DashboardPage = () => {
  const [testiCount, setTestiCount] = useState(0);
  const [pricingCount, setPricingCount] = useState(0);

  useEffect(() => {
    const run = async () => {
      const testimonials = await fetchContent("testimonials", defaultTestimonials);
      const pricing = await fetchContent("pricing", defaultPricing);
      setTestiCount(testimonials.testimonials?.length ?? 0);
      setPricingCount(pricing.tiers?.length ?? 0);
    };
    run();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Jumlah Testimoni</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">{testiCount}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Jumlah Paket Pricing</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">{pricingCount}</CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
