import { createFileRoute } from "@tanstack/react-router";

import { FootfallSalesTrend } from "@/components/dashboard/FootfallSalesTrend";
import { ProductInterest } from "@/components/dashboard/ProductInterest";
import { StatCards } from "@/components/dashboard/StatCards";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { useDashboardData } from "@/hooks/useDashboardData";

export const Route = createFileRoute("/customer-analytics")({
  head: () => ({
    meta: [
      { title: "Customer Analytics — RetailSync" },
      {
        name: "description",
        content: "Understand footfall patterns, conversion and product interest across your store.",
      },
      { property: "og:title", content: "Customer Analytics — RetailSync" },
      {
        property: "og:description",
        content: "Footfall, conversion and shelf-interest insights from camera and POS data.",
      },
    ],
  }),
  component: CustomerAnalyticsPage,
});

function CustomerAnalyticsPage() {
  const { data } = useDashboardData();

  return (
    <DashboardShell>
      <PageHeader title="Customer Analytics" subtitle="Footfall, conversion and interest" />
      <StatCards
        stats={data.stats.filter((s) => ["visitors", "conversion", "sales"].includes(s.id))}
      />
      <FootfallSalesTrend trends={data.trends} />
      <ProductInterest products={data.productInterest} />
    </DashboardShell>
  );
}
